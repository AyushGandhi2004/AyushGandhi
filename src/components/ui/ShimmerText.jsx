import React from 'react';

export const ShimmerText = React.memo(function ShimmerText({ children, className = '' }) {
  return (
    <span className={`shimmer-text ${className}`} style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
      {children}
      <style>{`
        .shimmer-text::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 80%
          );
          animation: shimmer-sweep 3s infinite;
          pointer-events: none;
        }
        @keyframes shimmer-sweep {
          0% { left: -100%; }
          27% { left: 150%; }
          100% { left: 150%; }
        }
      `}</style>
    </span>
  );
});
