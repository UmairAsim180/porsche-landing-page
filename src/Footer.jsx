import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] text-white py-20 px-10 md:px-20 pointer-events-auto relative z-10">
      
      {/* Top Section: Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-gray-800 pb-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-black tracking-widest mb-6">PORSCHE</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Dr. Ing. h.c. F. Porsche AG<br />
            Porscheplatz 1<br />
            70435 Stuttgart<br />
            Germany
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="font-bold tracking-widest text-xs uppercase mb-6 text-gray-500">Models</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="#" className="hover:text-red-600 transition-colors">911</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">718 Cayman</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Taycan</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Panamera</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Macan</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-bold tracking-widest text-xs uppercase mb-6 text-gray-500">Services</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><a href="#" className="hover:text-red-600 transition-colors">Porsche Financial</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Porsche Finder</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Sign up for News</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Socials / Newsletter */}
        <div>
           <h4 className="font-bold tracking-widest text-xs uppercase mb-6 text-gray-500">Social Media</h4>
           <div className="flex gap-4">
             {/* Simple placeholders for social icons */}
             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">IG</div>
             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">X</div>
             <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">YT</div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-wider">
        <p>&copy; 2024 Porsche AG. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          <a href="#" className="hover:text-white transition-colors">Legal Notice</a>
        </div>
      </div>

    </footer>
  );
}