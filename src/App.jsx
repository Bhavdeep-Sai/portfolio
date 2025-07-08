import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return children
}

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationIdRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const throttledScrollHandler = useCallback(() => {
    let ticking = false

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollSpeed = Math.abs(window.scrollY - (window.lastScrollY || 0))
          setIsVisible(scrollSpeed < 50)
          window.lastScrollY = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = document.body.scrollHeight * dpr

      canvas.style.width = rect.width + 'px'
      canvas.style.height = document.body.scrollHeight + 'px'

      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.4 + 0.1
        this.color = '#00ffff'
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulse = 2
        this.baseOpacity = this.opacity
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x <= 0 || this.x >= canvas.width) {
          this.vx *= -0.8
        }
        if (this.y <= 0 || this.y >= canvas.height) {
          this.vy *= -0.8
        }

        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))

        this.pulse += this.pulseSpeed
        this.opacity = this.baseOpacity + Math.sin(this.pulse) * 0.1
      }

      draw() {
        if (!isVisible) return

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }
    }

    const createParticles = () => {
      particlesRef.current = []
      const particleCount = Math.max(100, Math.floor(canvas.width * canvas.height / 15000))

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    let lastTime = 0
    const targetFPS = 60
    const frameDelay = 1000 / targetFPS

    const animate = (currentTime) => {
      if (currentTime - lastTime < frameDelay) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isVisible) {
        particlesRef.current.forEach(particle => {
          particle.update()
          particle.draw()
        })

        const connectionDistance = 80
        particlesRef.current.forEach((particle, i) => {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const dx = particle.x - particlesRef.current[j].x
            const dy = particle.y - particlesRef.current[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
              ctx.save()
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
              const alpha = 0.15 * (1 - distance / connectionDistance)
              ctx.strokeStyle = `rgba(200, 200, 255, ${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
              ctx.restore()
            }
          }
        })
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    createParticles()
    animate(0)

    const scrollHandler = throttledScrollHandler()
    window.addEventListener('scroll', scrollHandler, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', scrollHandler)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isVisible, throttledScrollHandler])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: isVisible ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  )
}

const PageSection = ({ children, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white text-2xl font-bold"
      >
        Loading...
      </motion.div>
    </motion.div>
  )
}

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300 && window.scrollY < 4125 && window.innerWidth > 853) {
        setIsVisible(true);
      }else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3
      }}
      className="fixed w-12 cursor-pointer h-12 bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg z-20 hover:bg-blue-600 transition-colors"
      onClick={scrollToTop}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      ↑
    </motion.button>
  )
}

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [
        'assets/coding-pov.jpg',
      ]

      const promises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = url
        })
      })

      Promise.all(promises)
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(true))
    }

    preloadImages()
  }, [])

  return (
    <SmoothScrollProvider>
      <div className="relative overflow-hidden">
        <LoadingScreen />

        {!isMobile && <ParticleBackground />}

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <Hero />
          <PageSection>
            <About />
          </PageSection>

          <PageSection>
            <Work />
          </PageSection>

          <PageSection>
            <Certificates />
          </PageSection>

          <PageSection>
            <Contact />
          </PageSection>

          <PageSection>
            <Footer />
          </PageSection>
        </motion.div>
        <BackToTopButton />
      </div>
    </SmoothScrollProvider>
  )
}

export default App