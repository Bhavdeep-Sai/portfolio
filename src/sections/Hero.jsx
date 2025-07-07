/* eslint-disable no-unused-vars */

import { Float, OrbitControls } from "@react-three/drei"
import { motion } from 'motion/react'
import { Coder } from "../components/Coder"
import HeroText from "../components/HeroText"
import ParallaxBackground from "../components/ParallaxBackground"
import { Canvas, useFrame } from "@react-three/fiber"
import { useMediaQuery } from 'react-responsive'
import { easing } from "maath"
import { Suspense } from "react"
import Loader from "../components/Loader"
import { Particles } from "../components/Particles"


const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 })
    return (
        <section id="home" className="flex relative items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden ">
            <HeroText />
            <Particles
                className="absolute inset-0 -z-50"
                quantity={100}
                ease={80}
                color={"#00ffff"}
                refresh
            />
            <motion.figure className="absolute insert-0 top-30 lg:top-20 "
                style={{
                    width: "100vw", height: "100vh"
                }}
            >
                <Canvas shadows camera={{ position: [0, 1, 5] }}>
                    {/* Add lights */}
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[5, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                    />
                    <pointLight position={[0, 6, 0]} intensity={50} />
                    <Suspense fallback={<Loader />}>
                        <Coder
                            scale={isMobile && 0.33}
                            position={isMobile && [0.5, -2, 0]}
                        />
                    </Suspense>
                    <Rig />
                </Canvas>
            </motion.figure>
            <div
                className="absolute bottom-8.25 right-0 w-[120%] h-80 -z-10 overflow-hidden"
                style={{
                    background: '#0b1121',
                    clipPath: 'polygon(100% 100%, 0% 100%, 100% 0)',
                    transform: 'rotate(-2deg) translateY(20px)',
                }}
            />
        </section>
    )
}

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [state.mouse.x / 10, 1 + state.mouse.y / 10, 5],
            0.5,
            delta
        )
    })
}

export default Hero
