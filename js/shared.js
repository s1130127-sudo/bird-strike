// ════════════════════════════════
//  ⚙️ 填入你的 Supabase 金鑰
// ════════════════════════════════
const SUPABASE_URL = 'https://你的專案ID.supabase.co';
const SUPABASE_KEY = '你的anon_public_key';
// ════════════════════════════════

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── 導覽列 ──
function renderNav(activePage) {
  const pages = [
    { href: 'index.html',    label: '首頁' },
    { href: 'about.html',    label: '關於窗殺' },
    { href: 'report.html',   label: '通報事件' },
    { href: 'database.html', label: '資料庫' },
    { href: 'map.html',      label: '事件地圖' },
    { href: 'team.html',     label: '團隊介紹' },
  ];
  const links = pages.map(p => `
    <li><a href="${p.href}" ${p.href === activePage ? 'class="active"' : ''}>${p.label}</a></li>
  `).join('');
  document.getElementById('navMount').innerHTML = `
    <nav>
      <a class="nav-brand" href="index.html">城市飛羽 <span>·</span> 鳥窗殺防治</a>
      <ul class="nav-links">${links}</ul>
      <button class="nav-hamburger" onclick="toggleMenu()">☰</button>
    </nav>
    <div class="nav-mobile" id="navMobile">
      <ul>${links}</ul>
    </div>
  `;
}

function toggleMenu() {
  document.getElementById('navMobile').classList.toggle('open');
}

// ── Footer ──
function renderFooter() {
  document.getElementById('footerMount').innerHTML = `
    <footer>
      <div class="footer-brand">城市飛羽 · 鳥窗殺防治資料庫</div>
      <p>這個平台由一群關心生態的公民共同建立<br/>每一筆資料，都是守護生命的行動</p>
      <div class="footer-team">製作團隊：荒野宜蘭親子團一團 — 城市飛羽</div>
    </footer>
  `;
}

// ── Toast ──
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ── 共用 CSS ──
const sharedCSS = `
  :root {
    --dusk: #2c4a6e; --dawn: #f0a05a; --leaf: #3d7a5e;
    --mist: #8ab4c4; --night: #1a2d3f; --paper: #faf7f2;
    --ink: #2a2a2a; --danger: #c0392b;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Noto Sans TC', sans-serif; background: var(--paper); color: var(--ink); overflow-x: hidden; }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 2.5rem;
    background: rgba(250,247,242,0.93); backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(44,74,110,0.1);
  }
  .nav-brand { font-family: 'Noto Serif TC', serif; font-size: 1.05rem; font-weight: 700; color: var(--dusk); text-decoration: none; }
  .nav-brand span { color: var(--dawn); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { text-decoration: none; color: var(--dusk); font-size: 0.88rem; font-weight: 500; transition: color 0.2s; padding-bottom: 2px; }
  .nav-links a:hover { color: var(--dawn); }
  .nav-links a.active { color: var(--dawn); border-bottom: 2px solid var(--dawn); }
  .nav-hamburger { display: none; background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--dusk); }
  .nav-mobile { display: none; position: fixed; top: 56px; left: 0; right: 0; background: rgba(250,247,242,0.97); z-index: 99; padding: 1rem 2rem; border-bottom: 1px solid rgba(44,74,110,0.1); }
  .nav-mobile.open { display: block; }
  .nav-mobile ul { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
  .nav-mobile a { text-decoration: none; color: var(--dusk); font-size: 1rem; font-weight: 500; }
  .nav-mobile a.active { color: var(--dawn); }

  .page-wrap { max-width: 1000px; margin: 0 auto; padding: 6rem 2rem 4rem; }
  .section-tag { font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.15em; color: var(--mist); text-transform: uppercase; margin-bottom: 0.75rem; }
  .section-title { font-family: 'Noto Serif TC', serif; font-size: clamp(1.6rem,4vw,2.4rem); font-weight: 700; color: var(--dusk); margin-bottom: 1.5rem; line-height: 1.4; }
  .section-desc { font-size: 0.97rem; color: #555; line-height: 1.9; max-width: 680px; margin-bottom: 2rem; }

  .btn-sm { padding: 0.75rem 1.2rem; border: none; border-radius: 10px; cursor: pointer; font-size: 0.84rem; white-space: nowrap; transition: background 0.2s; font-family: 'Noto Sans TC', sans-serif; color: #fff; }
  .btn-green { background: var(--leaf); } .btn-green:hover { background: #2d5f48; }
  .btn-blue  { background: var(--mist); } .btn-blue:hover  { background: #6a9ab0; }
  .btn-gray  { background: #aaa; }        .btn-gray:hover  { background: #888; }

  footer { background: var(--night); color: rgba(255,255,255,0.6); padding: 3rem 2rem; text-align: center; }
  .footer-brand { font-family: 'Noto Serif TC', serif; font-size: 1.15rem; color: #fff; margin-bottom: 0.75rem; }
  footer p { font-size: 0.82rem; line-height: 1.8; }
  .footer-team { font-family: 'Space Mono', monospace; font-size: 0.7rem; color: var(--dawn); margin-top: 1.5rem; letter-spacing: 0.1em; }

  .toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 200; padding: 1rem 1.5rem; border-radius: 12px; font-size: 0.9rem; font-weight: 500; transform: translateY(100px); opacity: 0; transition: all 0.3s; max-width: 320px; }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast.success { background: var(--leaf); color: #fff; }
  .toast.error { background: var(--danger); color: #fff; }

  @media (max-width: 640px) {
    nav { padding: 1rem; }
    .nav-links { display: none; }
    .nav-hamburger { display: block; }
    .page-wrap { padding: 5rem 1.25rem 3rem; }
  }
`;
