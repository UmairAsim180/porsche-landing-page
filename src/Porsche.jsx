import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export function Porsche(props) {


  const { scene } = useGLTF('/porsche.glb');
  // const { , materials, scene } = useGLTF('/porsche.glb')
  
  // console.log(nodes)
  // scale 100
  return <primitive object={scene}   {...props} />;
}