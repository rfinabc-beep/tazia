'use client';
export default function CategorySection() {
  const categories = [
    { icon: '👕', label: 'পোশাক' },
    { icon: '📱', label: 'ইলেকট্রনিক্স' },
    { icon: '🛒', label: 'মুদিখানা' },
    { icon: '🔧', label: 'হার্ডওয়্যার' },
    { icon: '📦', label: 'প্যাকেজিং' },
    { icon: '🍱', label: 'খাদ্যপণ্য' },
  ];

  return (
    <section style={{ padding: '2.5rem 1.5rem', background: '#0f2442' }}>
      <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: '500', color: '#fff', marginBottom: '0.4rem' }}>
        পণ্যের ক্যাটাগরি
      </h2>
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#90aecb', marginBottom: '2rem' }}>
        আপনার প্রয়োজনীয় পণ্য খুঁজুন
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px', maxWidth: '900px', margin: '0 auto' }}>
        {categories.map((cat, i) => (
          <div key={i} style={{ background: '#162d50', border: '0.5px solid #2a4a72', borderRadius: '12px', padding: '1.2rem 0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#1e3a6a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
              {cat.icon}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#c8ddf0', textAlign: 'center' }}>{cat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
