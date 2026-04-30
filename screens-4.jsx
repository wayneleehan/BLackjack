/* global React, Eyebrow, StationChip */
const { useState: useStateD } = React;

// ── Screen 9: Trip complete ───────────────────────────────────
function ScreenComplete({ onHome, onShare }) {
  return (
    <div className="phone-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="gutter" style={{ width: '100%', textAlign: 'center', padding: '0 32px' }}>
        <Eyebrow>2026.04.30</Eyebrow>
        <div className="serif" style={{ fontSize: 40, lineHeight: 1.15, marginTop: 24 }}>
          路線完成
        </div>

        <div style={{ margin: '64px auto 0', width: 96, height: 96, position: 'relative' }}>
          <svg viewBox="0 0 96 96" width="96" height="96">
            <circle cx="48" cy="48" r="44" fill="none" stroke="#1A1A1A" strokeWidth="1" />
            <circle cx="48" cy="48" r="32" fill="none" stroke="#1A1A1A" strokeWidth="1" />
            <path d="M48 18 L60 48 L48 78 L36 48 Z" fill="none" stroke="#1A1A1A" strokeWidth="1" />
            <circle cx="48" cy="48" r="3" fill="#1A1A1A" />
          </svg>
        </div>
        <div className="caption" style={{ marginTop: 18, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
          甜點 ・ 鮮花 ・ 野餐 徽章
        </div>

        <div style={{ marginTop: 64 }}>
          <div className="caption">本次累積</div>
          <div className="serif" style={{ fontSize: 96, lineHeight: 1, marginTop: 12, letterSpacing: '-0.04em' }}>+45</div>
        </div>

        <p className="body-2" style={{ marginTop: 48, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
          你今天走了 4 站、停留 4 小時、消費 2 間店。
        </p>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <button className="btn-text" onClick={onShare}>分享這條路線</button>
          <button className="btn-text muted" onClick={onHome}>回首頁</button>
        </div>
      </div>
    </div>
  );
}

// ── Screen 10: History ────────────────────────────────────────
function ScreenHistory({ history, onOpen, onBack }) {
  return (
    <div className="phone-content">
      <div className="gutter" style={{ paddingTop: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--serif-en)', fontSize: 20, color: 'var(--ink)' }}>←</button>

        <h1 className="h1" style={{ marginTop: 32 }}>你的捷運足跡</h1>
        <p className="body-2" style={{ marginTop: 12 }}>累積 <span className="serif" style={{ fontSize: 14, color: 'var(--ink)' }}>14</span> 條路線 ・ <span className="serif" style={{ fontSize: 14, color: 'var(--ink)' }}>312</span> 點</p>

        <div style={{ marginTop: 56 }}>
          {history.map((h, i) => (
            <div key={i} onClick={() => onOpen(h)} style={{ cursor: 'pointer',
              padding: '24px 0', borderTop: '1px solid var(--hairline)' }}>
              <div className="caption">{h.date}</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 6, letterSpacing: '0.005em' }}>{h.theme}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: h.line }} />
                {h.stops.map((c, j) => (
                  <React.Fragment key={c}>
                    <StationChip code={c} />
                    {j < h.stops.length - 1 && <span className="caption">―</span>}
                  </React.Fragment>
                ))}
                <span className="serif" style={{ fontSize: 18, marginLeft: 'auto' }}>+{h.pts}</span>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--hairline)' }} />
        </div>
        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}

// ── Screen 11: Profile / Preferences ──────────────────────────
function ScreenProfile({ prefs, onBack }) {
  return (
    <div className="phone-content">
      <div className="gutter" style={{ paddingTop: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--serif-en)', fontSize: 20, color: 'var(--ink)' }}>←</button>

        <h1 className="h1" style={{ marginTop: 32 }}>我的</h1>
        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
          <Eyebrow>會員</Eyebrow>
          <div className="serif" style={{ fontSize: 24, marginTop: 6 }}>陳 ・ Y. C.</div>
          <div className="caption" style={{ marginTop: 4 }}>編號 HJK-0428-2031</div>
        </div>

        <div style={{ marginTop: 56 }}>
          <Eyebrow>偏好設定</Eyebrow>
          <div style={{ marginTop: 12 }}>
            {prefs.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12,
                padding: '18px 0', borderTop: '1px solid var(--hairline)', alignItems: 'baseline' }}>
                <div className="body" style={{ fontSize: 15 }}>{p.key}</div>
                <div className="caption" style={{ color: 'var(--ink-2)', maxWidth: 160, textAlign: 'right' }}>{p.value}</div>
                <button className="btn-text muted" style={{ fontSize: 12 }}>編輯</button>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--hairline)' }} />
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <Eyebrow>其他</Eyebrow>
          <div style={{ marginTop: 12 }}>
            {['關於黑捷客','使用條款','登出'].map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                padding: '18px 0', borderTop: '1px solid var(--hairline)', cursor: 'pointer' }}>
                <span className="body">{t}</span>
                <span className="caption">→</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--hairline)' }} />
          </div>
        </div>
        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}

Object.assign(window, { ScreenComplete, ScreenHistory, ScreenProfile });
