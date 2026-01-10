import React, { useEffect, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

// 1. WRAP IN forwardRef
export const Porsche = forwardRef(({ bodyColor, ignitionStatus, ...props }, ref) => {
  
  // 2. GET NODES (Kept your efficient logic!)
  const { scene, materials, nodes } = useGLTF('/porsche_gt3.glb');

  // --- PAINT LOGIC ---
  useEffect(() => {
    // Safety check: make sure materials exist before setting
    if (materials['TwiXeR_992_carPaint.003']) {
      materials['TwiXeR_992_carPaint.003'].color.set(bodyColor);
      materials['TwiXeR_992_carPaint.008'].color.set(bodyColor);
      materials['TwiXeR_992_carPaint.003'].roughness = 0.6;
      materials['TwiXeR_992_carPaint.003'].clearcoat = 0.5;
      materials['TwiXeR_992_carPaint.003'].metalness = 0.8;
    }
  }, [materials, bodyColor]);

  // --- LIGHTS LOGIC ---
  useEffect(() => {
    // Safety check: Ensure nodes exist
    const headlight = nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'];
    const taillight = nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'];

    if (!headlight || !taillight) return;

    if (ignitionStatus > 0) {
      // ON
      headlight.material.color.set('#ffffff');
      headlight.material.emissive.set('#ffffff');
      headlight.material.emissiveIntensity = 20;
      headlight.material.toneMapped = false;

      taillight.material.color.set('#ff0000');
      taillight.material.emissive.set('#ff0000');
      taillight.material.emissiveIntensity = 10;
      taillight.material.toneMapped = false;
    } else {
      // OFF
      headlight.material.color.set('#333333');
      headlight.material.emissive.set('#000000');
      headlight.material.emissiveIntensity = 0;

      taillight.material.color.set('#550000');
      taillight.material.emissive.set('#000000');
      taillight.material.emissiveIntensity = 0;
    }
  }, [nodes, ignitionStatus]);

  // 3. THE RENDER FIX
  return (
    // A. Apply {...props} (Position/Rotation from GSAP) to the Group
    // B. Attach the 'ref' here so GSAP can grab this group
    <group ref={ref} {...props}>
      
      {/* C. Apply your manual offset (-100) to the inner primitive */}
      {/* This ensures your offset doesn't get overwritten by the parent */}
      <primitive 
        object={scene} 
        position={[0, -0.6, 0]} // Change this if you need to fix the model's pivot
      />
    </group>
  );
});