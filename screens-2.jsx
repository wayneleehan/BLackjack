/* global React, StationChip, Eyebrow */
const { useState: useStateB, useEffect: useEffectB } = React;

// ── Screen 4: Shop detail ─────────────────────────────────────
function ScreenShop({ shop, station, onBack, onAddToRoute, onPay }) {
  if (!shop) return null;
  return (
    <div className="phone-content">
      <div className="gutter" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onBack} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
            fontFamily: 'var(--serif-en)', fontSize: 20, color: 'var(--ink)' }}>←</button>
          {station && <StationChip code={station.code} />}
          <span className="caption">{station?.name || ''}</span>
        </div>

        <h1 className="h1" style={{ marginTop: 32 }}>{shop.name}</h1>
        <div className="caption" style={{ marginTop: 8 }}>
          {shop.type} ・ 鄰近 {station?.name} 站 ・ 步行 4 分鐘
        </div>

        <p className="serif" style={{ fontSize: 16, lineHeight: 1.75, marginTop: 32 }}>
          散步五分鐘的轉角小店,木窗、舊木桌,賣著當日現做的奶油酥皮與單品咖啡。
          老闆推薦平日下午來,光線剛好,人也剛好。
        </p>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
          paddingTop: 24, borderTop: '1px solid var(--hairline)' }}>
          <div>
            <Eyebrow>地址</Eyebrow>
            <div className="body-2" style={{ marginTop: 8 }}>台北市中山區<br/>赤峰街 41 巷 7 號</div>
            <div style={{ height: 20 }} />
            <Eyebrow>營業</Eyebrow>
            <div className="body-2" style={{ marginTop: 8 }}>11:00 – 19:00<br/>週一公休</div>
          </div>
          <div>
            <Eyebrow>點數倍率</Eyebrow>
            <div className="serif" style={{ fontSize: 22, marginTop: 8 }}>1.5x</div>
            <div style={{ height: 20 }} />
            <Eyebrow>可折抵</Eyebrow>
            <div className="body-2" style={{ marginTop: 8 }}>單筆上限 50 點</div>
          </div>
        </div>

        <div className="inline-msg" style={{ marginTop: 32 }}>
          平日 14:00–17:00 ・ 點數 <b className="serif" style={{ fontSize: 14 }}>1.5x</b> 加碼中
        </div>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button className="btn-primary" onClick={onPay}>模擬結帳</button>
          <button onClick={onAddToRoute} className="btn-text muted" style={{ alignSelf: 'flex-start' }}>
            加入這條路線
          </button>
        </div>
        <div style={{ height: 64 }} />
      </div>
    </div>
  );
}

