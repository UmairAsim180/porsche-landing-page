import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export function Porsche(props) {


  const { scene } = useGLTF('/porsche_gt3.glb', true);
  return <primitive object={scene}  {...props} />;
}