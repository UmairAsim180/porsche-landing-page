import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Stage, useProgress, Environment } from '@react-three/drei';
import { Porsche } from './Porsche';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './Loader';
import { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


// gsap plugin register 
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

// 3d scene of porche 
function SceneContent() {
  // Ref for the Porsche component
  const textRef = useRef();
  const carRef = useRef();

  // GSAP Animations
  useGSAP(() => {
    // safety check 
    if (!textRef.current || !carRef.current) return;
    gsap.from(textRef.current.position, {
      y: 10,
      duration: 2.5,
      ease: "power3.out",
      delay: 0.5,
    })
    gsap.from(textRef.current.material, {
      opacity: 0,
      duration: 2
    });
    gsap.from(carRef.current.position, {
      x: -10,
      duration: 2,
      ease: "power2.out"
    })
    // timelines for section 1
    const sec1Tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sec-1',
        start: 'top center',
        end: '80% 80%',
        scrub: 3,
      }
    })
      .to(textRef.current.material, {
        opacity: 0,
      })
      .to(carRef.current.position, {
        x: -2,
        z: -1,
        duration: 1,
        ease: "power2.out"
      }, "<")
      .to(carRef.current.rotation, {
        y: -Math.PI * 0.8,
        duration: 2,
        ease: "power2.out"
      }, "<")
    // timelines for section 2
    const sec2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sec-2',
        start: 'top center',
        end: '80% 80%',
        scrub: 3,
      }
    })
      .to(carRef.current.position, {
        x: -6,
        duration: 1,
        ease: "power2.out"
      }, "<")
      .to(carRef.current.rotation, {
        y: -Math.PI,
        duration: 2,
        ease: "power2.out"
      }, "<")
    const sec3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sec-3',
        start: 'top center',
        end: '80% 80%',
        scrub: 3,
      }
    })
      .to(carRef.current.position, {
        x: -3,
        z: -2,
        duration: 1,
        ease: "power2.out"
      }, "<")
      .to(carRef.current.rotation, {
        y: -Math.PI * 1.3,
        duration: 2,
        ease: "power2.out"
      }, "<")

  }, []);
  return (
    <>
      <Text
        ref={textRef}
        position={[0, 1.3, -2]}
        fontSize={1.5}
        color="#0F172A"
        font='/font/911porschav3.ttf'
        anchorX="center"
        anchorY="middle"
        fillOpacity={1}
      >
        PORSCHE
      </Text>
      <Environment files="/potsdamer_platz_1k.hdr" />
      <Stage
        environment={null}
        intensity={0.5}
        contactShadow={{ opacity: 0.5, blur: 2 }}
        adjustCamera={false}
      >
        <Porsche ref={carRef} />
      </Stage>

      <OrbitControls enableZoom={false} enableRotate={false} />
    </>
  );
}

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
          {/* FIX: Added pointer-events-auto so you can select this text */}
          <div className="w-1/3 text-[#0F172A] pointer-events-auto">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Performance</h3>
            <h2 className="text-6xl font-black mb-6 leading-tight">RELENTLESS <br /> PROPULSION</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              The 3.7-litre twin-turbo flat-six engine produces a terrifying <strong>640 hp</strong>.
              With the 8-speed PDK transmission, power delivery is instantaneous,
              launching you from standstill to precision speed in a heartbeat.
            </p>

            {/* Stats Grid */}
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-300 pt-8">
              <div>
                <h4 className="text-4xl font-black">2.6s</h4>
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">0-60 mph</p>
              </div>
              <div>
                <h4 className="text-4xl font-black">205</h4>
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">Top Speed (mph)</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AERODYNAMICS */}
        <section className="w-full sec-2 h-screen flex items-center justify-end px-20">
          {/* FIX: Added pointer-events-auto */}
          <div className="w-1/3 text-[#0F172A] text-right pointer-events-auto">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Aerodynamics</h3>
            <h2 className="text-6xl font-black mb-6 leading-tight">CONTROL <br /> THE AIR</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              Form follows function. The adaptive front spoiler and variable rear wing
              work in harmony to generate downforce for cornering or reduce drag for top speed.
              It is an athlete that cuts through the wind.
            </p>
          </div>
        </section>

        {/* SECTION 3: ENGINEERING */}
        <section className="w-full sec-3 h-screen flex items-center px-20">
          {/* FIX: Added pointer-events-auto */}
          <div className="w-1/3 text-[#0F172A] pointer-events-auto">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Engineering</h3>
            <h2 className="text-6xl font-black mb-6 leading-tight">MASTER <br /> THE CURVE</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              Rear-axle steering provides the agility of a shorter wheelbase during tight
              maneuvers and the stability of a longer wheelbase at high speeds.
              Physics, redefined.
            </p>

            {/* THIS BUTTON WILL WORK NOW */}
            <button
              onClick={scrollToTop}
              className="mt-8 px-8 py-3 bg-[#0F172A] text-white font-bold tracking-widest text-xs uppercase hover:bg-red-600 transition-colors cursor-pointer"
            >
              Configure Yours
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default App;