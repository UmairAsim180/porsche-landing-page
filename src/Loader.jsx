import { useProgress } from '@react-three/drei'
import React from 'react'

const Loader = () => {
    const { progress, active } = useProgress()
    if(!active) return null;
    return (
    <section className='h-screen w-screen absolute z-50 top-0 left-0'>
        <img src="/wheel.png"  alt="Porsche Wheel" className='w-50 h-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin'/>
        <img src="porsche_logo.png" alt="Porsche Logo" className='w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
    </section>
    )
}

export default Loader