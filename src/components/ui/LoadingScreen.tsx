import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GOLD = '#EFBF04';
const DARK = '#101828';

const SHARDS = [
  { clip: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',           tx: -60, ty: -60 },
  { clip: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',      tx:  60, ty: -60 },
  { clip: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',       tx: -60, ty:  60 },
  { clip: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)', tx:  60, ty:  60 },
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'progress' | 'shatter' | 'gone'>('logo');
  const called = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('progress'), 300);
    const t2 = setTimeout(() => setPhase('shatter'), 1700);
    const t3 = setTimeout(() => {
      setPhase('gone');
      if (!called.current) { called.current = true; onDone(); }
    }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  if (phase === 'gone') return null;

  const isShatter = phase === 'shatter';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        pointerEvents: isShatter ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* ── SOLID PHASE (logo + progress bar) ── */}
      <AnimatePresence>
        {!isShatter && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{ position: 'absolute', inset: 0, background: DARK }}
          >

            {/* Logo + bar centred */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 36,
            }}>
              <motion.img
                src="/bmp-logo.png"
                alt="BMP"
                initial={{ opacity: 0, scale: 0.86, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: 'clamp(260px, 32vw, 480px)',
                  height: 'auto',
                  display: 'block',
                }}
              />

              {/* Gold progress track */}
              <div style={{
                width: 'clamp(200px, 26vw, 320px)',
                height: 2,
                background: 'rgba(239,191,4,0.15)',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: phase === 'progress' ? 1 : 0 }}
                  transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.55))`,
                    boxShadow: '0 0 10px rgba(239,191,4,0.7)',
                    transformOrigin: 'left',
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LIQUID GLASS SHATTER ── */}
      <AnimatePresence>
        {isShatter && SHARDS.map((s, i) => (
          <motion.div
            key={`shard-${i}`}
            initial={{ x: 0, y: 0, opacity: 1, filter: 'blur(0px) brightness(1)' }}
            animate={{
              x: `${s.tx}%`,
              y: `${s.ty}%`,
              opacity: 0,
              filter: 'blur(22px) brightness(2.2)',
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.4, 0, 1, 1],
              delay: i * 0.055,
            }}
            style={{
              position: 'absolute', inset: 0,
              background: DARK,
              clipPath: s.clip,
            }}
          >
            {/* Ghost logo inside each shard */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src="/bmp-logo.png"
                alt=""
                aria-hidden
                style={{ width: 'clamp(260px, 32vw, 480px)', height: 'auto', opacity: 0.9 }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Central gold burst on shatter */}
      <AnimatePresence>
        {isShatter && (
          <motion.div
            key="burst"
            initial={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 160, height: 160, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(239,191,4,0.55) 0%, transparent 68%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
