// 黑捷客 — sample data
const ROUTE = {
  id: 'r-001',
  theme: '甜點、鮮花、野餐',
  date: '2026.04.30 14:00',
  totalDurationHours: 4,
  estPoints: 60,
  offPeakMultiplier: 1.5,
  lineColor: 'var(--mrt-r)',
  lineCode: 'R',
  lineName: '淡水信義線',
  intro: '這條路線會帶你從中山的甜點巷弄,散步到士林的花市,最後在淡水河岸結束一個慵懶的下午。',
  expirePoints: { points: 80, date: '4/30', redeemableShops: 3 },
  stations: [
    {
      code: 'R11', name: '中山', dwell: '60 分鐘',
      shops: [
        { name: 'Ruig Bakery', type: '甜點 / 麵包', dwell: '30 分', task: '消費集點', pts: '+12' },
        { name: '草字頭研所', type: '咖啡 / 雜貨', dwell: '20 分', task: '打卡', pts: '+5' },
      ],
    },
    {
      code: 'R15', name: '士林', dwell: '90 分鐘',
      segment: { line: 'R', stops: 4, mins: 8 },
      shops: [
        { name: '士林花卉市場', type: '花藝 / 市場', dwell: '40 分', task: '問答任務', pts: '+8' },
        { name: '芝山下午茶 緩行', type: '下午茶', dwell: '50 分', task: '消費集點 1.5x', pts: '+18', offpeak: true },
      ],
    },
    {
      code: 'R16', name: '芝山', dwell: '30 分鐘',
      segment: { line: 'R', stops: 1, mins: 3 },
      shops: [
        { name: '芝山岩步道入口', type: '景點 / 散步', dwell: '30 分', task: '打卡', pts: '+5' },
      ],
    },
    {
      code: 'R28', name: '淡水', dwell: '60 分鐘',
      segment: { line: 'R', stops: 12, mins: 24 },
      shops: [
        { name: '河岸野餐墊租借站', type: '野餐 / 租借', dwell: '60 分', task: '消費集點', pts: '+12', offpeak: true },
      ],
    },
  ],
};

const TASKS = [
  { id: 't1', kind: '打卡', name: '草字頭研所 入口打卡', pts: 5, status: '已完成' },
  { id: 't2', kind: '問答', name: '士林花市的歷史小考', pts: 8, status: '進行中' },
  { id: 't3', kind: '消費', name: '芝山下午茶 緩行 消費滿額', pts: 18, status: '未完成' },
  { id: 't4', kind: '打卡', name: '芝山岩步道入口', pts: 5, status: '未完成' },
  { id: 't5', kind: '消費', name: '河岸野餐墊租借', pts: 12, status: '未完成' },
];

const HISTORY = [
  { date: '2026.04.18', theme: '古蹟、咖啡、散步', stops: ['BL14','BL13','G11'], pts: 52, line: 'var(--mrt-bl)' },
  { date: '2026.04.05', theme: '夜景、酒吧、老派約會', stops: ['R02','R10','R11'], pts: 78, line: 'var(--mrt-r)' },
  { date: '2026.03.27', theme: '親子、展覽、下午茶', stops: ['BR11','BR12','BR13'], pts: 38, line: 'var(--mrt-br)' },
  { date: '2026.03.15', theme: '甜點、市場、慢活', stops: ['G14','G15','O08'], pts: 44, line: 'var(--mrt-g)' },
];

const POINTS = {
  total: 120,
  expiring: [{ pts: 80, date: '4/30' }, { pts: 25, date: '5/22' }, { pts: 15, date: '6/14' }],
  shops: [
    { name: '芝山下午茶 緩行', station: '芝山 R16', cap: '上限 50 點' },
    { name: 'Ruig Bakery', station: '中山 R11', cap: '上限 30 點' },
    { name: '河岸野餐墊租借', station: '淡水 R28', cap: '上限 80 點' },
  ],
  txs: [
    { date: '04/24', name: '草字頭研所', delta: '+5' },
    { date: '04/18', name: '咖啡日常 古亭店', delta: '−40 折抵' },
    { date: '04/12', name: '中山堂特展', delta: '+12' },
    { date: '04/05', name: '士林花卉市場', delta: '+8' },
  ],
};

const PREFS = [
  { key: '常用捷運站', value: '中山・古亭' },
  { key: '偏好類型', value: '甜點・古蹟・親子' },
  { key: '通知設定', value: '已開啟 3 項' },
  { key: '點數使用習慣', value: '到期前自動提醒' },
];

const OFFPEAK_RULES = [
  { time: '平日 14:00–17:00 出發', reward: '合作店家 1.5x' },
  { time: '假日 10:00 前出發', reward: '完成路線 +10 點' },
  { time: '非熱門時段 ・ 指定商圈', reward: '解鎖折抵券' },
];

window.HJK_DATA = { ROUTE, TASKS, HISTORY, POINTS, PREFS, OFFPEAK_RULES };
