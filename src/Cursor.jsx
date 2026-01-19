import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
      });
      
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-red-600 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      />
      
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}