"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const router = useRouter();
  const [showRule, setShowRule] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [swapVisible, setSwapVisible] = useState(true);
  const [swapIdx, setSwapIdx] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const animRef = useRef(null);

  const swapWords = [
    { text: 'Source.',  color: '#e8a020' },
    { text: 'Order.',   color: '#5ecfff' },
    { text: 'Deliver.', color: '#7cdd6e' },
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes floatOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,15px)} }
      @keyframes floatOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-10px)} }
      @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      .hero-btn:active { transform: scale(0.97) !important; }
    `;
    document.head.appendChild(style);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const timers = [];
    const delay = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); };

    delay(() => setShowRule(true), 400);
    delay(() => setShowSub(true), 600);
    delay(() => setShowBtn(true), 800);

    // Word swap loop
    const swapInterval = setInterval(() => {
      setSwapVisible(false);
      const t = setTimeout(() => {
        setSwapIdx(prev => (prev + 1) % swapWords.length);
        setSwapVisible(true);
      }, 520);
      timers.push(t);
    }, 2800);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      timers.forEach(clearTimeout);
      clearInterval(swapInterval);
      try { document.head.removeChild(style); } catch (_) {}
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232,160,32,0.5)';
        ctx.fill();
      });
      for (let a = 0; a < pts.length; a++) {
        for (let b = a + 1; b < pts.length; b++) {
          const dx = pts[a].x - pts[b].x;
          const dy = pts[a].y - pts[b].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[a].x, pts[a].y);
            ctx.lineTo(pts[b].x, pts[b].y);
            ctx.strokeStyle = `rgba(232,160,32,${0.12 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const heroOpacity = scrollY > 250 ? Math.max(0.5, 1 - (scrollY - 250) / 350) : 1;
  const heroPush = Math.min(scrollY * 0.1, 40);
  const currentWord = swapWords[swapIdx];

  return (
    <div
      ref={heroRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #000 0%, #050f1a 40%, #091828 100%)',
        color: '#fff',
        minHeight: '420px',
        padding: 'clamp(48px,9vw,80px) clamp(20px,5vw,40px) 56px',
        opacity: heroOpacity,
        transform: `translateY(${heroPush}px)`,
        transition: 'opacity 0.08s linear, transform 0.08s linear',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }}
      />

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', width: '380px', height: '380px',
        background: 'radial-gradient(circle, rgba(232,160,32,0.12) 0%, transparent 70%)',
        top: '-140px', right: '-100px', borderRadius: '50%',
        animation: 'floatOrb1 9s ease-in-out infinite', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '240px', height: '240px',
        background: 'radial-gradient(circle, rgba(40,100,200,0.07) 0%, transparent 70%)',
        bottom: '-60px', left: '-50px', borderRadius: '50%',
        animation: 'floatOrb2 12s ease-in-out infinite', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>

        {/* Top badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.22)',
          borderRadius: '100px', padding: '5px 13px 5px 7px', marginBottom: '22px',
          fontSize: '11px', color: '#e8a020', fontWeight: '700',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <span style={{
            width: '16px', height: '16px', background: '#e8a020', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '9px', color: '#000',
          }}>✦</span>
          B2B Wholesale Platform
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: '900',
          lineHeight: '1.55', margin: '0 0 18px', letterSpacing: '-0.01em',
        }}>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.92)', marginBottom: '4px' }}>
            Your Trusted B2B
          </span>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.92)', marginBottom: '8px' }}>
            Wholesale Partner
          </span>
          {/* Swap word */}
          <span style={{
            display: 'inline-block',
            color: currentWord.color,
            opacity: swapVisible ? 1 : 0,
            transform: swapVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            minWidth: '160px',
          }}>
            {currentWord.text}
          </span>
        </h1>

        {/* Animated rule */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, #e8a020, rgba(232,160,32,0))',
          width: showRule ? '100px' : '0px',
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
          borderRadius: '2px', marginBottom: '14px',
        }} />

        {/* Subtext */}
        <p style={{
          fontSize: 'clamp(13px, 2.5vw, 15px)', color: 'rgba(255,255,255,0.5)',
          margin: '0 0 28px', lineHeight: '1.7',
          opacity: showSub ? 1 : 0,
          transform: showSub ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          Connect directly with verified wholesalers —<br />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            Faster, cheaper, and completely reliable.
          </span>
        </p>

        {/* CTA button */}
        <button
          className="hero-btn"
          onClick={() => router.push('/register')}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '10px',
            width: 'clamp(220px, 60%, 280px)', padding: '15px 22px',
            background: btnHover
              ? 'linear-gradient(135deg, #f4c050 0%, #e8a020 100%)'
              : 'linear-gradient(135deg, #e8a020 0%, #d4891a 100%)',
            color: '#0a1a2e', borderRadius: '13px', fontWeight: '800',
            fontSize: 'clamp(14px, 3vw, 16px)', border: 'none', cursor: 'pointer',
            opacity: showBtn ? 1 : 0,
            transform: showBtn ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease, background 0.25s ease, box-shadow 0.25s ease',
            boxShadow: btnHover
              ? '0 8px 28px rgba(232,160,32,0.35)'
              : '0 4px 16px rgba(232,160,32,0.2)',
            letterSpacing: '0.01em',
            pointerEvents: showBtn ? 'auto' : 'none',
          }}
        >
          {btnHover && (
            <span style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
              backgroundSize: '200% auto', animation: 'shimmer 0.6s linear',
              borderRadius: '13px', pointerEvents: 'none',
            }} />
          )}
          <span>Register Your Store</span>
          <span style={{
            width: '24px', height: '24px', background: 'rgba(10,26,46,0.15)',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '13px',
            transform: btnHover ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform 0.25s ease', flexShrink: 0,
          }}>→</span>
        </button>

      </div>
    </div>
  );
}
