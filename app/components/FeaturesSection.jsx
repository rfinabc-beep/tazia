"use client";

import { useEffect, useRef, useState } from 'react';

const features = [
  [
    { icon: '🛡️', title: 'Verified Suppliers', desc: 'Manually verified for quality and reliability.', iconBg: 'rgba(94,207,255,0.12)', iconColor: '#5ecfff' },
    { icon: '🔒', title: 'Secure Payment', desc: 'COD, bKash, bank — all 100% secure.', iconBg: 'rgba(167,139,250,0.12)', iconColor: '#a78bfa' },
  ],
  [
    { icon: '🚀', title: 'Fast Delivery', desc: 'Orders delivered within 48 hours anywhere.', iconBg: 'rgba(124,221,110,0.12)', iconColor: '#7cdd6e' },
    { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free return, no hidden conditions.', iconBg: 'rgba(251,146,60,0.12)', iconColor: '#fb923c' },
  ],
  [
    { icon: '🏷️', title: 'Bulk Pricing', desc: 'Exclusive wholesale rates — save more on bulk.', iconBg: 'rgba(232,160,32,0.12)', iconColor: '#e8a020' },
    { icon: '🎧', title: '24/7 Support', desc: 'Our team is always ready to help you grow.', iconBg: 'rgba(232,160,32,0.12)', iconColor: '#e8a020' },
  ],
];

function SwapCard({ pair, delay }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setIdx(prev => (prev + 1) % 2);
          setVisible(true);
        }, 500);
      }, 3200);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  const feat = pair[idx];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(232,160,32,0.12)',
      borderRadius: '12px',
      padding: '16px',
      height: '80px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'border-color .3s, background .3s',
    }}>
      {/* Feature content */}
      <div style={{
        position: 'absolute',
        inset: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <div style={{
          width: '24px', height: '24px', borderRadius: '6px',
          background: feat.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: '13px',
        }}>
          <span style={{ color: feat.iconColor, fontSize: '12px' }}>{feat.icon}</span>
        </div>
        <div>
          <p style={{ fontSize: '12px', fontWeight: '800', color: '#fff', margin: '0 0 2px' }}>
            {feat.title}
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', lineHeight: '1.5', margin: 0 }}>
            {feat.desc}
          </p>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', gap: '4px', position: 'absolute', bottom: '10px', right: '12px' }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            width: '4px', height: '4px', borderRadius: '50%',
            background: idx === i ? '#e8a020' : 'rgba(232,160,32,0.25)',
            transition: 'background 0.4s',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes floatOrb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,15px)} }
      @keyframes floatOrb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-10px)} }
    `;
    document.head.appendChild(style);
    return () => { try { document.head.removeChild(style); } catch (_) {} };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
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

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #000 0%, #050f1a 40%, #091828 100%)',
        padding: 'clamp(36px,5vw,56px) clamp(20px,5vw,40px)',
      }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', width: '320px', height: '320px',
        background: 'radial-gradient(circle, rgba(232,160,32,0.1) 0%, transparent 70%)',
        top: '-120px', left: '-80px', borderRadius: '50%',
        animation: 'floatOrb1 9s ease-in-out infinite', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '220px', height: '220px',
        background: 'radial-gradient(circle, rgba(40,100,200,0.07) 0%, transparent 70%)',
        bottom: '-60px', right: '-40px', borderRadius: '50%',
        animation: 'floatOrb2 12s ease-in-out infinite', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.22)',
          borderRadius: '100px', padding: '4px 12px 4px 7px', marginBottom: '12px',
          fontSize: '11px', color: '#e8a020', fontWeight: '700',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <span style={{
            width: '14px', height: '14px', background: '#e8a020', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '8px', color: '#000',
          }}>✦</span>
          Why Choose Us
        </div>

        <h2 style={{
          fontSize: 'clamp(17px,3.5vw,24px)', fontWeight: '900',
          color: '#fff', margin: '0 0 5px', letterSpacing: '-0.01em',
        }}>
          Everything your business needs
        </h2>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '0 0 24px' }}>
          Trusted by thousands of wholesalers across the country
        </p>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(232,160,32,0.2), transparent)',
          marginBottom: '20px',
        }} />

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
        }}>
          {features.map((pair, i) => (
            <SwapCard key={i} pair={pair} delay={i * 1000} />
          ))}
        </div>

      </div>
    </div>
  );
}
