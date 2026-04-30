/* global React, Eyebrow, StationChip */
const { useState: useStateC } = React;

// ── Screen 6: Points center ───────────────────────────────────
function ScreenPoints({ data, onBack }) {
  return (
    <div className="phone-content">
      <div className="gutter" style={{ paddingTop: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--serif-en)', fontSize: 20, color: 'var(--ink)' }}>←</button>
        <div style={{ height: 56 }} />
        <Eyebrow>目前捷運點</Eyebrow>
        <div className="serif" style={{ fontSize: 96, lineHeight: 1, letterSpacing: '-0.04em', marginTop: 12 }}>
          {data.total}
        </div>
        <div className="caption" style={{ marginTop: 8 }}>下次累積將在 <span className="serif" style={{ fontSize: 14, color: 'var(--ink)' }}>+45</span> 點時觸發提醒</div>

        <div style={{ marginTop: 64 }}>
          <Eyebrow>點數到期時間軸</Eyebrow>
          <ExpiryTimeline items={data.expiring} />
        </div>

        <div style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--hairline)', paddingBottom: 12 }}>
            <span className="serif" style={{ fontSize: 18 }}>即將到期</span>
            <span className="caption">3 筆</span>
          </div>
          {data.expiring.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
              <div className="serif" style={{ fontSize: 18 }}>{e.pts} <span style={{ fontSize: 12, fontFamily: 'var(--sans-tc)', color: 'var(--ink-3)' }}>點</span></div>
              <div className="caption">{e.date} 到期</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--hairline)', paddingBottom: 12 }}>
            <span className="serif" style={{ fontSize: 18 }}>沿線可使用商家</span>
            <span className="caption">{data.shops.length} 家</span>
          </div>
          {data.shops.map((s, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid var(--hairline)' }}>
              <div className="serif" style={{ fontSize: 17 }}>{s.name}</div>
              <div className="caption" style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span>{s.station}</span><span>{s.cap}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--hairline)', paddingBottom: 12 }}>
            <span className="serif" style={{ fontSize: 18 }}>最近交易</span>
            <span className="caption">近 30 日</span>
          </div>
          {data.txs.map((t, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--hairline)', alignItems: 'baseline' }}>
              <div className="caption">{t.date}</div>
              <div className="body-2">{t.name}</div>
              <div className="serif" style={{ fontSize: 16 }}>{t.delta}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}

function ExpiryTimeline({ items }) {
  return (
    <div style={{ marginTop: 24, position: 'relative', paddingTop: 16, paddingBottom: 28 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 28, height: 1, background: 'var(--hairline)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        {items.map((e, i) => (
          <div key={i} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink)', margin: '8px auto 0' }} />
            <div className="serif" style={{ fontSize: 18, marginTop: 12 }}>{e.pts}</div>
            <div className="caption" style={{ marginTop: 2 }}>{e.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen 7: Checkout sheet ──────────────────────────────────
function CheckoutSheet({ open, onClose, onConfirm }) {
  return (
    <div>
      <div className={'sheet-overlay' + (open ? ' open' : '')} onClick={onClose} />
      <div className={'sheet' + (open ? ' open' : '')}>
        <div className="grabber" />
        <Eyebrow>結帳提醒</Eyebrow>
        <h2 className="h2" style={{ marginTop: 8, fontSize: 24 }}>使用點數折抵?</h2>
        <p className="body-2" style={{ marginTop: 12 }}>
          你有 <span className="serif" style={{ fontSize: 14, color: 'var(--ink)' }}>80</span> 點將於 4/30 到期,
          本次消費可折抵 <span className="serif" style={{ fontSize: 14, color: 'var(--ink)' }}>50</span> 點。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32, paddingTop: 24,
          borderTop: '1px solid var(--hairline)' }}>
          <div>
            <div className="caption">結帳金額</div>
            <div className="serif" style={{ fontSize: 32, marginTop: 4, color: 'var(--ink-2)', textDecoration: 'line-through' }}>$320</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="caption">折抵後</div>
            <div className="serif" style={{ fontSize: 36, marginTop: 4 }}>$270</div>
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn-primary" onClick={onConfirm}>使用 50 點折抵</button>
          <button className="btn-ghost" onClick={onClose}>下次再說</button>
        </div>
      </div>
    </div>
  );
}

// ── Screen 8: Off-peak bonus ──────────────────────────────────
function ScreenOffpeak({ rules, onBack, onPick }) {
  return (
    <div className="phone-content">
      <div className="gutter" style={{ paddingTop: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--serif-en)', fontSize: 20, color: 'var(--ink)' }}>←</button>

        <Eyebrow style={{ marginTop: 32 }}>本月加碼活動</Eyebrow>
        <h1 className="h1" style={{ marginTop: 14 }}>離峰時段加碼</h1>
        <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, marginTop: 24 }}>
          搭離峰、走人少的路線,點數累積得更快。下面是這個月的三組加碼條件。
        </p>

        <div style={{ marginTop: 56 }}>
          {rules.map((r, i) => (
            <div key={i} style={{ padding: '24px 0', borderTop: '1px solid var(--hairline)' }}>
              <div className="caption">條件 {String(i + 1).padStart(2, '0')}</div>
              <div className="serif" style={{ fontSize: 20, marginTop: 6 }}>{r.time}</div>
              <div className="body-2" style={{ marginTop: 8 }}>── {r.reward}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--hairline)' }} />
        </div>

        <div style={{ marginTop: 56 }}>
          <Eyebrow>進行中的加碼路線</Eyebrow>
          <div style={{ marginTop: 20, padding: '20px 0', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
            <div className="serif" style={{ fontSize: 18 }}>河岸黃昏 ・ 老淡水</div>
            <div className="caption" style={{ marginTop: 6 }}>離峰 1.5x ・ 平日 14:00 出發</div>
            <div style={{ marginTop: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
              {['R20','R22','R25','R28'].map(c => <StationChip key={c} code={c} />)}
            </div>
            <button className="btn-text" style={{ marginTop: 18 }} onClick={onPick}>查看路線詳情</button>
          </div>
        </div>
        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}

Object.assign(window, { ScreenPoints, CheckoutSheet, ScreenOffpeak });
