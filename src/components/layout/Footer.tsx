import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/data';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl">
                N
              </div>
              <span className="font-bold text-xl text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Jelajahi</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Beranda</Link></li>
              <li><Link to="/search" className="hover:text-primary-400 transition-colors">Semua Cottage</Link></li>
              <li><Link to="/search?category=luxury" className="hover:text-primary-400 transition-colors">Koleksi Mewah</Link></li>
              <li><Link to="/search?category=family" className="hover:text-primary-400 transition-colors">Liburan Keluarga</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Bantuan</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Cara Memesan</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Kebijakan Pembatalan</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span>Jl. Raya Ubud No. 88, Bali, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>{siteConfig.contact.whatsapp}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
