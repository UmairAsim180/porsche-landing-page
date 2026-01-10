import { useState, useEffect } from 'react';

export function useIsMobile() {
  // Initialize state based on current window width
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      // 768px is the standard iPad/Tablet breakpoint
      setIsMobile(window.innerWidth < 768);
    };

    // Check immediately
    checkMobile();

    // Listen for resize events (in case user rotates phone)
    window.addEventListener('resize', checkMobile);
    
    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}