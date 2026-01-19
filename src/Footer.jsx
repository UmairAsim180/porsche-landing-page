import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-20 px-10 md:px-20 pointer-events-auto relative z-10 border-t border-white/10 overflow-hidden">
      
      
      
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black italic tracking-tighter text-white opacity-[0.03] select-none whitespace-nowrap pointer-events-none">
        GT3 RS
      </h1>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter mb-4">PORSCHE</h2>
            <div className="font-mono text-[10px] text-gray-500 space-y-1 border-l-2 border-red-600 pl-4">
              <p>STUTTGART — DE</p>
              <p>LAT: 48.834° N</p>
              <p>LON: 9.152° E</p>
            </div>
          </div>

          
          <div className="border border-white/20 p-4 text-center hidden md:block">
             <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-1">Nürburgring Lap</p>
             <p className="text-3xl font-black italic text-red-600">6:49.328</p>
          </div>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-16 mb-8">
          
          
          <div>
            <h4 className="font-bold tracking-widest text-xs uppercase mb-6 text-red-600">Configuration</h4>
            <ul className="space-y-3 font-mono text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Build Your Own</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compare Models</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Weissach Package</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Accessories</a></li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-bold tracking-widest text-xs uppercase mb-6 text-red-600">Experience</h4>
            <ul className="space-y-3 font-mono text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Porsche Track Precision</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Driving School</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Motorsport</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Christophorus Mag</a></li>
            </ul>
          </div>

          
          <div>
            <h4 className="font-bold tracking-widest text-xs uppercase mb-6 text-red-600">Legal</h4>
            <ul className="space-y-3 font-mono text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Settings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Consumption Data</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Whistleblower System</a></li>
            </ul>
          </div>

          
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold tracking-widest text-xs uppercase mb-6 text-red-600">Updates</h4>
            <p className="font-mono text-[10px] text-gray-500 mb-4">
              Receive the latest telemetry from Porsche AG.
            </p>
            <div className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-700 font-mono"
              />
              <button className="text-xs font-bold uppercase text-red-600 hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          <p>© 2024 Dr. Ing. h.c. F. Porsche AG</p>
          <p className="mt-2 md:mt-0">System Status: <span className="text-green-500">Normal</span></p>
        </div>

      </div>
    </footer>
  );
}