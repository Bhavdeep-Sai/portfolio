import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CertificatePage from './pages/CertificatePage'

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return children
}

const ParticleBackground = React.memo(() => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationIdRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isIntersecting, setIsIntersecting] = useState(true)

  const throttledScrollHandler = useCallback(() => {
    let ticking = false

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollSpeed = Math.abs(window.scrollY - (window.lastScrollY || 0))
          setIsVisible(scrollSpeed < 30) // Reduced threshold for better performance
          window.lastScrollY = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }
  }, [])

  // Intersection Observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      willReadFrequently: false 
    })
    if (!ctx) return

    // Optimize canvas rendering
    ctx.imageSmoothingEnabled = false // Disable for performance

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap DPR for performance
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = window.innerHeight * dpr // Use viewport height instead of full document

      canvas.style.width = rect.width + 'px'
      canvas.style.height = window.innerHeight + 'px'

      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    const resizeHandler = () => requestAnimationFrame(resizeCanvas)
    window.addEventListener('resize', resizeHandler, { passive: true })

    class Particle {
      constructor() {
        this.x = Math.random() * (canvas.width / (window.devicePixelRatio || 1))
        this.y = Math.random() * (canvas.height / (window.devicePixelRatio || 1))
        this.vx = (Math.random() - 0.5) * 0.2 // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.2
        this.size = Math.random() * 1.5 + 0.5 // Smaller particles
        this.opacity = Math.random() * 0.3 + 0.1 // Lower opacity
        this.color = '#00ffff'
        this.pulseSpeed = Math.random() * 0.01 + 0.005 // Slower pulse
        this.pulse = Math.random() * Math.PI * 2
        this.baseOpacity = this.opacity
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        const maxX = canvas.width / (window.devicePixelRatio || 1)
        const maxY = canvas.height / (window.devicePixelRatio || 1)

        if (this.x <= 0 || this.x >= maxX) this.vx *= -0.8
        if (this.y <= 0 || this.y >= maxY) this.vy *= -0.8

        this.x = Math.max(0, Math.min(maxX, this.x))
        this.y = Math.max(0, Math.min(maxY, this.y))

        this.pulse += this.pulseSpeed
        this.opacity = this.baseOpacity + Math.sin(this.pulse) * 0.05
      }

      draw() {
        if (!isVisible || !isIntersecting) return

        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const createParticles = () => {
      particlesRef.current = []
      const area = (canvas.width * canvas.height) / Math.pow(window.devicePixelRatio || 1, 2)
      const particleCount = Math.min(50, Math.max(20, Math.floor(area / 25000))) // Reduced count

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    let lastTime = 0
    const targetFPS = 30 // Reduced from 60 for better performance
    const frameDelay = 1000 / targetFPS

    const animate = (currentTime) => {
      if (currentTime - lastTime < frameDelay) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime

      if (!isIntersecting || !isVisible) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Simplified connection drawing with reduced distance
      const connectionDistance = 60 // Reduced from 80
      ctx.strokeStyle = 'rgba(200, 200, 255, 0.1)'
      ctx.lineWidth = 0.5

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle1 = particlesRef.current[i]
          const particle2 = particlesRef.current[j]
          
          const dx = particle1.x - particle2.x
          const dy = particle1.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.globalAlpha = 0.1 * (1 - distance / connectionDistance)
            ctx.beginPath()
            ctx.moveTo(particle1.x, particle1.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.stroke()
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    createParticles()
    animationIdRef.current = requestAnimationFrame(animate)

    const scrollHandler = throttledScrollHandler()
    window.addEventListener('scroll', scrollHandler, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeHandler)
      window.removeEventListener('scroll', scrollHandler)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isVisible, isIntersecting, throttledScrollHandler])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: isVisible && isIntersecting ? 0.7 : 0.2,
        transition: 'opacity 0.5s ease-out',
        willChange: 'opacity'
      }}
    />
  )
})

const PageSection = React.memo(({ children, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05, // Reduced threshold
    margin: "0px 0px -50px 0px" // Reduced margin
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }} // Reduced movement
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6, // Faster animation
        ease: [0.25, 0.25, 0.25, 0.75],
        type: "tween" // Using tween instead of spring for performance
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }} // Hardware acceleration
    >
      {children}
    </motion.div>
  )
})

const BackToTopButton = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId
    const toggleVisibility = () => {
      // Debounce the visibility check
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const shouldShow = window.scrollY > 300 && 
                          window.scrollY < 4125 && 
                          window.innerWidth > 853
        setIsVisible(shouldShow)
      }, 100)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      clearTimeout(timeoutId)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  if (!isVisible) return null

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }} // Reduced scale
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "tween",
        duration: 0.2 // Faster transition
      }}
      className="fixed w-12 cursor-pointer h-12 bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg z-20 hover:bg-blue-600 transition-colors"
      onClick={scrollToTop}
      style={{ willChange: 'transform' }}
    >
      ↑
    </motion.button>
  )
})

// Main App component that handles portfolio pages
const MainApp = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 })
  const [isLoaded, setIsLoaded] = useState(false)

  const LoadingScreen = React.memo(() => {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1c] overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      >
        <div className="relative z-10 text-center">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-white text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading...
          </motion.p>
        </div>
      </motion.div>
    )
  })

  useEffect(() => {
    const preloadCriticalResources = async () => {
      try {
        // Preload critical images only
        const criticalImages = [
          'assets/coding-pov.jpg',
        ]

        // Use more efficient image preloading
        const imagePromises = criticalImages.map(url => {
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = resolve // Don't fail on error
            img.src = url
            // Set loading priority
            img.loading = 'eager'
          })
        })

        await Promise.allSettled(imagePromises)
        setIsLoaded(true)
      } catch (error) {
        console.warn('Image preloading failed:', error)
        setIsLoaded(true)
      }
    }

    preloadCriticalResources()

    // Prefetch other resources in the background
    requestIdleCallback(() => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = '/models/low_poly_man_working_at_a_table_with_a_laptop.glb'
      document.head.appendChild(link)
    })
  }, [])

  return (
    <SmoothScrollProvider>
      <div className="relative overflow-hidden">
        <LoadingScreen />

        {/* Only render particle background on desktop and when loaded */}
        {!isMobile && isLoaded && <ParticleBackground />}

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }} // Faster transition
          style={{ willChange: 'opacity' }}
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

// Main App component with routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/certificate/:id" element={<CertificatePage />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  )
}

export default App