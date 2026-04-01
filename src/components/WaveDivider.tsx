'use client';

interface WaveDividerProps {
  color?: string;
  height?: number;
  flip?: boolean;
  animated?: boolean;
  className?: string;
}

export const WaveDivider = ({
  color = 'oklch(0.45 0.18 253)',
  height = 80,
  flip = false,
  animated = true,
  className = '',
}: WaveDividerProps) => {
  const transform = flip ? 'scaleY(-1)' : 'scaleY(1)';
  const animationClass = animated ? 'wave' : '';

  return (
    <div
      className={`relative w-full overflow-hidden ${animationClass} ${className}`}
      style={{
        height: `${height}px`,
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          transform,
        }}
        className="w-full h-full"
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill={color}
          opacity="1"
        />
        <path
          d="M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.5"
        />
        <path
          d="M0,70 Q300,50 600,70 T1200,70 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.25"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
