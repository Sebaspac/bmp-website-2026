import React, { useEffect, useRef } from 'react';

/**
 * MunichSkylineBg
 * Drop inside any light section (position: relative required on parent).
 * Uses backgroundPositionY for parallax — no transform, no GPU compositing layer.
 * No mixBlendMode to avoid Safari compositing bleed into sibling elements.
 */
const MunichSkylineBg: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = progress * 30;
      el.style.backgroundPositionY = `calc(100% - ${offset}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '52%',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: 'url(/munich-skyline.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'cover',
        opacity: 0.08,
      }}
    />
  );
};

export default MunichSkylineBg;
