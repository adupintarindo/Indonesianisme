'use client';

import { useEffect, useRef } from 'react';

interface GradientBackgroundProps {
  className?: string;
  showParticles?: boolean;
}

export const GradientBackground = ({
  className = '',
  showParticles = true,
}: GradientBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!showParticles || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(218, 160, 50, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    // Create particles
    const particles = Array.from({ length: 50 }, () => new Particle());

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showParticles]);

  return (
    <>
      <style>{`
        @keyframes gradient-mesh {
          0% {
            background-position: 0% 0%, 100% 100%, 50% 50%;
          }
          50% {
            background-position: 100% 100%, 0% 0%, 50% 50%;
          }
          100% {
            background-position: 0% 0%, 100% 100%, 50% 50%;
          }
        }

        .gradient-bg {
          background:
            radial-gradient(
              circle at 0% 0%,
              oklch(0.45 0.18 253) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 100% 100%,
              oklch(0.23 0.15 264) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 50% 50%,
              oklch(0.55 0.16 200) 0%,
              transparent 60%
            );
          background-size: 200% 200%, 200% 200%, 150% 150%;
          animation: gradient-mesh 15s ease infinite;
        }
      `}</style>

      <div
        className={`gradient-bg absolute inset-0 overflow-hidden ${className}`}
      >
        {showParticles && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 mix-blend-screen"
          />
        )}
      </div>
    </>
  );
};

export default GradientBackground;
