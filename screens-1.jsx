/* global React, HJK_DATA, StationChip, LineDot, Eyebrow */
const { useState: useStateS, useEffect: useEffectS } = React;

// ── Screen 1: Home ────────────────────────────────────────────
function ScreenHome({ onSubmit, points }) {
  const [val, setVal] = useStateS('');
  const tags = [
    '甜點・鮮花・野餐',
    '古蹟・咖啡・散步',
    '親子・展覽・下午茶',
    '夜景・酒吧・老派約會',
  ];
  return (
    <div className="phone-content">
      <div style={{ height: 96 }} />
      <div className="gutter" style={{ paddingTop: 32 }}>
        <Eyebrow>2026.04.30 ・ 台北捷運</Eyebrow>
        <div className="serif" style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.02em', marginTop: 32 }}>
          黑捷客
        </div>
        <p className="body-2" style={{ marginTop: 18, maxWidth: 320 }}>
          輸入關鍵字,讓 AI 帶你搭一段捷運。
        </p>

        <div style={{ marginTop: 64 }}>
          <input
            className="input-line"
            placeholder="甜點、鮮花、野餐…"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && val.trim() && onSubmit(val)}
          />
        </div>

        <div style={{ marginTop: 40 }}>
          <Eyebrow>靈感</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, marginTop: 12 }}>
            {tags.map(t => (
              <button key={t} className="tag-line" onClick={() => onSubmit(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 96 }}>
          <hr className="hairline" />
          <div className="caption" style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between' }}>
            <span>目前 <span className="serif" style={{ fontSize: 14 }}>{points}</span> 點</span>
            <span>80 將於 4/30 到期</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen 2: Generating ──────────────────────────────────────
function ScreenGenerating({ onDone }) {
  const text = '正在為你搭配一條捷運路線…';
  const [shown, setShown] = useStateS('');
  useEffectS(() => {
    let i = 0;
    const id = setInterval(() => {
      i++; setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 60);
    const t = setTimeout(onDone, 2400);
    return () => { clearInterval(id); clearTimeout(t); };
  }, []);
  return (
    <div className="phone-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="gutter" style={{ width: '100%', textAlign: 'center' }}>
        <div className="serif" style={{ fontSize: 22, letterSpacing: '0.01em', minHeight: 32 }}>
          {shown}<span style={{ opacity: 0.4 }}>|</span>
        </div>
        <div className="progress-line" style={{ marginTop: 56, maxWidth: 220, marginLeft: 'auto', marginRight: 'auto' }} />
      </div>
    </div>
  );
}

// ── Screen 3: Route result ───────────────────────────────────
function ScreenRoute({ route, onShop, onStart, onTask }) {
  return (
    <div className="phone-content" style={{ '--line-color': route.lineColor }}>
      <div className="gutter" style={{ paddingTop: 24 }}>
        <Eyebrow>為你生成的路線 ・ {route.date} 出發</Eyebrow>
        <h1 className="h1" style={{ marginTop: 14 }}>{route.theme}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
          marginTop: 28, paddingTop: 16, borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)' }}>
          {[
            { k: '總時長', v: `${route.totalDurationHours}h` },
            { k: '預估累積', v: `${route.estPoints} 點` },
            { k: '離峰', v: `${route.offPeakMultiplier}x` },
          ].map((m, i) => (
            <div key={i} style={{ padding: '14px 0', borderLeft: i ? '1px solid var(--hairline)' : 'none', paddingLeft: i ? 14 : 0 }}>
              <div className="caption">{m.k}</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 2 }}>{m.v}</div>
            </div>
          ))}
        </div>

        <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, marginTop: 32, color: 'var(--ink)' }}>
          {route.intro}
        </p>

        <div className="inline-msg" style={{ marginTop: 32 }}>
          你有 <b className="serif" style={{ fontSize: 14 }}>{route.expirePoints.points}</b> 點將於 {route.expirePoints.date} 到期。
          本次路線經過 {route.expirePoints.redeemableShops} 間可折抵店家。
        </div>

        <div style={{ height: 56 }} />

        <div className="timeline">
          {route.stations.map((s, idx) => (
            <Station key={s.code} s={s} delay={idx * 80} onShop={onShop} onTask={onTask} segment={s.segment} />
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
          <div className="caption">完成路線額外加碼</div>
          <p className="body-2" style={{ marginTop: 8 }}>
            完成全部 4 站任務 +10 點;14:00 出發離峰加碼 1.5x。
          </p>
          <div style={{ height: 28 }} />
          <button className="btn-primary" onClick={onStart}>開始這條路線</button>
        </div>
        <div style={{ height: 64 }} />
      </div>
    </div>
  );
}

function Station({ s, delay, onShop, onTask, segment }) {
  return (
    <div className="tl-station" style={{ animationDelay: `${delay}ms` }}>
      {segment && (
        <div className="tl-segment" style={{ marginLeft: -28, paddingLeft: 28, marginTop: -32, paddingTop: 0, marginBottom: 24 }}>
          → 搭乘 {segment.line === 'R' ? '淡水信義線' : segment.line} {segment.stops} 站 ・ {segment.mins} 分鐘
        </div>
      )}
      <span className="tl-dot" />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span className="serif" style={{ fontSize: 26, letterSpacing: '0.005em' }}>{s.name}</span>
        <StationChip code={s.code} />
        <span className="caption" style={{ marginLeft: 'auto' }}>停留 {s.dwell}</span>
      </div>

      <ul style={{ listStyle: 'none', margin: '20px 0 0', padding: 0 }}>
        {s.shops.map((shop, i) => (
          <li key={i} onClick={() => onShop(shop, s)} style={{ cursor: 'pointer',
            display: 'grid', gridTemplateColumns: '1fr auto', columnGap: 12, rowGap: 4,
            padding: '14px 0', borderTop: i === 0 ? '1px solid var(--hairline)' : 'none',
            borderBottom: '1px solid var(--hairline)' }}>
            <div>
              <div className="serif" style={{ fontSize: 16 }}>{shop.name}</div>
              <div className="caption" style={{ marginTop: 2 }}>
                {shop.type} ・ 停留 {shop.dwell}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="serif" style={{ fontSize: 18 }}>{shop.pts}</div>
              <button onClick={(e) => { e.stopPropagation(); onTask && onTask(shop); }}
                className="caption" style={{ background: 'none', border: 0, padding: 0,
                cursor: 'pointer', color: 'var(--ink-2)', borderBottom: '1px solid var(--hairline-strong)' }}>
                {shop.task}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, { ScreenHome, ScreenGenerating, ScreenRoute });
