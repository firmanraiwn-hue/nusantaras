import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Users, CreditCard, CheckCircle2, Star } from 'lucide-react';
import { cottages } from '@/config/data';
import { cn } from '@/lib/utils';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cottage = cottages.find(c => c.id === id);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    specialRequest: ''
  });

  if (!cottage) return <div>Not found</div>;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate(`/payment/${cottage.id}`);
  };

  const steps = [
    { num: 1, title: 'Tanggal & Tamu', icon: Calendar },
    { num: 2, title: 'Data Diri', icon: Users },
    { num: 3, title: 'Rincian', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Selesaikan Pemesanan</h1>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-500 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step >= s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-4 border-slate-50 transition-colors duration-500",
                    isActive ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-400"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-sm font-bold absolute -bottom-6 whitespace-nowrap",
                    isActive ? "text-primary-700" : "text-slate-400"
                  )}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 animate-fade-in">
              
              {/* Step 1: Dates & Guests */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Pilih Tanggal & Tamu</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Check-in</label>
                      <input 
                        type="date" 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Check-out</label>
                      <input 
                        type="date" 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Jumlah Tamu</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} Orang</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Guest Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Informasi Pemesan</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                      <input 
                        type="text" 
                        placeholder="Sesuai KTP/Paspor"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email</label>
                        <input 
                          type="email" 
                          placeholder="email@contoh.com"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Nomor Telepon</label>
                        <input 
                          type="tel" 
                          placeholder="0812..."
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Permintaan Khusus (Opsional)</label>
                      <textarea 
                        rows={3}
                        placeholder="Misal: Ranjang tambahan, alergi makanan..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        value={formData.specialRequest}
                        onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Rincian Pemesanan</h2>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Nama Pemesan</span>
                      <span className="font-bold text-slate-900">{formData.name || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Kontak</span>
                      <span className="font-bold text-slate-900 text-right">{formData.email}<br/>{formData.phone}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Check-in</span>
                      <span className="font-bold text-slate-900">{formData.checkIn || '-'} (14:00)</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Check-out</span>
                      <span className="font-bold text-slate-900">{formData.checkOut || '-'} (12:00)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Tamu</span>
                      <span className="font-bold text-slate-900">{formData.guests} Orang</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
                    <div className="text-amber-600 mt-0.5">⚠️</div>
                    <p className="text-sm text-amber-800 font-medium">
                      Pastikan semua data sudah benar. E-voucher akan dikirimkan ke email yang terdaftar setelah pembayaran berhasil.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={handleNext}
                  className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/30 flex items-center gap-2"
                >
                  {step === 3 ? 'Lanjut ke Pembayaran' : 'Selanjutnya'} 
                  <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>

            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-28">
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <img src={cottage.images[0]} alt={cottage.name} referrerPolicy="no-referrer" className="w-24 h-24 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{cottage.name}</h3>
                  <p className="text-sm text-slate-500">{cottage.location}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md w-fit">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {cottage.rating}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                <h4 className="font-bold text-slate-900">Rincian Harga</h4>
                <div className="flex justify-between text-slate-600">
                  <span>Rp {cottage.price.toLocaleString('id-ID')} x 1 malam</span>
                  <span>Rp {cottage.price.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pajak & Biaya Layanan (10%)</span>
                  <span>Rp {(cottage.price * 0.1).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-slate-900">Total Pembayaran</span>
                <span className="text-2xl font-bold text-primary-600">
                  Rp {(cottage.price * 1.1).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
