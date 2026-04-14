import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Clock, ChevronRight, CheckCircle2, Search } from 'lucide-react';
import { cottages } from '@/config/data';
import { cn } from '@/lib/utils';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  // Mock user data
  const user = {
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "+62 812 3456 7890",
    avatar: "https://i.pravatar.cc/150?u=budi"
  };

  // Mock bookings
  const mockBookings = [
    {
      id: "INV-20260414-001",
      cottageId: "c1",
      checkIn: "2026-05-10",
      checkOut: "2026-05-12",
      status: "confirmed", // confirmed, pending, completed, cancelled
      total: 5500000,
      createdAt: "2026-04-14"
    },
    {
      id: "INV-20251220-045",
      cottageId: "c3",
      checkIn: "2025-12-24",
      checkOut: "2025-12-26",
      status: "completed",
      total: 3300000,
      createdAt: "2025-12-20"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Dikonfirmasi</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu Pembayaran</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">Selesai</span>;
      default:
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Dibatalkan</span>;
    }
  };

  const activeBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const historyBookings = mockBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const displayBookings = activeTab === 'active' ? activeBookings : historyBookings;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. USER HEADER */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-primary-700 transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{user.name}</h1>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-slate-500 font-medium">
                <span className="flex items-center justify-center md:justify-start gap-2"><Mail className="w-4 h-4" /> {user.email}</span>
                <span className="flex items-center justify-center md:justify-start gap-2"><Phone className="w-4 h-4" /> {user.phone}</span>
              </div>
            </div>

            <button className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Edit Profil
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('active')}
            className={cn(
              "pb-4 font-bold text-lg transition-colors relative",
              activeTab === 'active' ? "text-primary-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Pesanan Aktif
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={cn(
              "pb-4 font-bold text-lg transition-colors relative",
              activeTab === 'history' ? "text-primary-600" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Riwayat
            {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full"></div>}
          </button>
        </div>

        {/* 2. BOOKING HISTORY LIST */}
        <div className="space-y-6">
          {displayBookings.length > 0 ? (
            displayBookings.map((booking) => {
              const cottage = cottages.find(c => c.id === booking.cottageId);
              if (!cottage) return null;

              return (
                <div key={booking.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full md:w-48 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 relative">
                      <img src={cottage.images[0]} alt={cottage.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{cottage.name}</h3>
                          <span className="text-sm font-medium text-slate-500">ID: {booking.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                          <MapPin className="w-4 h-4" /> {cottage.location}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 bg-slate-50 p-4 rounded-xl">
                          <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">Check-in</p>
                            <p className="font-bold text-slate-900 flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-500" /> {booking.checkIn}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">Check-out</p>
                            <p className="font-bold text-slate-900 flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-500" /> {booking.checkOut}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-500 font-medium mb-0.5">Total Harga</p>
                          <p className="text-lg font-bold text-slate-900">Rp {booking.total.toLocaleString('id-ID')}</p>
                        </div>
                        <button className="flex items-center gap-1 text-primary-600 font-bold hover:text-primary-700 transition-colors">
                          Lihat Detail <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            /* 3. EMPTY STATE */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Belum ada pesanan</h3>
              <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
                Anda belum memiliki pesanan {activeTab === 'active' ? 'aktif' : 'di riwayat'}. Yuk, mulai rencanakan liburan impian Anda!
              </p>
              <Link 
                to="/search"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30"
              >
                Cari Penginapan Sekarang
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
