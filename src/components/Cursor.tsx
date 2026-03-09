import { useEffect, useRef } from 'react';

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(animRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{
          width: '8px',
          height: '8px',
          background: 'var(--gold)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s, width 0.2s, height 0.2s, background 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid var(--gold)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease-out, width 0.3s, height 0.3s, opacity 0.3s',
          opacity: 0.5,
        }}
      />
    </>
  );
};
