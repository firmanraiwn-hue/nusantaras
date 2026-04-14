import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Copy, CheckCircle2, QrCode, Building2, MessageCircle } from 'lucide-react';
import { cottages, siteConfig } from '@/config/data';
import { cn } from '@/lib/utils';

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cottage = cottages.find(c => c.id === id);
  
  const [activeTab, setActiveTab] = useState<'transfer' | 'qris'>('transfer');
  const [copied, setCopied] = useState('');
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!cottage) return <div>Not found</div>;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const totalPrice = cottage.price * 1.1;

  const whatsappMessage = encodeURIComponent(
    `Halo Nusantara Retreats, saya ingin konfirmasi pembayaran untuk pesanan:\n\n` +
    `Properti: ${cottage.name}\n` +
    `Total: Rp ${totalPrice.toLocaleString('id-ID')}\n` +
    `Metode: ${activeTab === 'transfer' ? 'Transfer Bank' : 'QRIS'}\n\n` +
    `Berikut saya lampirkan bukti transfer.`
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* 1. PAYMENT HEADER */}
      <div className="bg-gradient-primary pt-32 pb-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Selesaikan Pembayaran</h1>
          <p className="text-white/80 text-lg">Pesanan Anda telah diamankan sementara.</p>
          
          {/* 5. PAYMENT TIMER */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full mt-8">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-white font-medium">Selesaikan dalam</span>
            <span className="text-xl font-bold text-amber-400 font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        
        {/* Booking Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-8 flex items-center gap-6">
          <img src={cottage.images[0]} alt={cottage.name} referrerPolicy="no-referrer" className="w-24 h-24 rounded-2xl object-cover hidden sm:block" />
          <div className="flex-1">
            <p className="text-sm text-slate-500 font-medium mb-1">Total Pembayaran</p>
            <p className="text-3xl font-bold text-primary-600 mb-2">Rp {totalPrice.toLocaleString('id-ID')}</p>
            <p className="text-slate-900 font-medium">{cottage.name}</p>
          </div>
        </div>

        {/* 2. PAYMENT METHODS (TABS) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('transfer')}
              className={cn(
                "flex-1 py-5 font-bold text-center transition-colors flex items-center justify-center gap-2",
                activeTab === 'transfer' ? "bg-primary-50 text-primary-700 border-b-2 border-primary-600" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <Building2 className="w-5 h-5" /> Transfer Bank
            </button>
            <button 
              onClick={() => setActiveTab('qris')}
              className={cn(
                "flex-1 py-5 font-bold text-center transition-colors flex items-center justify-center gap-2",
                activeTab === 'qris' ? "bg-primary-50 text-primary-700 border-b-2 border-primary-600" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <QrCode className="w-5 h-5" /> QRIS
            </button>
          </div>

          <div className="p-8">
            {/* 3. BANK TRANSFER SECTION */}
            {activeTab === 'transfer' && (
              <div className="space-y-6 animate-fade-in">
                <p className="text-slate-600 font-medium mb-6">Transfer tepat sesuai nominal ke salah satu rekening berikut:</p>
                
                {siteConfig.banks.map((bank) => (
                  <div key={bank.id} className="border border-slate-200 rounded-2xl p-6 hover:border-primary-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <img src={bank.logo} alt={bank.name} referrerPolicy="no-referrer" className="h-8 object-contain" />
                      <span className="text-sm font-bold text-slate-900">{bank.name}</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">Nomor Rekening</p>
                        <p className="text-xl font-bold text-slate-900 font-mono">{bank.accountNumber}</p>
                        <p className="text-sm text-slate-600 mt-1">a.n {bank.accountName}</p>
                      </div>
                      <button 
                        onClick={() => handleCopy(bank.accountNumber, bank.id)}
                        className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all"
                      >
                        {copied === bank.id ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-6">
                  <h4 className="font-bold text-blue-900 mb-2">Instruksi Pembayaran</h4>
                  <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                    <li>Pilih bank tujuan transfer.</li>
                    <li>Salin nomor rekening di atas.</li>
                    <li>Lakukan transfer melalui ATM, m-banking, atau internet banking.</li>
                    <li>Simpan bukti transfer Anda.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* 4. QRIS SECTION */}
            {activeTab === 'qris' && (
              <div className="flex flex-col items-center text-center animate-fade-in">
                <div className="relative p-8 bg-white rounded-3xl shadow-[0_0_40px_rgba(20,184,166,0.15)] border border-primary-100 mb-6">
                  {/* Decorative corners */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-primary-500 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-primary-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-primary-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-primary-500 rounded-br-lg"></div>
                  
                  <img src={siteConfig.qris.image} alt="QRIS" referrerPolicy="no-referrer" className="w-64 h-64 object-contain" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">Scan QRIS</h3>
                <p className="text-slate-500 max-w-sm">{siteConfig.qris.instruction}</p>
                
                <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Total Tagihan</p>
                    <p className="text-xl font-bold text-slate-900 font-mono">Rp {totalPrice.toLocaleString('id-ID')}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(totalPrice.toString(), 'price')}
                    className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-primary-50 hover:text-primary-600 transition-all"
                  >
                    {copied === 'price' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 6. CONFIRMATION BUTTON */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 mb-4">Sudah melakukan pembayaran?</p>
          <a 
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace('+', '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg rounded-2xl transition-colors shadow-lg hover:shadow-[#25D366]/30"
          >
            <MessageCircle className="w-6 h-6" />
            Konfirmasi via WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
