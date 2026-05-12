export default function Footer() {
  return (
    <footer style={{ background: '#000', padding: '24px clamp(20px,5vw,40px)', color: '#fff' }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>

        {/* Company */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: '.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            Company
          </p>
          {['About Us', 'Privacy Policy', 'Terms & Conditions'].map(link => (
            <a key={link} href="#" style={{ display: 'inline-block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginRight: '16px', marginBottom: '6px' }}>
              {link}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: '.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            Contact
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', color: '#e8a020' }}>📞</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>01685 912823</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ fontSize: '13px', color: '#e8a020' }}>📍</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Dhaka, Bangladesh</span>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '14px' }} />

      {/* Bottom */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', margin: 0 }}>
          © 2025 TAZIA. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['COD', 'bKash', 'Bank Transfer'].map(p => (
            <span key={p} style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '2px 9px' }}>
              {p}
            </span>
          ))}
        </div>
      </div>

    </footer>
  );
}
