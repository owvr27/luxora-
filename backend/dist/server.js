import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import env from './config.js';
// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import iotRoutes from './routes/iot.js';
import redeemRoutes from './routes/redeem.js';
import imageRoutes from './routes/images.js';
// Initialize Express app
const app = express();
// ============================================
// Security Middleware
// ============================================
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
// ============================================
// CORS Configuration
// ============================================
const corsOrigins = env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean);
const corsOptions = {
    origin: corsOrigins && corsOrigins.length > 0
        ? corsOrigins
        : (env.NODE_ENV === 'development'
            ? ['http://localhost:3000', 'http://127.0.0.1:3000']
            : false),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400, // 24 hours
};
app.use(cors(corsOptions));
// ============================================
// Body Parser & Rate Limiting
// ============================================
// Handle raw binary data for image uploads FIRST (before JSON parser)
app.use('/api/images/upload', express.raw({ type: 'image/jpeg', limit: '10mb' }));
// Then JSON and URL-encoded parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 300 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// ============================================
// Request Logging (Development)
// ============================================
if (env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}
// ============================================
// Health Check & API Info
// ============================================
app.get('/health', (_req, res) => {
    res.json({
        ok: true,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: env.NODE_ENV,
    });
});
app.get('/', (_req, res) => {
    res.json({
        message: `${env.APP_NAME} API Server`,
        version: env.APP_VERSION,
        environment: env.NODE_ENV,
        endpoints: {
            health: '/health',
            auth: {
                register: '/auth/register',
                login: '/auth/login',
            },
            user: {
                profile: '/me',
                wallet: '/wallet',
                bins: '/bins',
                rewards: '/rewards',
            },
            redeem: '/redeem',
            admin: {
                dashboard: '/admin/dashboard',
                bins: '/admin/bins',
                operations: '/admin/operations',
            },
            iot: {
                operation: '/iot/operation',
            },
            images: {
                upload: '/api/images/upload',
                list: '/api/images',
                latest: '/api/images/latest',
                get: '/api/images/:filename',
            },
        },
        docs: 'Access the frontend at http://localhost:3000',
    });
});
// ============================================
// API Routes
// ============================================
app.use('/auth', authRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', iotRoutes);
app.use('/', redeemRoutes);
app.use('/', imageRoutes);
// ============================================
// Error Handling Middleware
// ============================================
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        error: env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method,
    });
});
// ============================================
// Start Server
// ============================================
const port = env.PORT;
app.listen(port, () => {
    console.log('\n' + '='.repeat(50));
    console.log(`🚀 ${env.APP_NAME} API Server`);
    console.log(`📦 Version: ${env.APP_VERSION}`);
    console.log(`🌍 Environment: ${env.NODE_ENV}`);
    console.log(`🔗 Server running on http://localhost:${port}`);
    console.log(`📡 CORS enabled for: ${corsOrigins?.join(', ') || 'all origins (development)'}`);
    console.log('='.repeat(50) + '\n');
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
