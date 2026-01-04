import React from 'react'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full p-8 z-40 flex justify-between items-center pointer-events-none">
            {/* Left: Brand / Model Name */}
            {/* pointer-events-auto allows clicking this specific element */}
            <div className="text-[#0F172A] font-black text-xl tracking-widest pointer-events-auto cursor-pointer">
                PORSCHE <span className="font-light opacity-60">911</span>
            </div>

            {/* Right: Menu / Actions */}
            <div className="flex gap-8 items-center pointer-events-auto">
                <a href="#" className="text-[#0F172A] font-bold text-sm tracking-widest hover:text-red-600 transition-colors hidden md:block">
                    MODELS
                </a>
                <a href="#" className="text-[#0F172A] font-bold text-sm tracking-widest hover:text-red-600 transition-colors hidden md:block">
                    SHOP
                </a>

                {/* Hamburger Menu Icon */}
                <button className="group space-y-1.5 cursor-pointer">
                    <div className="w-8 h-0.5 bg-[#0F172A] group-hover:bg-red-600 transition-colors"></div>
                    <div className="w-6 h-0.5 bg-[#0F172A] group-hover:bg-red-600 transition-colors ml-auto"></div>
                    <div className="w-8 h-0.5 bg-[#0F172A] group-hover:bg-red-600 transition-colors"></div>
                </button>
            </div>
        </nav>
    )
}

export default Navbar