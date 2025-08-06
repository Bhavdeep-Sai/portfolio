import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useInView, useAnimation, useSpring, useScroll } from "framer-motion";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/FrameWorks";

const About = () => {
  const grid2Container = useRef();
  const sectionRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Enhanced in-view detection with better threshold
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  });

  // Smooth spring animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [
        'assets/coding-pov.jpg',
        'assets/logos/blender.svg',
        'assets/logos/canva.svg',
        'assets/logos/figma.svg'
      ];

      const promises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
      });

      Promise.all(promises)
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(true));
    };

    preloadImages();
  }, []);

  // Enhanced animation variants with spring physics
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const gridItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
      rotateX: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -40,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const cardStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      rotate: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  // Enhanced hover animations
  const gridHoverVariants = {
    hover: {
      scale: 1.02,
      rotateX: 2,
      rotateY: 2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3
      }
    }
  };

  // Throttled scroll handler for performance
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Add any scroll-based animations here
          ticking = false;
        });
        ticking = true;
      }
    };
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      className="c-space mt-10 md:mt-0 relative min-h-screen" 
      id="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-heading"
        variants={titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.3 }}
      >
        About Me
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-7"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Grid 1 - Enhanced with better image loading */}
        <motion.div 
          className="flex items-end grid-default-color grid-1"
          variants={gridItemVariants}
          whileHover="hover"
          custom={gridHoverVariants}
        >
          <motion.img
            src="assets/coding-pov.jpg"
            className="absolute scale-[1] grayscale-60 right-[5rem] -top-[1rem] md:scale-[0.7] md:-left-22 md:inset-y-10 lg:scale-[1.5] md:grayscale-50 hover:grayscale-20 transition-all duration-500 ease-in-out"
            initial={{ scale: 1.5, opacity: 0, blur: 10 }}
            animate={isInView ? { scale: 1.75, opacity: 1, blur: 0 } : { scale: 1.5, opacity: 0, blur: 10 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              ease: [0.25, 0.25, 0.25, 0.75]
            }}
            loading="lazy"
          />
          <motion.div 
            className="z-10"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ 
              duration: 1,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <p className="headtext">Hi, I'm E. Bhavdeep Sai</p>
            <p className="subtext">
              Over the last 1 year, I developed my frontend and backend dev
              skills to deliver dynamic and software and web applications.
            </p>
          </motion.div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </motion.div>

        {/* Grid 2 - Enhanced card animations */}
        <motion.div 
          className="grid-default-color grid-2"
          variants={gridItemVariants}
          whileHover="hover"
          custom={gridHoverVariants}
        >
          <motion.div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
            variants={cardStaggerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p 
              className="flex items-end text-3xl lg:text-5xl text-gray-500"
              initial={{ opacity: 0, scale: 0.8, blur: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, blur: 0 } : { opacity: 0, scale: 0.8, blur: 10 }}
              transition={{ 
                duration: 1,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              CODE IS CRAFT
            </motion.p>
            
            {/* Cards with enhanced stagger animation */}
            {[
              { style: { rotate: "75deg", top: "30%", left: "20%" }, text: "Design Principles" },
              { style: { rotate: "-30deg", top: "60%", left: "45%" }, text: "Modular" },
              { style: { rotate: "90deg", bottom: "30%", left: "70%" }, text: "Design Patterns" },
              { style: { rotate: "-45deg", top: "55%", left: "0%" }, text: "Component Reuse" },
              { style: { rotate: "20deg", top: "10%", left: "38%" }, text: "Hooks" },
              { style: { top: "3%", left: "68%" }, text: "OOPs" },
              { style: { rotate: "30deg", top: "70%", left: "70%" }, image: "assets/logos/blender.svg" },
              { style: { rotate: "-45deg", top: "70%", left: "25%" }, image: "assets/logos/canva.svg" },
              { style: { rotate: "-45deg", top: "5%", left: "10%" }, image: "assets/logos/figma.svg" }
            ].map((card, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                custom={index}
              >
                <Card
                  style={card.style}
                  text={card.text}
                  image={card.image}
                  containerRef={grid2Container}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid 3 - Enhanced with globe animation */}
        <motion.div 
          className="grid-black-color grid-3"
          variants={gridItemVariants}
          whileHover="hover"
          custom={gridHoverVariants}
        >
          <motion.div 
            className="z-10 w-[90%] lg:w-[50%]"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <p className="headtext">Address</p>
            <p className="subtext">
              4-36, Chinna Kavuri Vari Palli,
              <br />
              Kavuri Vari Palli, Penumuru,
              <br />
              Chittoor, Andra Pradesh - 517126
            </p>
          </motion.div>
          <motion.div 
            className="absolute bottom-2 z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ 
              duration: 1,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <p className="headtext">Availability</p>
            <p className="text-neutral-300">
              Open to opportunities — Ready for opportunities across India.
            </p>
          </motion.div>
          <motion.figure 
            className="absolute  left-[40%] top-[10%]"
            initial={{ opacity: 0, scale: 0.6, rotate: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.6, rotate: -180 }}
            transition={{ 
              duration: 1.5,
              delay: 0.4,
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
          >
            <Globe />
          </motion.figure>
        </motion.div>

        {/* Grid 4 - Enhanced CTA section */}
        <motion.div 
          className="grid-special-color grid-4"
          variants={gridItemVariants}
          whileHover="hover"
          custom={gridHoverVariants}
        >
          <motion.div 
            className="flex flex-col items-center justify-center gap-4 size-full"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <motion.p 
              className="text-center headtext"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 150,
                damping: 20
              }}
            >
              Do you want to start a project together?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ 
                duration: 0.8,
                delay: 0.7,
                type: "spring",
                stiffness: 150,
                damping: 20
              }}
            >
              <CopyEmailButton />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Grid 5 - Enhanced tech stack section */}
        <motion.div 
          className="grid-default-color grid-5"
          variants={gridItemVariants}
          whileHover="hover"
          custom={gridHoverVariants}
        >
          <motion.div 
            className="z-10 w-[90%] lg:w-[50%]"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <p className="headtext mb-3 lg:mb-2">Tech Stack</p>
            <p className="subtext z-30">
              A curated set of technologies I use to design, build, and deploy modern, scalable, and performant web applications. From crafting responsive user interfaces to developing secure backend systems, I work across the full development lifecycle
            </p>
          </motion.div>
          <motion.div 
            className="absolute -z-10 inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125"
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.8 }}
            transition={{ 
              duration: 1.2,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <Frameworks />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;