import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export function Porsche({ bodyColor, ignitionStatus, ...props }) {



  const { scene, materials, nodes } = useGLTF('/porsche_gt3.glb', true);
  // car paint change 
  useEffect(() => {
    materials['TwiXeR_992_carPaint.003'].color.set(bodyColor)
    materials['TwiXeR_992_carPaint.008'].color.set(bodyColor)
    materials['TwiXeR_992_carPaint.003'].roughness = 0.6;
    materials['TwiXeR_992_carPaint.003'].clearcoat = 0.5;
    materials['TwiXeR_992_carPaint.003'].metalness = 0.8;
  }, [materials, bodyColor])
  // car lights on 
  useEffect(() => {
    // console.log(nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'])
    if (ignitionStatus > 0) {
      // turn on lights 
      nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'].material.color.set('#ffffff');
      nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'].material.emissive.set('#ffffff');
      nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'].material.emissiveIntensity = 20; // Super Bright
      nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'].material.toneMapped = false;
      nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'].material.color.set('#ff0000');
      nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'].material.emissive.set('#ff0000');
      nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'].material.emissiveIntensity = 10;
      nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'].material.toneMapped = false;
    }
    else {
      // turn off lights 
      nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'].material.color.set('#333333');   // Off (Dark Grey)
      nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'].material.emissive.set('#000000');
      nodes['TwiXeR_992_headlight_L_led_TwiXeR_992_led_lights001_0'].material.emissiveIntensity = 0;

      nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'].material.color.set('#550000');   // Off (Dark Red)
      nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'].material.emissive.set('#000000');
      nodes['TwiXeR_992_fascia_mid_TwiXeR_992_taillight_running001_0'].material.emissiveIntensity = 0;
    }
  }, [nodes, ignitionStatus])


  return <primitive object={scene}  {...props} />;
}