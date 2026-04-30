/* global React, ReactDOM, IOSDevice, IOSStatusBar, HJK_DATA,
   TopNav, TabBar,
   ScreenHome, ScreenGenerating, ScreenRoute,
   ScreenShop, ScreenTasks, ScreenTaskDetail,
   ScreenPoints, CheckoutSheet, ScreenOffpeak,
   ScreenComplete, ScreenHistory, ScreenProfile */

const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp } = React;

// route key catalogue — every screen the user can navigate to
function App() {
  const [view, setView] = useStateApp('home'); // home | gen | route | shop | tasks | task | points | offpeak | complete | history | profile
  const [shop, setShop] = useStateApp(null);
  const [station, setStation] = useStateApp(null);
  const [task, setTask] = useStateApp(null);
  const [sheetOpen, setSheetOpen] = useStateApp(false);
  const [pointsTotal, setPointsTotal] = useStateApp(120);

  const D = HJK_DATA;

  const goHome = () => setView('home');
  const goRoute = () => setView('route');

  const showShop = (s, st) => { setShop(s); setStation(st); setView('shop'); };
  const openTask = (t) => { setTask(t); setView('task'); };
  const openTaskFromShop = (s) => {
    const kind = s.task.includes('打卡') ? '打卡' : s.task.includes('問答') ? '問答' : '消費';
    setTask({ id: 'q' + Date.now(), kind, name: `${s.name} ・ ${s.task}`, pts: parseInt((s.pts || '+5').replace(/[^0-9]/g,''), 10) || 5 });
    setView('task');
  };

  // tab handling
  const tab = view === 'home' ? 'home'
    : view === 'points' ? 'points'
    : view === 'history' ? 'history'
    : view === 'profile' ? 'profile' : null;

  let body = null;
  if (view === 'home') body = <ScreenHome points={pointsTotal} onSubmit={() => setView('gen')} />;
  else if (view === 'gen') body = <ScreenGenerating onDone={goRoute} />;
  else if (view === 'route') body = <ScreenRoute route={D.ROUTE} onShop={showShop}
    onTask={openTaskFromShop}
    onStart={() => setView('tasks')} />;
  else if (view === 'shop') body = <ScreenShop shop={shop} station={station}
    onBack={goRoute} onAddToRoute={goRoute} onPay={() => setSheetOpen(true)} />;
  else if (view === 'tasks') body = <ScreenTasks tasks={D.TASKS} onOpen={openTask} onBack={goRoute} />;
  else if (view === 'task') body = <ScreenTaskDetail task={task} onBack={() => setView('tasks')}
    onComplete={() => { setPointsTotal(p => p + (task?.pts || 0)); setView('complete'); }} />;
  else if (view === 'points') body = <ScreenPoints data={{ ...D.POINTS, total: pointsTotal }} onBack={goHome} />;
  else if (view === 'offpeak') body = <ScreenOffpeak rules={D.OFFPEAK_RULES} onBack={goHome} onPick={goRoute} />;
  else if (view === 'complete') body = <ScreenComplete onHome={goHome} onShare={goHome} />;
  else if (view === 'history') body = <ScreenHistory history={D.HISTORY} onBack={goHome} onOpen={goRoute} />;
  else if (view === 'profile') body = <ScreenProfile prefs={D.PREFS} onBack={goHome} />;

  // phone-frame internal layout (status bar + topnav + content + tabbar)
  const phoneInner = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ paddingTop: 50 }}>
        {/* status bar absolute positioned by IOSDevice — but our nav sits below it */}
      </div>
      <TopNav
        onBack={view !== 'home' ? () => {
          // contextual back
          if (view === 'shop' || view === 'tasks') return setView('route');
          if (view === 'task') return setView('tasks');
          return setView('home');
        } : null}
        onHome={goHome}
        points={pointsTotal}
        simple={view === 'gen' || view === 'complete'}
      />
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {body}
      </div>
      {tab && <TabBar active={tab} onChange={(id) => {
        if (id === 'home') setView('home');
        if (id === 'points') setView('points');
        if (id === 'history') setView('history');
        if (id === 'profile') setView('profile');
      }} />}
      <CheckoutSheet open={sheetOpen} onClose={() => setSheetOpen(false)}
        onConfirm={() => { setSheetOpen(false); setPointsTotal(p => Math.max(0, p - 50)); setView('complete'); }} />
    </div>
  );

  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      {/* presentation: device + side caption */}
      <div className="scale-wrap" style={{ flexDirection: 'column', gap: 24 }}>
        {/* nav row above the device */}
        <NavStrip view={view} setView={setView} />

        <IOSDevice width={390} height={844}>
          {phoneInner}
        </IOSDevice>

        <Caption view={view} />
      </div>
    </div>
  );
}

function NavStrip({ view, setView }) {
  const items = [
    ['home', '01 首頁'],
    ['gen', '02 生成中'],
    ['route', '03 路線'],
    ['shop', '04 商家'],
    ['tasks', '05 任務'],
    ['task', '05b 任務頁'],
    ['points', '06 點數'],
    ['offpeak', '08 離峰'],
    ['complete', '09 完成'],
    ['history', '10 足跡'],
    ['profile', '11 我的'],
  ];
  return (
    <div style={{ width: 'min(880px, 100%)', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
      {items.map(([k, l]) => (
        <button key={k} onClick={() => setView(k)} style={{
          background: 'none', border: 0, cursor: 'pointer',
          fontFamily: 'var(--sans-en)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: view === k ? 'var(--ink)' : 'var(--ink-3)',
          borderBottom: view === k ? '1px solid var(--ink)' : '1px solid transparent',
          padding: '4px 2px',
        }}>{l}</button>
      ))}
    </div>
  );
}

function Caption({ view }) {
  const map = {
    home: '首頁 ・ 關鍵字輸入',
    gen: '過場 ・ AI 生成',
    route: 'AI 路線結果 ・ 核心畫面',
    shop: '站點 / 商家細節',
    tasks: '站點任務列表',
    task: '個別任務 ・ 打卡 / 問答 / 消費',
    points: '點數中心',
    offpeak: '離峰加碼活動',
    complete: '行程完成 ・ 徽章',
    history: '我的捷運足跡',
    profile: '個人偏好',
  };
  return (
    <div style={{ width: 'min(880px, 100%)', textAlign: 'center', marginTop: 8 }}>
      <div className="caption" style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        {map[view] || ''}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
