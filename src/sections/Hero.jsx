import React from 'react';
import HeroText from '../components/HeroText';
import { Coder } from "../components/Coder";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section id='home' className='min-h-screen'>
      <div className='flex flex-col lg:flex-row w-full min-h-screen justify-center items-center'>
        <div className='lg:w-1/2 text-center mb-8 lg:mb-0'>
          <HeroText />
        </div>

        <motion.div
          className='w-[80%] m-auto lg:w-1/2 h-full overflow-hidden relative flex items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay:2 }}
        >
          <figure className='w-full h-[70vh] lg:h-[100vh]'>
            <Canvas shadows camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.7} />
              <pointLight
                position={[-2, 2.5, -1]}
                distance={50}
                color="#ffecb3"
                decay={2}
                intensity={40}
              />
              <directionalLight
                position={[5, 10, 3]}
                intensity={2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <Coder
                scale={0.8}
                position={isMobile ? [2, -4, 0] : [0, -4, 0]}
              />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
              />
            </Canvas>
          </figure>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
