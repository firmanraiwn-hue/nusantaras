import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { cottages, categories } from '@/config/data';
import CottageCard from '@/components/ui/CottageCard';
import { cn } from '@/lib/utils';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Sync state with URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setSearchParams(catId === 'all' ? {} : { category: catId });
  };

  // Filter logic
  let filteredCottages = cottages;
  if (activeCategory !== 'all') {
    filteredCottages = cottages.filter(c => c.category === activeCategory);
  }

  // Sort logic
  if (sortBy === 'price-low') {
    filteredCottages.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredCottages.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredCottages.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Temukan Penginapan Anda</h1>
          <p className="text-slate-500 text-lg">Menampilkan {filteredCottages.length} properti terbaik untuk Anda.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 font-medium text-slate-700"
            >
              <Filter className="w-5 h-5" /> Filter
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Urutkan:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium text-slate-900 outline-none"
              >
                <option value="recommended">Rekomendasi</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Sidebar Filter (Desktop) & Slide-in (Mobile) */}
          <div className={cn(
            "fixed inset-0 z-50 lg:static lg:z-auto lg:w-1/4 lg:block transition-transform duration-300",
            isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}>
            {/* Mobile Overlay */}
            <div 
              className={cn("absolute inset-0 bg-black/50 lg:hidden", isFilterOpen ? "block" : "hidden")}
              onClick={() => setIsFilterOpen(false)}
            ></div>

            <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white lg:static lg:w-full lg:bg-transparent h-full overflow-y-auto lg:overflow-visible p-6 lg:p-0 shadow-2xl lg:shadow-none">
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="text-xl font-bold">Filter</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-slate-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white lg:p-6 lg:rounded-3xl lg:shadow-sm lg:border lg:border-slate-100 space-y-8">
                
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary-500" /> Kategori
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl font-medium transition-colors",
                        activeCategory === 'all' ? "bg-primary-50 text-primary-700" : "hover:bg-slate-50 text-slate-600"
                      )}
                    >
                      Semua Kategori
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl font-medium transition-colors",
                          activeCategory === cat.id ? "bg-primary-50 text-primary-700" : "hover:bg-slate-50 text-slate-600"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range (Visual only for demo) */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Rentang Harga</h3>
                  <div className="space-y-4">
                    <input type="range" className="w-full accent-primary-600" />
                    <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
                      <span>Rp 1jt</span>
                      <span>Rp 10jt+</span>
                    </div>
                  </div>
                </div>

                {/* Facilities (Visual only for demo) */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Fasilitas</h3>
                  <div className="space-y-3">
                    {['Kolam Renang', 'WiFi Cepat', 'Sarapan', 'AC', 'Dapur'].map((fac, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border-2 border-slate-300 group-hover:border-primary-500 flex items-center justify-center transition-colors">
                          {/* Checked state would go here */}
                        </div>
                        <span className="text-slate-600 font-medium">{fac}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Mobile Apply Button */}
              <div className="mt-8 lg:hidden">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:w-3/4">
            
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex gap-2">
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full">
                    {categories.find(c => c.id === activeCategory)?.name}
                    <button onClick={() => handleCategoryChange('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium">Urutkan berdasarkan:</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 text-slate-900 font-medium py-2 pl-4 pr-10 rounded-xl outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="recommended">Rekomendasi</option>
                    <option value="price-low">Harga: Rendah ke Tinggi</option>
                    <option value="price-high">Harga: Tinggi ke Rendah</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredCottages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCottages.map(cottage => (
                  <CottageCard key={cottage.id} cottage={cottage} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak ada hasil</h3>
                <p className="text-slate-500">Coba ubah filter atau kategori pencarian Anda.</p>
                <button 
                  onClick={() => handleCategoryChange('all')}
                  className="mt-6 px-6 py-2 bg-primary-50 text-primary-700 font-semibold rounded-xl hover:bg-primary-100 transition-colors"
                >
                  Hapus Semua Filter
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
