import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, Home, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHomePage ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl",
              isScrolled || !isHomePage ? "bg-primary-600 text-white" : "bg-white text-primary-900"
            )}>
              N
            </div>
            <span className={cn(
              "font-bold text-xl hidden sm:block",
              isScrolled || !isHomePage ? "text-slate-900" : "text-white drop-shadow-md"
            )}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={cn("font-medium hover:opacity-70 transition-opacity", isScrolled || !isHomePage ? "text-slate-700" : "text-white")}>Beranda</Link>
            <Link to="/search" className={cn("font-medium hover:opacity-70 transition-opacity", isScrolled || !isHomePage ? "text-slate-700" : "text-white")}>Eksplor</Link>
            <Link to="/profile" className={cn("font-medium hover:opacity-70 transition-opacity", isScrolled || !isHomePage ? "text-slate-700" : "text-white")}>Pesanan Saya</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/search" className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled || !isHomePage ? "hover:bg-slate-100 text-slate-700" : "hover:bg-white/20 text-white"
            )}>
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/profile" className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all",
              isScrolled || !isHomePage 
                ? "bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg" 
                : "bg-white text-primary-900 hover:bg-slate-50"
            )}>
              <User className="w-4 h-4" />
              <span>Masuk</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={cn("md:hidden p-2", isScrolled || !isHomePage ? "text-slate-900" : "text-white")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t animate-fade-in">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
              <Home className="w-5 h-5 text-primary-600" /> Beranda
            </Link>
            <Link to="/search" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
              <Search className="w-5 h-5 text-primary-600" /> Eksplor
            </Link>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
              <Calendar className="w-5 h-5 text-primary-600" /> Pesanan Saya
            </Link>
            <div className="h-px bg-slate-100 my-2"></div>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-primary-600 text-white rounded-xl font-medium">
              <User className="w-5 h-5" /> Masuk / Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
