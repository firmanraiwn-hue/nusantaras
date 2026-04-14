import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Share2, Heart, ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon, Users, Wifi, Waves, Coffee, Wind, Car, Umbrella, Tv, Flame, Wine } from 'lucide-react';
import { cottages } from '@/config/data';
import { cn } from '@/lib/utils';

const FacilityIcons: Record<string, any> = { Wifi, Waves, Coffee, Wind, Car, Umbrella, Tv, Flame, Wine };

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cottage = cottages.find(c => c.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!cottage) {
    return <div className="min-h-screen flex items-center justify-center">Cottage tidak ditemukan.</div>;
  }

  const nextImage = () => setActiveImage((prev) => (prev + 1) % cottage.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + cottage.images.length) % cottage.images.length);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* 1. FULL IMAGE SLIDER */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-slate-900 group">
        <img 
          src={cottage.images[activeImage]} 
          alt={cottage.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover animate-fade-in"
          key={activeImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>
        
        {/* Top Actions */}
        <div className="absolute top-6 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "")} />
            </button>
          </div>
        </div>

        {/* Slider Controls */}
        {cottage.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100">
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2">
              {cottage.images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn("h-2 rounded-full transition-all", activeImage === idx ? "w-8 bg-white" : "w-2 bg-white/50")}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 2. FLOATING INFO CARD */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider rounded-full">
                      {cottage.category}
                    </span>
                    {cottage.isFeatured && (
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Unggulan
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{cottage.name}</h1>
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span>{cottage.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{cottage.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500 mt-2 font-medium">{cottage.reviews} Ulasan</span>
                </div>
              </div>
            </div>

            {/* 3. DESCRIPTION SECTION */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Tentang Properti Ini</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {cottage.description}
              </p>
            </div>

            {/* 4. FACILITIES GRID */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Fasilitas Utama</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {cottage.facilities.map((fac: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600">
                      {(() => {
                        const Icon = FacilityIcons[fac.icon] || Star;
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <span className="font-medium text-slate-700">{fac.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. ROOM HIGHLIGHTS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Keunggulan</h2>
              <div className="space-y-4">
                {cottage.highlights.map((highlight: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0 mt-1">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="text-lg text-slate-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar / Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <p className="text-slate-500 font-medium mb-1">Harga mulai dari</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">Rp {cottage.price.toLocaleString('id-ID')}</span>
                  <span className="text-slate-500">/malam</span>
                </div>
              </div>

              {/* 6. AVAILABILITY INFO (Mock) */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Check-in - Check-out</p>
                      <p className="text-sm font-bold text-slate-900">Pilih Tanggal</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:border-primary-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Tamu</p>
                      <p className="text-sm font-bold text-slate-900">2 Dewasa</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/booking/${cottage.id}`)}
                className="w-full py-4 bg-primary-600 text-white font-bold text-lg rounded-2xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30"
              >
                Pesan Sekarang
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                Anda belum dikenakan biaya.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 8. STICKY BOOKING BAR (BOTTOM - MOBILE ONLY) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:hidden z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Harga</p>
            <p className="text-xl font-bold text-slate-900">Rp {cottage.price.toLocaleString('id-ID')}</p>
          </div>
          <button 
            onClick={() => navigate(`/booking/${cottage.id}`)}
            className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg"
          >
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
