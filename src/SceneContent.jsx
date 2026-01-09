import { OrbitControls, Text, Stage, Environment } from '@react-three/drei';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Porsche } from './Porsche';
import { useFrame } from '@react-three/fiber';
// gsap plugin register 
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

function SceneContent({ bodyColor, ignitionStatus }) {
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
                start: 'top 60%',
                end: '70% 80%',
                scrub: 3,
            }
        })
            .to(textRef.current.material, {
                opacity: 0,
            })
            .to(carRef.current.position, {
                x: 1.2,
                z: -1,
                ease: "power2.out"
            }, "<")
            .to(carRef.current.rotation, {
                y: Math.PI,
                duration: 2,
                ease: "power2.out"
            }, "<")
        // timelines for section 2
        const sec2Tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.sec-2',
                start: 'top 60%',
                end: '70% 80%',
                scrub: 3,

            }
        })
            .to(carRef.current.position, {
                x: -1,
                duration: 1,
                ease: "power2.out"
            },)
            .to(carRef.current.rotation, {
                y: Math.PI * 1.9,
                duration: 2,
                ease: "power2.out"
            }, "<")
        const sec3Tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.sec-3',
                start: 'top 60%',
                end: '70% 80%',
                scrub: 3,

            }
        })
            .to(carRef.current.position, {
                x: 1.5,
                ease: "power2.out"
            },)
            .to(carRef.current.rotation, {
                y: Math.PI * 2.5,
                duration: 2,
                ease: "power2.out"
            }, "<")

    }, []);
    

    useFrame((state) => {
    if (!carRef.current) return;

    if (ignitionStatus === 2) {
      const time = state.clock.getElapsedTime();
      // Tiny random vibration + rhythmic engine pulse
      carRef.current.position.y = (Math.sin(time * 60) * 0.0003) + (Math.random() * 0.0001);
      carRef.current.rotation.z = (Math.random() * 0.0002);
    } else {
      // Reset position when off
      carRef.current.position.y = 0;
      carRef.current.rotation.z = 0;
    }
  });
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
                contactShadow={{ opacity: 0.01, blur: 2, scale: 10}}
                adjustCamera={false}
            >
                <Porsche ref={carRef} rotation={[0, Math.PI / 2, 0]} bodyColor={bodyColor} ignitionStatus={ignitionStatus} />
            </Stage>

            <OrbitControls enableZoom={false} enableRotate={false} />
        </>
    );
}
export default SceneContent;