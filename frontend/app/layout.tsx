import '../styles/globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import Header from './components/Header';

export const metadata = { title: 'Luxora Environmental', description: 'Luxora Environmental - نظام ذكي لإدارة النفايات وإعادة التدوير. اكسب النقاط من خلال إعادة التدوير واستبدلها بمكافآت قيمة.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
        <AuthProvider>
          <Header />
          <main className="min-h-screen flex items-center justify-center">{children}</main>
          <footer className="bg-gray-900 text-white py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-400">Luxora Environmental</h3>
                  <p className="text-gray-400 text-sm">
                    نظام ذكي لإدارة النفايات وإعادة التدوير. نحو مستقبل أكثر نظافة واستدامة.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-400">روابط سريعة</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/bins" className="text-gray-400 hover:text-green-400 transition-colors">الحاويات</a></li>
                    <li><a href="/rewards" className="text-gray-400 hover:text-green-400 transition-colors">المكافآت</a></li>
                    <li><a href="/wallet" className="text-gray-400 hover:text-green-400 transition-colors">المحفظة</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-400">تواصل معنا</h3>
                  <p className="text-gray-400 text-sm">
                    <a href="mailto:info@luxora-environmental.com" className="hover:text-green-400 transition-colors">
                      info@luxora-environmental.com
                    </a>
                    <br />
                    <a href="tel:+966501234567" className="hover:text-green-400 transition-colors">
                      +966 50 123 4567
                    </a>
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Luxora Environmental. جميع الحقوق محفوظة.
                </p>
                <p className="text-gray-500 mt-2 text-xs">
                  Building a cleaner future together
                </p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}