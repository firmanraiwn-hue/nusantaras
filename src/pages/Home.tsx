import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin, ChevronRight, Star, Quote, ArrowRight, Heart, TreePine, Gem, Umbrella } from 'lucide-react';
import { categories, cottages, testimonials, whyChooseUs, siteConfig } from '@/config/data';
import CottageCard from '@/components/ui/CottageCard';
import { cn } from '@/lib/utils';

const CategoryIcons: Record<string, any> = { Users, Heart, TreePine, Gem, Umbrella };

export default function Home() {
  const navigate = useNavigate();
  const featuredCottages = cottages.filter(c => c.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO BANNER */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/resort/1920/1080" 
            alt="Hero Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide uppercase">Destinasi Premium 2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Temukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-200">Kedamaian</span><br/>di Setiap Sudut Nusantara
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Koleksi cottage dan villa mewah eksklusif untuk pengalaman liburan yang tak terlupakan bersama orang terkasih.
          </p>
        </div>

        {/* 2. QUICK SEARCH BAR (Floating) */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 md:p-6 shadow-2xl border border-slate-100 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Lokasi</p>
                  <p className="text-sm font-semibold text-slate-900">Pilih Destinasi</p>
                </div>
              </div>
              
              <div className="hidden md:block w-px h-10 bg-slate-100 mx-auto"></div>

              <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Tanggal</p>
                  <p className="text-sm font-semibold text-slate-900">Kapan saja</p>
                </div>
              </div>

              <div className="hidden md:block w-px h-10 bg-slate-100 mx-auto"></div>

              <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-0.5">Tamu</p>
                  <p className="text-sm font-semibold text-slate-900">2 Dewasa, 0 Anak</p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/search')}
                className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary-500/30"
              >
                <Search className="w-5 h-5" />
                Cari Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating search bar */}
      <div className="h-40 md:h-32"></div>

      {/* 3. CATEGORY SCROLLER */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Eksplorasi Gaya Liburanmu</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => navigate(`/search?category=${cat.id}`)}
              className="flex flex-col items-center gap-3 min-w-[100px] p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-1 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                {(() => {
                  const Icon = CategoryIcons[cat.icon] || Star;
                  return <Icon className="w-6 h-6 text-primary-600" />;
                })()}
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-primary-600">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. FEATURED COTTAGES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Koleksi Pilihan Kami</h2>
              <p className="text-slate-500">Penginapan dengan rating tertinggi dan fasilitas premium.</p>
            </div>
            <Link to="/search" className="hidden sm:flex items-center gap-1 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              Lihat Semua <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCottages.map(cottage => (
              <CottageCard key={cottage.id} cottage={cottage} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/search" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
              Lihat Semua Koleksi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PROMO BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-primary">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
            <div className="text-white max-w-xl">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                Penawaran Terbatas
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Diskon 20% untuk Liburan Akhir Pekan Ini!
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Gunakan kode promo <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">WEEKEND20</span> saat pembayaran.
              </p>
              <button className="px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Klaim Promo Sekarang
              </button>
            </div>
            <div className="hidden md:block w-1/3">
              <img 
                src="https://picsum.photos/seed/relax/800/800" 
                alt="Promo" 
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Memilih Kami?</h2>
            <p className="text-slate-500">Kami berkomitmen memberikan pengalaman menginap terbaik dengan standar pelayanan tertinggi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. EXPERIENCE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-emerald-100 rounded-[3rem] transform -rotate-3 scale-105 opacity-50"></div>
              <img 
                src="https://picsum.photos/seed/luxury/1000/1200" 
                alt="Experience" 
                referrerPolicy="no-referrer"
                className="relative rounded-[3rem] shadow-2xl object-cover h-[600px] w-full"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-xs hidden md:block animate-slide-up">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                    <p className="text-sm text-slate-500">Rating Rata-rata</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 font-medium">Dari 10,000+ tamu yang puas dengan layanan kami.</p>
              </div>
            </div>

            <div className="lg:pl-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Ciptakan Momen <br/>
                <span className="text-gradient">Tak Terlupakan</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Lebih dari sekadar tempat menginap, kami menawarkan pengalaman yang menyatu dengan alam, budaya lokal, dan kemewahan modern. Setiap properti kami dirancang untuk memberikan privasi dan kenyamanan maksimal.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Lokasi eksklusif dan tersembunyi",
                  "Desain arsitektur yang memukau",
                  "Fasilitas premium standar hotel bintang 5",
                  "Pelayanan personal 24 jam"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/search" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl">
                Mulai Petualangan Anda
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIAL SLIDER */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary-900/50 blur-[100px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/50 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Quote className="w-12 h-12 text-primary-500 mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
            <p className="text-slate-400">Cerita dan pengalaman nyata dari tamu kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi) => (
              <div key={testi.id} className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 text-slate-200">"{testi.comment}"</p>
                <div className="flex items-center gap-4">
                  <img src={testi.avatar} alt={testi.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-full border-2 border-primary-500" />
                  <div>
                    <h4 className="font-bold">{testi.name}</h4>
                    <p className="text-sm text-slate-400">Tamu Terverifikasi</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Siap Untuk Liburan <br/> Impian Anda?
          </h2>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Jangan tunda lagi. Pesan sekarang dan nikmati pengalaman menginap yang tak terlupakan bersama Nusantara Retreats.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30 text-lg">
              Cari Penginapan
            </Link>
            <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border-2 border-slate-200 hover:border-slate-900 transition-colors text-lg">
              Hubungi CS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
