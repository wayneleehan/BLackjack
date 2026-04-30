/* global React */
const { useState, useEffect, useRef } = React;

// ── Atoms ─────────────────────────────────────────────────────
function StationChip({ code }) {
  return <span className="station-chip">{code}</span>;
}

function LineDot({ color, transferTo }) {
  if (transferTo) {
    return (
      <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
        background: `linear-gradient(90deg, ${color} 50%, ${transferTo} 50%)`,
        verticalAlign: 'middle' }} />
    );
  }
  return <span className="line-dot" style={{ background: color }} />;
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function SectionTitle({ children, n }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '24px 0 16px',
      borderBottom: '1px solid var(--hairline)' }}>
      {n && <span className="caption" style={{ minWidth: 22 }}>{n}</span>}
      <span className="serif" style={{ fontSize: 18, letterSpacing: '0.01em' }}>{children}</span>
    </div>
  );
}

// ── Top nav ───────────────────────────────────────────────────
function TopNav({ onBack, onHome, points = 120, expiring = '80 將於 4/30 到期', simple = false }) {
  return (
    <div className="topnav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {onBack ? (
          <button onClick={onBack} aria-label="back" style={{
            background: 'none', border: 0, padding: 0, cursor: 'pointer',
            fontFamily: 'var(--serif-en)', fontSize: 18, color: 'var(--ink)',
          }}>←</button>
        ) : null}
        <button onClick={onHome} className="brand" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          黑捷客
        </button>
      </div>
      {!simple && (
        <div className="points-chip">
          <b>{points}</b> 點 ・ {expiring}
        </div>
      )}
    </div>
  );
}

function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', label: '首頁' },
    { id: 'points', label: '點數' },
    { id: 'history', label: '足跡' },
    { id: 'profile', label: '我的' },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <button key={t.id} className={active === t.id ? 'active' : ''} onClick={() => onChange(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { StationChip, LineDot, Eyebrow, SectionTitle, TopNav, TabBar });
