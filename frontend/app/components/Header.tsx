'use client';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
            >
              <Image 
                src="/logo.jpeg" 
                alt="Luxora Environmental Logo" 
                width={40} 
                height={40}
                className="object-contain rounded-lg"
                priority
              />
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Luxora
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <a 
              href="/" 
              className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              الرئيسية
            </a>
            <a 
              href="/bins" 
              className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              الحاويات
            </a>
            <a 
              href="/rewards" 
              className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              المكافآت
            </a>
            <a 
              href="/redeem" 
              className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              استرداد
            </a>
            <a 
              href="/wallet" 
              className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              المحفظة
            </a>
            <a 
              href="/images" 
              className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              الصور
            </a>
            <a 
              href="/admin/dashboard" 
              className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              الإدارة
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 text-gray-700 font-medium text-sm">
                  مرحباً، {user?.name}
                </span>
                <button 
                  onClick={logout}
                  className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a 
                  href="/login" 
                  className="px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                >
                  تسجيل الدخول
                </a>
                <a 
                  href="/register" 
                  className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm"
                >
                  تسجيل
                </a>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
