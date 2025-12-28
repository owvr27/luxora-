import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { hashPassword, verifyPassword } from '../auth.js';
import prisma from '../prisma.js';
import env from '../config.js';

const router = Router();
const JWT_SECRET = env.JWT_SECRET;

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  location: z.string().optional(),
});
type RegisterBody = z.infer<typeof registerSchema>;

router.post('/register', async (req: Request<unknown, unknown, RegisterBody>, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid data' });
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return res.status(409).json({ error: 'Email already exists' });
  const passwordHash = await hashPassword(parsed.data.password);
  const user = await prisma.user.create({
    data: { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, location: parsed.data.location, role: 'user', passwordHash }
  });
  res.json({ id: user.id });
});

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
type LoginBody = z.infer<typeof loginSchema>;

router.post('/login', async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid credentials' });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await verifyPassword(user.passwordHash, parsed.data.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

export default router;