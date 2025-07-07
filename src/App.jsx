import React from 'react'
import { motion } from 'framer-motion'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Contact from './sections/Contact'
import Work from './sections/Work'
import { Particles } from './components/Particles'
import Certificates from './sections/Certificates'
import Footer from './sections/Footer'

const App = () => {
  // Animation variants for smooth scroll effects
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  return (
    <div>
      <Particles
        className="absolute inset-0 -z-50"
        quantity={200}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      
      <Navbar />
      
      {/* Hero section - appears immediately with entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Hero />
      </motion.div>
      
      {/* Sections with scroll-triggered animations */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
        >
          <About />
        </motion.div>
        
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Work />
        </motion.div>
        
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Certificates />
        </motion.div>
        
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Contact />
        </motion.div>
        
        {/* Footer with animation */}
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App