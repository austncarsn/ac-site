import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  EASE_OUT_EXPO, 
  EASE_OUT_QUART, 
  DURATION,
  MOBILE_DURATION,
  STAGGER,
} from '../../lib/constants';
import { ColorBlockGrid } from '../ui/ColorBlockGrid';

// Extract animation variants to prevent recreation on each render
const createAnimationVariants = (isMobile: boolean, prefersReducedMotion: boolean, duration: any) => {
  const yOffset = isMobile ? 16 : 24;
  const blurAmount = isMobile ? '6px' : '10px';
  const animationDuration = prefersReducedMotion ? duration.fast : duration.slowest;

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : (isMobile ? STAGGER.normal : STAGGER.slow),
          delayChildren: prefersReducedMotion ? 0 : (isMobile ? 0.1 : 0.2),
        },
      },
    },
    content: {
      hidden: { 
        opacity: 0, 
        y: prefersReducedMotion ? 0 : yOffset,
        filter: prefersReducedMotion ? 'none' : `blur(${blurAmount})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: animationDuration,
          ease: EASE_OUT_EXPO,
        },
      },
    },
    subheading: {
      hidden: { 
        opacity: 0,
        y: prefersReducedMotion ? 0 : (isMobile ? 12 : 18),
        filter: prefersReducedMotion ? 'none' : `blur(${isMobile ? '4px' : '8px'})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: prefersReducedMotion ? duration.fast : (isMobile ? duration.slower : 1.6),
          ease: EASE_OUT_EXPO,
        },
      },
    },
    supporting: {
      hidden: { 
        opacity: 0,
        y: prefersReducedMotion ? 0 : (isMobile ? 10 : 14),
        filter: prefersReducedMotion ? 'none' : `blur(${isMobile ? '3px' : '6px'})`,
      },
      visible: {
        opacity: 0.6,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: prefersReducedMotion ? duration.fast : (isMobile ? duration.slower : 1.4),
          ease: EASE_OUT_EXPO,
        },
      },
    },
    button: {
      hidden: { 
        opacity: 0,
        y: prefersReducedMotion ? 0 : (isMobile ? 10 : 14),
        filter: prefersReducedMotion ? 'none' : `blur(${isMobile ? '3px' : '6px'})`,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: animationDuration,
          ease: EASE_OUT_QUART,
        },
      },
    },
  };
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const title = 'AUSTIN CARSON';
  const heroRef = useRef<HTMLDivElement>(null);

  // State management
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < 1024
  );

  // Advanced mouse tracking for parallax and magnetic effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for parallax
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });
  
  // Transform mouse position to parallax offsets - ALL AT TOP LEVEL
  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const parallaxRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2]);
  const parallaxRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]);
  
  // Additional transforms for grid parallax
  const gridParallaxX = useTransform(parallaxX, (x) => x * -0.3);
  const gridParallaxY = useTransform(parallaxY, (y) => y * -0.3);
  const gridRotateX = useTransform(parallaxRotateY, (y) => y * 0.5);
  const gridRotateY = useTransform(parallaxRotateX, (x) => x * 0.5);
  
  // Particle parallax transforms
  const particle1X = parallaxX;
  const particle1Y = parallaxY;
  const particle2X = useTransform(parallaxX, (x) => -x * 0.5);
  const particle2Y = useTransform(parallaxY, (y) => -y * 0.5);

  // Handle mouse movement for parallax
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize to -0.5 to 0.5
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion, isMobile]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize animation variants to prevent recreation
  const duration = isMobile ? MOBILE_DURATION : DURATION;
  const animationVariants = useMemo(
    () => createAnimationVariants(isMobile, prefersReducedMotion, duration),
    [isMobile, prefersReducedMotion, duration]
  );

  // Handle scroll to work section
  const scrollToWork = useCallback(() => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden" 
      style={{ 
        paddingTop: 'var(--header-height)',
        paddingBottom: isMobile ? 'var(--space-16)' : 'var(--space-20)',
        backgroundColor: '#FAFAF9',
      }}
      aria-label="Hero section"
    >
      {/* Holographic ambient overlay - year 2050 aesthetic */}
      {!isMobile && !prefersReducedMotion && (
        <>
          {/* Gradient mesh background layer */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(182, 207, 255, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(182, 207, 255, 0.04) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%)
              `,
              opacity: 0.8,
            }}
          />
          
          {/* Floating light particles */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: '20%',
              left: '15%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(182, 207, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
              x: particle1X,
              y: particle1Y,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute pointer-events-none"
            style={{
              bottom: '15%',
              right: '20%',
              width: '350px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(182, 207, 255, 0.12) 0%, transparent 70%)',
              filter: 'blur(70px)',
              x: particle2X,
              y: particle2Y,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Subtle scan lines for futuristic feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(182, 207, 255, 0.02) 2px, rgba(182, 207, 255, 0.02) 4px)',
              opacity: 0.3,
            }}
          />
        </>
      )}

      <div className="container-main flex items-center relative z-10" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        <motion.div
          variants={animationVariants.container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 w-full"
          style={{ 
            gap: 'clamp(var(--space-12), 5vw, var(--space-16))',
            paddingTop: isMobile ? '0' : 'clamp(var(--space-12), 5vw, var(--space-20))',
            paddingBottom: isMobile ? '0' : 'clamp(var(--space-12), 5vw, var(--space-20))',
          }}
        >
          {/* Hero Content with 3D perspective */}
          <motion.div 
            className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left" 
            style={{
              paddingLeft: isMobile ? 'var(--space-6)' : '0',
              paddingRight: isMobile ? 'var(--space-6)' : '0',
              transformStyle: 'preserve-3d',
              rotateX: !isMobile && !prefersReducedMotion ? parallaxRotateX : 0,
              rotateY: !isMobile && !prefersReducedMotion ? parallaxRotateY : 0,
            }}
          >
            {/* Holographic frame around name */}
            {!isMobile && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: '-20px',
                  left: '-20px',
                  right: '-20px',
                  bottom: '-20px',
                  border: '1px solid rgba(182, 207, 255, 0.1)',
                  borderRadius: '12px',
                  boxShadow: 'inset 0 0 60px rgba(182, 207, 255, 0.03)',
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            <motion.h1 
              variants={animationVariants.content}
              className="break-words relative"
              style={{ 
                marginBottom: isMobile ? '32px' : '24px',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
                letterSpacing: isMobile ? '0.20em' : '0.18em',
                color: '#1A1A19',
                fontWeight: 200,
                textTransform: 'uppercase',
                textShadow: '0 0 40px rgba(182, 207, 255, 0.08)',
              }}
            >
              {title}
            </motion.h1>
            
            {/* Value statement with ambient glow */}
            <motion.p
              variants={animationVariants.subheading}
              className="max-w-[620px] relative"
              style={{ 
                marginBottom: isMobile ? '48px' : '32px',
                fontSize: isMobile ? '18px' : '22px',
                lineHeight: isMobile ? '28px' : '34px',
                fontWeight: 400,
                letterSpacing: '-0.005em',
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
                color: '#2D2D2C',
                maxWidth: isMobile ? '320px' : '620px',
              }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #2D2D2C 0%, #2D2D2C 70%, rgba(182, 207, 255, 0.5) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}>
                Building production-ready design systems with technical precision and editorial clarity.
              </span>
            </motion.p>

            {/* Circle grid - visual anchor */}
            <div className="lg:hidden w-full flex justify-center" style={{ marginBottom: isMobile ? '48px' : '32px' }}>
              <ColorBlockGrid isMobile={isMobile} />
            </div>

            {/* Enhanced CTA with magnetic effect - desktop only */}
            {!isMobile && (
              <motion.button
                variants={animationVariants.button}
                onClick={scrollToWork}
                whileHover={{ 
                  opacity: 0.5,
                  scale: 1.02,
                  textShadow: '0 0 20px rgba(182, 207, 255, 0.3)',
                }}
                whileTap={{ scale: 0.98, opacity: 0.5 }}
                transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
                className="self-center lg:self-start cursor-pointer touch-manipulation transition-opacity duration-200 relative"
                style={{ 
                  fontSize: '15px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  WebkitTapHighlightColor: 'transparent',
                  willChange: 'opacity, transform',
                  color: '#6B7280',
                  opacity: 0.6,
                  borderBottom: '1px solid currentColor',
                  paddingBottom: '2px',
                }}
                aria-label="Scroll to view selected work section"
              >
                <span style={{ position: 'relative', zIndex: 2 }}>View work</span>
                
                {/* Holographic underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(182, 207, 255, 0.5), transparent)',
                    scaleX: 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            )}
          </motion.div>

          {/* Enhanced Color Block Grid with 3D depth - Desktop only */}
          <motion.div 
            className="hidden lg:flex lg:items-center lg:justify-center"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            <motion.div
              style={{
                x: !prefersReducedMotion ? gridParallaxX : 0,
                y: !prefersReducedMotion ? gridParallaxY : 0,
                rotateX: !prefersReducedMotion ? gridRotateX : 0,
                rotateY: !prefersReducedMotion ? gridRotateY : 0,
                transformStyle: 'preserve-3d',
              }}
            >
              <ColorBlockGrid isMobile={isMobile} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient breathing gradient at bottom */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(182, 207, 255, 0.06), transparent)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </section>
  );
}