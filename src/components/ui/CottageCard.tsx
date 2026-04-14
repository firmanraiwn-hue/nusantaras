import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CottageCardProps {
  cottage: any;
  className?: string;
  key?: string | number;
}

export default function CottageCard({ cottage, className }: CottageCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={cn("group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100", className)}>
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={cottage.images[0]} 
          alt={cottage.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {cottage.isFeatured && (
            <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg">
              Pilihan Utama
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors z-10"
        >
          <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-white")} />
        </button>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-sm font-medium">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{cottage.rating}</span>
          <span className="text-white/70 text-xs">({cottage.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {cottage.name}
            </h3>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{cottage.location}</span>
            </div>
          </div>
        </div>

        {/* Facilities Preview */}
        <div className="flex items-center gap-3 mb-5 text-slate-500 text-sm">
          {cottage.facilities.slice(0, 3).map((fac: any, idx: number) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
              <span className="truncate max-w-[80px]">{fac.name}</span>
            </div>
          ))}
          {cottage.facilities.length > 3 && (
            <span className="text-xs font-medium bg-slate-100 px-1.5 py-0.5 rounded-md">+{cottage.facilities.length - 3}</span>
          )}
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-500 font-medium mb-0.5">Mulai dari</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-900">Rp {cottage.price.toLocaleString('id-ID')}</span>
              <span className="text-sm text-slate-500">/malam</span>
            </div>
          </div>
          <Link 
            to={`/cottage/${cottage.id}`}
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-md hover:shadow-xl"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
