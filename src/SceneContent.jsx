import { OrbitControls, Text, Stage, Environment, ContactShadows } from '@react-three/drei';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Porsche } from './Porsche';
import { useThree } from '@react-three/fiber';
import { useIsMobile } from './hooks/useIsMobile';
// gsap plugin register 
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

function SceneContent({ bodyColor, ignitionStatus }) {
    // Ref for the Porsche component
    const { viewport } = useThree()
    const textRef = useRef();
    const carRef = useRef();
    let carScale = Math.min(1, viewport.width / 6)
    let textScale = Math.min(1.5, viewport.width / 5)
    const isMobile = useIsMobile()

    // GSAP Animations
    useGSAP(() => {
        // safety check 
        if (!textRef.current || !carRef.current) return;

        // 🛑 KILL SWITCH: Stop all previous animations on these objects
        // This prevents Desktop animations from fighting Mobile ones
        gsap.killTweensOf(carRef.current.position);
        gsap.killTweensOf(carRef.current.rotation);
        gsap.killTweensOf(textRef.current.position);
        gsap.killTweensOf(textRef.current.material);

        // 🧹 RESET: Force everything back to center 0,0,0
        // This cleans up any "mess" left behind by the other mode
        gsap.set(carRef.current.position, { x: 0, y: -0.2, z: 0 });
        gsap.set(carRef.current.rotation, { x: 0, y: Math.PI / 2, z: 0 });
        gsap.set(textRef.current.position, { x: 0, y: 1.2, z: -2 });
        gsap.set(textRef.current.material, { opacity: 1 });

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
        if (isMobile) {
            // for mobile 
            const sec1Tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sec-1',
                    start: 'top 60%',
                    end: '70% 80%',
                    // markers: true,
                    scrub: 2,
                }
            })
                .to(textRef.current.material, {
                    opacity: 0,
                })
                .to(carRef.current.position, {
                    y:0,
                    z: 1,
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
                    // markers: true,
                    scrub: 2,

                }
            })
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
                    scrub: 2,

                }
            })
                .to(carRef.current.position, {
                    z: 0,
                    ease: "power2.out"
                })
                .to(carRef.current.rotation, {
                    y: Math.PI * 2.5,
                    duration: 2,
                    ease: "power2.out"
                },'<')

        }
        else {
            // timelines for section 1
            const sec1Tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sec-1',
                    start: 'top 60%',
                    end: '70% 80%',
                    scrub: 2,
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
                    scrub: 2,

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
                    scrub: 2,

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
        }


    }, [isMobile]);

    return (
        <>
            <Text
                ref={textRef}
                position={[0, 1.2, -2]}
                fontSize={textScale}
                color="#0F172A"
                font='/font/911porschav3.ttf'
                anchorX="center"
                anchorY="middle"
                fillOpacity={1}
            >
                PORSCHE
            </Text>
            <Environment files="/potsdamer_platz_1k.hdr" />
            {!isMobile && <ContactShadows
                opacity={0.5}
                position={[0, -0.1, 0]}
                scale={30}        // <--- INCREASED: Prevents side clipping
                blur={2}
                far={5}           // <--- INCREASED: Sees the whole car height
                resolution={1024} // Optional: Keeps it sharp at larger scales
                color="#000000"
            />}
            <Porsche scale={carScale} ref={carRef} rotation={[0, Math.PI / 2, 0]} bodyColor={bodyColor} ignitionStatus={ignitionStatus} />
            {/* </Stage> */}

            <OrbitControls enableZoom={false} enableRotate={true} />
        </>
    );
}
export default SceneContent;