// ── Screen 5: Tasks list ──────────────────────────────────────
function ScreenTasks({ tasks, onOpen, onBack }) {
  return (
    <div className="phone-content">
      <div className="gutter" style={{ paddingTop: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--serif-en)', fontSize: 20, color: 'var(--ink)' }}>←</button>
        <h1 className="h1" style={{ marginTop: 32 }}>站點任務</h1>
        <p className="body-2" style={{ marginTop: 12 }}>沿線的打卡、問答與消費集點。</p>

        <div style={{ marginTop: 48 }}>
          {tasks.map((t) => (
            <div key={t.id} onClick={() => onOpen(t)} style={{ cursor: 'pointer',
              padding: '20px 0', borderTop: '1px solid var(--hairline)',
              display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline', columnGap: 16, rowGap: 4 }}>
              <div>
                <div className="caption">{t.kind}</div>
                <div className="serif" style={{ fontSize: 18, marginTop: 4 }}>{t.name}</div>
                <div className="caption" style={{ marginTop: 6, color: t.status === '已完成' ? 'var(--ink-3)' : 'var(--ink-2)' }}>
                  {t.status === '已完成' ? '── 已完成' : t.status === '進行中' ? '── 進行中' : '── 未完成'}
                </div>
              </div>
              <div className="serif" style={{ fontSize: 28 }}>+{t.pts}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--hairline)' }} />
        </div>
        <div style={{ height: 64 }} />
      </div>
    </div>
  );
}

// ── Screen 5b: Task detail (3 kinds) ──────────────────────────
function ScreenTaskDetail({ task, onBack, onComplete }) {
  if (!task) return null;
  const [picked, setPicked] = useStateB(null);

  return (
    <div className="phone-content">
      <div className="gutter" style={{ paddingTop: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
          fontFamily: 'var(--serif-en)', fontSize: 20, color: 'var(--ink)' }}>←</button>

        <Eyebrow style={{ marginTop: 32 }}>任務 ・ {task.kind}</Eyebrow>
        <h1 className="h1" style={{ marginTop: 14 }}>{task.name}</h1>
        <div className="caption" style={{ marginTop: 12 }}>完成可獲得 <span className="serif" style={{ fontSize: 16, color: 'var(--ink)' }}>+{task.pts}</span> 點</div>

        <div style={{ height: 56 }} />

        {task.kind === '打卡' && (
          <div>
            <div style={{ width: 200, height: 200, margin: '0 auto', position: 'relative',
              background: 'var(--ink)', padding: 16 }}>
              <QRPattern />
            </div>
            <p className="body-2" style={{ marginTop: 32, textAlign: 'center', maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
              出示這組 QR 給店家掃描,或在店門口的指示牌打卡。
            </p>
          </div>
        )}

        {task.kind === '問答' && (
          <div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.45 }}>
              士林花卉市場每週幾為主要交易日?
            </div>
            <div style={{ marginTop: 32 }}>
              {['週一、週四', '週二、週五', '週三、週六', '每天'].map((opt, i) => (
                <button key={i} className={'quiz-opt' + (picked === i ? ' selected' : '')} onClick={() => setPicked(i)}>
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 40 }}>
              <button className="btn-primary" disabled={picked === null} onClick={onComplete}
                style={{ opacity: picked === null ? 0.4 : 1 }}>
                送出答案
              </button>
            </div>
          </div>
        )}

        {task.kind === '消費' && (
          <div>
            <div className="caption">店家</div>
            <div className="serif" style={{ fontSize: 22, marginTop: 4 }}>芝山下午茶 緩行</div>
            <div className="caption" style={{ marginTop: 4 }}>R16 芝山 ・ 步行 6 分鐘</div>

            <div style={{ marginTop: 48, padding: '24px 0', borderTop: '1px solid var(--hairline)',
              borderBottom: '1px solid var(--hairline)' }}>
              <div className="caption" style={{ textAlign: 'center' }}>結帳出示這組條碼</div>
              <Barcode />
              <div className="caption" style={{ textAlign: 'center', letterSpacing: '0.3em', marginTop: 8 }}>
                7 1 9 2 ・ 4 8 3 0 ・ 1 1 0 5
              </div>
            </div>
            <div style={{ marginTop: 40 }}>
              <button className="btn-primary" onClick={onComplete}>確認消費完成</button>
            </div>
          </div>
        )}
        <div style={{ height: 64 }} />
      </div>
    </div>
  );
}

function QRPattern() {
  // simple deterministic-ish QR-like grid
  const cells = [];
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const corner = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      const onCorner = corner && ((x === 0 || x === 6 || x === 14 || x === 20) ||
        (y === 0 || y === 6 || y === 14 || y === 20) ||
        ((x >= 2 && x <= 4 && y >= 2 && y <= 4) || (x >= 16 && x <= 18 && y >= 2 && y <= 4) || (x >= 2 && x <= 4 && y >= 16 && y <= 18)));
      const fill = corner ? onCorner : ((x * 7 + y * 13 + x * y) % 3 === 0);
      cells.push(<rect key={`${x}-${y}`} x={x * 8} y={y * 8} width={8} height={8} fill={fill ? '#F2EBDD' : '#1A1A1A'} />);
    }
  }
  return <svg viewBox="0 0 168 168" width="100%" height="100%">{cells}</svg>;
}

function Barcode() {
  const widths = [3,1,2,1,4,1,2,3,1,2,1,3,2,1,4,1,2,1,3,2,1,3,1,2,4,1,2,3,1,2];
  let x = 0;
  return (
    <svg viewBox="0 0 200 60" width="100%" height={60} style={{ marginTop: 12 }}>
      {widths.map((w, i) => {
        const r = <rect key={i} x={x} y={0} width={i % 2 ? 0 : w} height={60} fill="#1A1A1A" />;
        x += w + 1;
        return r;
      })}
    </svg>
  );
}

Object.assign(window, { ScreenShop, ScreenTasks, ScreenTaskDetail });
