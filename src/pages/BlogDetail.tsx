import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getArticleBySlug, articles } from '@/data/blog';
import { useIsMobile } from '@/hooks/useIsMobile';

const NAVY = '#111D55';
const GOLD = '#EFBF04';
const CREAM = '#EFE5E3';
const INK  = '#3A3A3A';
const FF   = '"IBM Plex Sans", sans-serif';
const FB   = '"Inter", sans-serif';

const CAT_COLORS: Record<string, string> = {
  Innovation: '#2563EB',
  Engagement: '#16A34A',
  Wirtschaft: '#9333EA',
};

export default function BlogDetail() {
  const isMobile = useIsMobile();
  const { slug } = useParams<{ slug: string }>();
  const article  = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '80px 24px', background: CREAM }}>
        <h2 style={{ fontFamily: FF, fontSize: '2rem', fontWeight: 900, color: NAVY }}>Artikel nicht gefunden</h2>
        <Link to="/presse" style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, color: NAVY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={14} /> Zurück zur Presse
        </Link>
      </div>
    );
  }

  const related = article.relatedSlugs
    .map(s => articles.find(a => a.slug === s))
    .filter(Boolean) as typeof articles;

  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: isMobile ? 'auto' : '70vh', minHeight: 520, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <img
          src={article.img}
          alt={article.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111D55 0%, rgba(3,9,58,0.75) 45%, rgba(3,9,58,0.1) 100%)' }} />
        {/* Gold bottom line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${GOLD}, rgba(239,191,4,0.3), transparent)` }} />

        <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '0 24px 48px' : '0 80px 72px', maxWidth: 860 }}>
          {/* Back link */}
          <Link
            to="/presse"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: FF, fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
              marginBottom: 32, transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <ArrowLeft size={13} /> Newsroom
          </Link>

          {/* Category badge */}
          <div style={{ marginBottom: 20 }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              fontFamily: FF, fontSize: 9, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.22em',
              background: CAT_COLORS[article.cat] ?? GOLD,
              color: '#fff',
            }}>
              {article.cat}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: FF,
              fontSize: isMobile ? 'clamp(1.6rem, 6vw, 2.4rem)' : 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 0 28px',
              maxWidth: 760,
            }}
          >
            {article.title}
          </motion.h1>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[
              { icon: User,  label: `${article.author} · ${article.authorRole}` },
              { icon: Clock, label: `${article.date} · ${article.readTime} Lesezeit` },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FB, fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
                <Icon size={13} color={GOLD} /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: isMobile ? '48px 0 0' : '80px 0 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 24px' : '0 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 320px', gap: isMobile ? 40 : 80 }}>

          {/* LEFT – article text */}
          <article>
            {/* Lead */}
            <p style={{
              fontFamily: FB, fontSize: 19, fontWeight: 300,
              color: INK, lineHeight: 1.75,
              borderLeft: `4px solid ${GOLD}`, paddingLeft: 28,
              marginBottom: 56,
            }}>
              {article.excerpt}
            </p>

            {/* Sections */}
            {article.sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                style={{ marginBottom: 48 }}
              >
                {section.heading && (
                  <h2 style={{
                    fontFamily: FF, fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                    fontWeight: 900, color: NAVY,
                    textTransform: 'uppercase', letterSpacing: '-0.01em',
                    marginBottom: 16,
                  }}>
                    {section.heading}
                  </h2>
                )}
                <p style={{
                  fontFamily: FB, fontSize: 18,
                  color: 'rgba(58,58,58,0.8)', lineHeight: 1.8, margin: 0,
                }}>
                  {section.body}
                </p>
              </motion.div>
            ))}

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '40px 0', borderTop: '1px solid rgba(3,9,58,0.1)', marginTop: 24 }}>
              <Tag size={13} color='rgba(3,9,58,0.35)' style={{ marginTop: 2 }} />
              {article.tags.map(tag => (
                <span key={tag} style={{
                  padding: '4px 12px',
                  fontFamily: FF, fontSize: 10, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: NAVY, background: 'rgba(3,9,58,0.07)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* RIGHT – sticky sidebar */}
          <aside>
            <div style={{ position: isMobile ? 'static' : 'sticky', top: isMobile ? undefined : 100 }}>

              {/* Author card */}
              <div style={{ background: NAVY, padding: '28px 28px 32px', marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <User size={22} color={NAVY} />
                </div>
                <div style={{ fontFamily: FF, fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                  {article.author}
                </div>
                <div style={{ fontFamily: FB, fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                  {article.authorRole}
                </div>
              </div>

              {/* CTA */}
              <div style={{ background: '#fff', border: '1px solid rgba(3,9,58,0.1)', padding: '28px' }}>
                <div style={{ width: 32, height: 2, background: GOLD, marginBottom: 16 }} />
                <h4 style={{ fontFamily: FF, fontSize: 15, fontWeight: 900, color: NAVY, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 12 }}>
                  Jetzt bewerben
                </h4>
                <p style={{ fontFamily: FB, fontSize: 16, color: 'rgba(58,58,58,0.55)', lineHeight: 1.7, marginBottom: 20 }}>
                  Ist Ihr Unternehmen bereit für den Bayerischen Mittelstandspreis 2026?
                </p>
                <Link
                  to="/teilnahme"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 20px',
                    background: NAVY, color: '#fff',
                    fontFamily: FF, fontSize: 14, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    textDecoration: 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.background = NAVY)}
                >
                  Zur Bewerbung <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── RELATED ARTICLES ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ background: NAVY, padding: isMobile ? '48px 0' : '80px 0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 24px' : '0 80px' }}>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 56 }}>
              <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                Weitere Artikel
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${related.length}, 1fr)`, gap: 0 }}>
              {related.map((rel, idx) => (
                <RelatedCard key={rel.slug} article={rel} bordered={isMobile ? false : idx > 0} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

function RelatedCard({ article, bordered, isMobile }: { article: ReturnType<typeof getArticleBySlug> & object; bordered: boolean; isMobile: boolean }) {
  const [hovered, setHovered] = React.useState(false);
  if (!article) return null;
  return (
    <Link
      to={`/presse/blog/${article.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        borderLeft: bordered && !isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none',
        borderBottom: 'none',
        textDecoration: 'none',
        paddingLeft: bordered && !isMobile ? 40 : 0,
        paddingRight: isMobile ? 0 : 40,
        paddingBottom: isMobile ? 40 : 0,
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 180, overflow: 'hidden', marginBottom: 24 }}>
        <img
          src={article.img}
          alt={article.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: hovered ? 'none' : 'grayscale(80%)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'filter 0.4s, transform 0.4s',
          }}
        />
      </div>
      <span style={{ fontFamily: FF, fontSize: 9, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.22em', fontWeight: 700, marginBottom: 10 }}>
        {article.cat}
      </span>
      <h3 style={{ fontFamily: FF, fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 12 }}>
        {article.title}
      </h3>
      <div style={{ width: hovered ? 64 : 24, height: 1, background: 'rgba(239,191,4,0.5)', transition: 'width 0.35s', marginBottom: 14 }} />
      <p style={{ fontFamily: FB, fontSize: 16, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, flex: 1, marginBottom: 16 }}>
        {article.excerpt}
      </p>
      <span style={{ fontFamily: FF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: GOLD, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        Weiterlesen <ArrowRight size={12} />
      </span>
    </Link>
  );
}
