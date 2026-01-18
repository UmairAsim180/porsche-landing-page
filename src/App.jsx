import { Canvas, useThree } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Loader from './Loader';
import { Suspense, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SceneContent from './SceneContent';
import { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useIsMobile } from './hooks/useIsMobile';
import { useLenis } from 'lenis/react';
import Cursor from './Cursor';
import { driver } from "driver.js";
import "driver.js/dist/driver.css"; // Import standard CSS

function App() {
  const { active } = useProgress();
  const [ignitionState, setIgnitionState] = useState(0);
  const [porscheColors, setColors] = useState([
    { name: "Acid Green", hex: "#B8D335", class: "bg-[#B8D335]" },     // Radioactive/Toxic
    { name: "Lava Orange", hex: "#E04F00", class: "bg-[#E04F00]" },    // High Danger
    { name: "Ultraviolet", hex: "#46185F", class: "bg-[#46185F]" },    // Deep Purple
    { name: "Voodoo Blue", hex: "#005596", class: "bg-[#005596]" },    // Intense Non-Metallic
    { name: "Chalk", hex: "#D6D6D1", class: "bg-[#D6D6D1]" },          // Concrete/Modern
    { name: "Guards Red", hex: "#E31D2B", class: "bg-[#E31D2B]" },     // Classic Speed
    { name: "Stealth Black", hex: "#010101", class: "bg-black" },      // Batmobile
  ])
  const [selectedColor, setSelectedColor] = useState(5)
  let isMobile = useIsMobile()
  const lenis = useLenis()

  const coldStartRef = useRef(new Audio('/cold_start.mp3'));
  const idleRef = useRef(new Audio('/idle.mp3'));

  useEffect(() => { // NOTE: Need to be moved
    // Only run if the engine is OFF
    if (ignitionState === 0) {

      const driverObj = driver({
        showProgress: false,
        animate: true,
        // Customizing the popover to look like your dark theme
        popoverClass: 'driverjs-theme',
        steps: [
          {
            element: '.engineSwitch', // Target your Ignition Switch class
            popover: {
              title: 'Start Your Engine',
              description: 'Turn the key to wake up the beast.',
              side: "left",
              align: 'center'
            }
          },
          {
            element: '.colorConfigurtor', // Target your Color Picker class
            popover: {
              title: 'Customize Finish',
              description: 'Select from official Porsche PTS colors.',
              side: "top",
              align: 'center'
            }
          }
        ]
      });

      driverObj.drive();
    }
  }, []); 


  useGSAP(() => {
    gsap.from('.colorBlock', {
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.1,
      delay: 1
    })
    gsap.to('.engineSwitch, .colorConfigurtor', {
      scrollTrigger: {
        trigger: '.sec-0',
        start: '20% top',
        end: '60% end',
        scrub: 2,
      },
      opacity: 0,
    });
  }
  )
  useGSAP(() => {
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
    if (isMobile) {
      gsap.to('.sec-1', {
        scrollTrigger: {
          trigger: '.sec-1',
          start: 'top 45%',
          end: 'bottom 60%',
          scrub: 2,
        },

        opacity: 0,
      })
      gsap.to('.sec-2', {
        scrollTrigger: {
          trigger: '.sec-2',
          start: 'top 45%',
          end: 'bottom 60%',
          scrub: 2,
        },
        // y: 100,
        opacity: 0,
      })
      gsap.to('.sec-3', {
        scrollTrigger: {
          trigger: '.sec-3',
          start: 'top 45%',
          end: 'bottom 60%',
          scrub: 2,
        },
        // y: 100,
        opacity: 0,
      })
    }

  }, [isMobile]);


  useEffect(() => {
    const coldStart = coldStartRef.current;
    const idle = idleRef.current;

    idle.loop = true;
    if (ignitionState === 2) {
      coldStart.volume = 1.0;
      coldStart.currentTime = 0;
      coldStart.play();

      coldStart.onended = () => {
        idle.currentTime = 0;
        idle.play();
      };

    } else if (ignitionState === 0) {
      coldStart.pause();
      coldStart.currentTime = 0;
      idle.pause();
      idle.currentTime = 0;
    }

  }, [ignitionState]);

  const handleKnobClick = () => {
    setIgnitionState((prev) => (prev + 1) > 2 ? 0 : prev + 1);
  };

  const rotation = (ignitionState * 45) - 45;


  return (
    <main className="w-full h-full bg-[#E8E8E8] relative overflow-x-hidden z-0">
      <Navbar />
      <Loader />
      <Cursor />

      {/* 3D Overlay  */}
      <div className="3d-sec fixed top-0 left-0 w-full h-2/3 md:h-screen z-10">
        <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
          <Suspense fallback={null} >
            <SceneContent bodyColor={porscheColors[selectedColor].hex} ignitionStatus={ignitionState} />
          </Suspense>
          <EffectComposer>
            <Bloom
              luminanceThreshold={2.0} // only glow things brighter than 1.0
              mipmapBlur               // Makes the glow look soft and professional
              intensity={1.0}          // Strength of the glow
              radius={0.6}             // Spread of the glow
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 2. THE HTML CONTENT (Foreground Layer) */}
      <div className={`relative z-20 ${active ? 'hidden' : 'block'} `}>

        <section className='sec-0 h-screen relative'>
          {/* ignition switch  */}
          <div className={`engineSwitch absolute bottom-20 md:bottom-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-20 switch size-36 bg-[#282828] rounded-full`}>
            <img src="/switch_ring.png" alt="switch ring" className="engineSwitch w-full h-full" />
            <img
              onClick={handleKnobClick}
              src="/switch_knob.png"
              alt="Ignition Knob"
              className="engineSwitch size-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            {/* Ignition Switch  */}
            <div className="absolute md:-top-10 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 -left-18 text-center text-[#0F172A] font-bold text-sm">
              <p>IGNITION</p>
              <p>{ignitionState === 0 ? "OFF" : ignitionState === 1 ? "ACC" : "ON"}</p>
            </div>

          </div>
          {/* color configurator  */}
          <div className={`colorConfigurtor absolute flex md:bottom-10 bottom-56 left-1/2 -translate-1/2 gap-3`}>
            {porscheColors.map((color, index) => (
              <div
                onClick={() => setSelectedColor(index)}
                key={index}
                className={`colorBlock ${color.class} ${index == selectedColor && "border-2 scale-125"} border-gray-700 shadow shadow-gray-700 w-8 h-8 md:w-10 md:h-10 rounded-md cursor-pointer transition-transform duration-100`}
              ></div>
            ))}
          </div>
        </section>
        {/* SECTION 1: PERFORMANCE */}
        <section className="w-full sec-1 md:min-h-screen flex md:flex-row items-center md:px-20 p-5">
          <div className="lg:w-1/3 md:w-1/2 text-[#0F172A] ">

            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Performance</h3>
            <h2 className="md:text-6xl text-4xl font-black mb-6 leading-tight">SCREAMING</h2>
            <h2 className="md:text-6xl text-4xl font-black mb-6 leading-tight">AT 9,000 RPM</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              No turbos. No filtering. Just a <strong>4.0-liter naturally aspirated</strong> flat-six
              that howls to a deafening 9,000 RPM. With 518 hp and lightning-fast throttle response,
              this is not just an engine—it is a musical instrument of speed.
            </p>

            {/* Stats Grid - GT3 RS Stats */}
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-300 pt-8">
              <div>
                <h4 className="md:text-4xl text-2xl font-black">3.0s</h4>
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">0-60 mph</p>
              </div>
              <div>
                <h4 className="md:text-4xl text-2xl font-black">9k</h4>
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-1">Redline (RPM)</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: AERODYNAMICS */}
        <section className="w-full sec-2 md:min-h-screen flex md:flex-row items-center md:justify-end md:px-20 p-5">
          <div className="lg:w-1/3 md:w-1/2 text-[#0F172A] text-right ">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Aerodynamics</h3>
            <h2 className="md:text-6xl text-4xl  font-black mb-6 leading-tight">ACTIVE <br /> WEAPONRY</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              The first production Porsche with a <strong>Drag Reduction System (DRS)</strong>.
              With the push of a button, the massive swan-neck rear wing flattens to reduce drag,
              or snaps vertical to act as an airbrake. Total downforce: 1,895 lbs.
            </p>
          </div>
        </section>

        {/* SECTION 3: LIGHTWEIGHT */}

        <section className="w-full sec-3 md:min-h-screen flex md:flex-row items-center md:px-20 p-5">
          <div className="lg:w-1/3 md:w-1/2 text-[#0F172A] ">
            <h3 className="text-sm font-bold tracking-[0.3em] text-red-600 mb-2 uppercase">Lightweight</h3>
            <h2 className="md:text-6xl text-4xl  font-black mb-6 leading-tight">OBSESSIVE <br /> DIET</h2>
            <p className="text-lg leading-relaxed opacity-80 font-light">
              Carbon fiber doors, roof, hood, and wings. Magnesium wheels. Thinner glass.
              Every gram was fought for. The result is a chassis so stiff and reactive,
              it feels hardwired to your nervous system.
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-8 px-8 py-3 bg-[#0F172A] text-white font-bold tracking-widest text-xs uppercase hover:bg-red-600 transition-colors cursor-pointer"
            >
              Configure Track Beast
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}

export default App;