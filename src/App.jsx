import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import Loader from './Loader';
import { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SceneContent from './SceneContent';

function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const { active } = useProgress();

  return (
    <div className="w-full h-full bg-[#E8E8E8] relative overflow-x-hidden">
      <Loader />
      <Navbar />
      {/* 1. THE 3D WORLD (Background Layer) */}
      {/* FIX: Added z-0 so it sits BEHIND the text */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      </div>

      <section className='h-screen' />

      {/* 2. THE HTML CONTENT (Foreground Layer) */}
      {/* FIX: Added relative z-10 (puts it on top) and pointer-events-none (lets you click through empty space) */}
      <div className={`relative z-10 pointer-events-none ${active ? 'hidden' : ''}`}>

        {/* SECTION 1: PERFORMANCE */}
        <section className="w-full sec-1 h-screen flex items-center px-20">
          <div className="w-1/3 text-[#0F172A] pointer-events-auto">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Performance</h3>
            <h2 className="text-6xl font-black mb-6 leading-tight">SCREAMING <br /> AT 9,000 RPM</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              No turbos. No filtering. Just a <strong>4.0-liter naturally aspirated</strong> flat-six
              that howls to a deafening 9,000 RPM. With 518 hp and lightning-fast throttle response,
              this is not just an engine—it is a musical instrument of speed.
            </p>

            {/* Stats Grid - GT3 RS Stats */}
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-300 pt-8">
              <div>
                <h4 className="text-4xl font-black">3.0s</h4>
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">0-60 mph</p>
              </div>
              <div>
                <h4 className="text-4xl font-black">9k</h4>
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">Redline (RPM)</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AERODYNAMICS */}
        <section className="w-full sec-2 h-screen flex items-center justify-end px-20">
          <div className="w-1/3 text-[#0F172A] text-right pointer-events-auto">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Aerodynamics</h3>
            <h2 className="text-6xl font-black mb-6 leading-tight">ACTIVE <br /> WEAPONRY</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              The first production Porsche with a <strong>Drag Reduction System (DRS)</strong>.
              With the push of a button, the massive swan-neck rear wing flattens to reduce drag,
              or snaps vertical to act as an airbrake. Total downforce: 1,895 lbs.
            </p>
          </div>
        </section>

        {/* SECTION 3: LIGHTWEIGHT */}
        <section className="w-full sec-3 h-screen flex items-center px-20">
          <div className="w-1/3 text-[#0F172A] pointer-events-auto">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Lightweight</h3>
            <h2 className="text-6xl font-black mb-6 leading-tight">OBSESSIVE <br /> DIET</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              Carbon fiber doors, roof, hood, and wings. Magnesium wheels. Thinner glass.
              Every gram was fought for. The result is a chassis so stiff and reactive,
              it feels hardwired to your nervous system.
            </p>

            <button
              onClick={scrollToTop}
              className="mt-8 px-8 py-3 bg-[#0F172A] text-white font-bold tracking-widest text-xs uppercase hover:bg-red-600 transition-colors cursor-pointer"
            >
              Configure Track Beast
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default App;