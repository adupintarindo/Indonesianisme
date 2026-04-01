'use client';

import { useRef, useEffect, useState } from 'react';

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const CounterAnimation = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(progress * target);
      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, target, duration]);

  return (
    <div
      ref={ref}
      className={`font-jetbrains-mono text-4xl font-bold text-gold ${className}`}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default CounterAnimation;
