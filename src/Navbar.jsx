import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-10 md:px-20 flex justify-between items-center mix-blend-difference text-white pointer-events-auto border-b border-white/10 backdrop-blur-[2px]">
      
      {/* LEFT: BRANDING */}
      <div className="flex items-end gap-2 group cursor-pointer">
        <h1 className="text-2xl font-black tracking-tighter italic">
          PORSCHE
        </h1>
        <span className="text-sm font-bold tracking-[0.2em] mb-1 text-cyan-600 group-hover:translate-x-1 transition-transform duration-300">
          GT3 RS
        </span>
      </div>

      {/* CENTER: TECHNICAL LINKS (Hidden on mobile) */}
      <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase">
        {['Technical', 'Design', 'Track Mode'].map((item) => (
          <a 
            key={item} 
            href="#" 
            className="relative group overflow-hidden"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
              {item}
            </span>
            <span className="absolute top-0 left-0 block translate-y-full text-red-600 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              {item}
            </span>
          </a>
        ))}
      </div>

      {/* RIGHT: MENU BUTTON */}
      <button className="hidden md:block px-6 py-2 border border-white/20 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300">
        Menu
      </button>

      {/* MOBILE HAMBURGER (Visible on small screens) */}
      <div className="md:hidden space-y-1 cursor-pointer">
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-4 h-0.5 bg-white ml-auto"></div>
      </div>

    </nav>
  );
}