import { Menu, X } from 'lucide-react'; // Import X for close icon
import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef();

  // --- GSAP ANIMATION LOGIC ---
  useGSAP(() => {
    if (isOpen) {
      // 1. Slide Menu In
      gsap.to('.mobile-overlay', { 
        x: '0%', 
        duration: 1, 
        ease: 'power4.out' 
      });
      
      // 2. Stagger Links In (Wait slightly so menu is visible first)
      gsap.fromTo('.mobile-link', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
      );
    } else {
      // Close Menu
      gsap.to('.mobile-overlay', { 
        x: '100%', 
        duration: 0.8, 
        ease: 'power3.in' 
      });
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Link data to prevent code repetition
  const navLinks = ['Technical', 'Design', 'Track Mode'];

  return (
    <nav ref={container} className="fixed top-0 left-0 w-full z-50 py-6 px-10 md:px-20 flex justify-between items-center mix-blend-difference text-white pointer-events-auto border-b border-white/10 backdrop-blur-[2px]">

      {/* LEFT: BRANDING */}
      {/* Added z-50 so it stays on top of the mobile menu */}
      <div className="flex items-end gap-2 group cursor-pointer z-50">
        <h1 className="text-2xl font-black tracking-tighter italic">
          PORSCHE
        </h1>
        <span className="text-sm font-bold tracking-[0.2em] mb-1 text-cyan-600 group-hover:translate-x-1 transition-transform duration-300">
          GT3 RS
        </span>
      </div>

      {/* CENTER: DESKTOP LINKS */}
      <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase">
        {navLinks.map((item) => (
          <a key={item} href="#" className="relative group overflow-hidden">
            <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
              {item}
            </span>
            <span className="absolute top-0 left-0 block translate-y-full text-red-600 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              {item}
            </span>
          </a>
        ))}
      </div>

      {/* RIGHT: MOBILE TOGGLE */}
      {/* Z-50 ensures the X button is clickable even when menu is open */}
      <div onClick={toggleMenu} className="md:hidden cursor-pointer z-50 hover:text-red-600 transition-colors">
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </div>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <div className="mobile-overlay fixed top-0 right-0 w-full h-screen bg-[#0F172A] z-40 translate-x-full flex flex-col justify-center items-center gap-6">
        
        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/5 pointer-events-none select-none">
          911
        </div>

        {navLinks.map((item) => (
          <a 
            key={item}
            href="#" 
            onClick={toggleMenu} // Close menu when clicking a link
            className="mobile-link text-4xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400 hover:to-red-600 transition-all"
          >
            {item}
          </a>
        ))}

        <div className="mobile-link w-16 h-1 bg-red-600 rounded-full mt-4"></div>


      </div>

    </nav>
  );
}