:root{
  --bg:#0b0c10;
  --panel:#0f1118;
  --card:#121524;
  --text:#f2f4ff;
  --muted:#a9afc7;
  --line:rgba(255,255,255,.08);
  --shadow: 0 18px 60px rgba(0,0,0,.45);
  --radius: 18px;
  --accent: #8fa0ff;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  background:
    radial-gradient(1200px 600px at 20% 0%, rgba(148,163,255,.16), transparent 50%),
    radial-gradient(900px 600px at 90% 10%, rgba(61,235,190,.10), transparent 55%),
    var(--bg);
  color:var(--text);
  overflow-x:hidden;
}

.bg-noise{
  position:fixed; inset:0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.08'/%3E%3C/svg%3E");
  pointer-events:none;
  mix-blend-mode: overlay;
  opacity:.55;
}

a{ color:inherit; text-decoration:none; }
button{ font:inherit; }

/* Topbar */
.topbar{
  position:sticky; top:0; z-index:50;
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 18px;
  background: rgba(11,12,16,.70);
  backdrop-filter: blur(14px);
  border-bottom:1px solid var(--line);
}

.brand{
  display:flex; align-items:center; gap:10px;
  font-weight:800;
  letter-spacing:.2px;
}
.brand .dot{
  width:10px; height:10px; border-radius:999px;
  background: linear-gradient(135deg, #9aa5ff, #3debbf);
  box-shadow: 0 0 0 6px rgba(154,165,255,.12);
}

.nav{
  display:flex;
  gap:8px;
  align-items:center;
}
.navlink{
  padding:10px 12px;
  border:1px solid transparent;
  background: transparent;
  color: var(--muted);
  border-radius: 999px;
  cursor:pointer;
  transition: transform .18s ease, background .18s ease, color .18s ease, border-color .18s ease;
}
.navlink:hover{
  transform: translateY(-1px);
  background: rgba(255,255,255,.04);
  color: var(--text);
  border-color: rgba(255,255,255,.10);
}
.navlink.active{
  color: var(--text);
  background: rgba(154,165,255,.10);
  border-color: rgba(154,165,255,.24);
  box-shadow: 0 10px 30px rgba(154,165,255,.12);
}

.burger{
  display:none;
  background:transparent;
  border:1px solid rgba(255,255,255,.10);
  width:44px; height:44px;
  border-radius: 12px;
  cursor:pointer;
}
.burger span{
  display:block;
  height:2px;
  margin:7px 10px;
  background: rgba(255,255,255,.85);
  border-radius:2px;
}

/* Layout */
.wrap{
  max-width: 1180px;
  margin: 0 auto;
  padding: 34px 18px 18px;
}

.panel{
  display:none;
  padding: 22px;
  border:1px solid var(--line);
  background: rgba(15,17,24,.60);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transform-origin: top center;
}
.panel.active{ display:block; }

/* Hero */
.hero{ padding: 10px 6px 6px; }

.kicker{ display:flex; gap:10px; align-items:center; margin-bottom: 14px; flex-wrap:wrap; }

.pill{
  display:inline-flex; align-items:center;
  padding:8px 12px;
  border-radius: 999px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.04);
  color: var(--text);
  font-weight:700;
  font-size: 13px;
}
.pill.ghost{ color: var(--muted); background: transparent; }
.pill.mini{ padding:6px 10px; font-size:12px; }

.title{
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.03;
  margin: 0 0 12px;
  letter-spacing: -0.04em;
}
.muted{ color: var(--muted); }
.accent{
  color: var(--accent);
  text-shadow: 0 0 16px rgba(143,160,255,.35);
}

.lead{
  margin: 0 0 18px;
  max-width: 75ch;
  color: rgba(242,244,255,.86);
  font-size: 16.5px;
  line-height: 1.65;
}

.cta{ display:flex; gap:10px; flex-wrap:wrap; margin: 12px 0 18px; }

.btn{
  display:inline-flex; align-items:center; justify-content:center;
  padding: 12px 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(154,165,255,.95), rgba(61,235,190,.85));
  color: #06070c;
  font-weight: 900;
  border: none;
  cursor:pointer;
  transition: transform .18s ease, filter .18s ease;
}
.btn:hover{ transform: translateY(-1px); filter: brightness(1.02); }
.btn.ghost{
  background: rgba(255,255,255,.04);
  color: var(--text);
  border:1px solid rgba(255,255,255,.12);
}
.btn.small{
  padding:10px 12px;
  border-radius: 12px;
}

/* Hero visual */
.heroVisual{
  position:relative;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(18,21,36,.55);
  padding: 16px;
  overflow:hidden;
}
.heroGlow{
  position:absolute;
  inset:-40px;
  background: radial-gradient(500px circle at 20% 10%, rgba(143,160,255,.30), transparent 60%),
              radial-gradient(500px circle at 80% 20%, rgba(61,235,190,.16), transparent 60%);
  filter: blur(30px);
  opacity:.85;
  pointer-events:none;
}
.heroVisualTop{ display:flex; gap:8px; flex-wrap:wrap; position:relative; z-index:1; }
.heroVisualMain{ margin-top: 14px; display:grid; gap: 10px; position:relative; z-index:1; }
.metric{
  padding: 12px 12px;
  border-radius: 14px;
  border:1px solid rgba(255,255,255,.08);
  background: rgba(0,0,0,.18);
}
.metricLabel{ color: var(--muted); font-size: 12px; margin-bottom: 6px; }
.metricValue{ font-weight: 800; letter-spacing: -0.2px; }

/* Stats row */
.statsRow{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.statCard{
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(18,21,36,.55);
  padding: 16px;
  min-height: 140px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap: 6px;
}
.statIcon{
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display:grid;
  place-items:center;
  background: rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  margin-bottom: 8px;
  font-size: 22px;
}
.statBig{ font-size: 24px; font-weight: 900; letter-spacing:-0.02em; }
.statSmall{ color: rgba(169,175,199,.95); }

/* Section headings */
.sectionHead{
  text-align:center;
  margin-top: 24px;
  margin-bottom: 16px;
}
.sectionTitle{
  font-size: clamp(26px, 3.2vw, 42px);
  margin: 0 0 10px;
  letter-spacing: -0.6px;
}
.sectionSub{
  margin: 0 auto;
  max-width: 72ch;
  color: rgba(169,175,199,.95);
  line-height: 1.65;
}

/* Skills grid */
.skillsSection{ margin-top: 18px; padding: 10px 6px 6px; }
.skillsGrid{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.skillCard{
  border-radius: 18px;
  padding: 18px 18px 16px;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(18,21,36,.55);
  min-height: 190px;
}
.skillIcon{
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display:grid;
  place-items:center;
  background: rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  margin-bottom: 12px;
  font-size: 22px;
}
.skillCard h3{ margin:0 0 8px; font-size: 18px; letter-spacing:-0.02em; }
.skillCard p{ margin:0; color: rgba(169,175,199,.95); line-height:1.6; }
.skillCard.isActive{
  border-color: rgba(143,160,255,.45);
  box-shadow: 0 0 0 1px rgba(143,160,255,.25), 0 20px 60px rgba(143,160,255,.12);
}

/* Projects */
.panelHead{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.panelHead h2{ margin:0; font-size: 30px; letter-spacing:-0.03em; }
.panelHead p{ margin:0; color: rgba(169,175,199,.95); max-width: 70ch; }

.projectsGrid{
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 12px;
}
.projectCard{
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(18,21,36,.55);
  padding: 16px;
  min-height: 240px;
}
.projTop{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom: 10px; }
.projectCard h3{ margin: 0 0 8px; font-size: 18px; letter-spacing:-0.02em; }
.projectCard p{ margin: 0 0 10px; color: rgba(169,175,199,.95); line-height:1.6; }
.projList{ margin:0; padding-left: 18px; color: rgba(242,244,255,.86); }
.projList li{ margin: 7px 0; }

.callout{
  margin-top: 14px;
  display:flex;
  gap: 14px;
  align-items:center;
  justify-content:space-between;
  padding: 16px;
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.10);
  background: linear-gradient(135deg, rgba(154,165,255,.08), rgba(61,235,190,.06));
}
.callout h3{ margin:0 0 6px; }
.callout p{ margin:0; color: rgba(169,175,199,.95); line-height:1.6; }

/* FAQ */
.faqSection{ margin-top: 26px; padding: 18px 6px 4px; }
.faqTitle{
  text-align:center;
  font-size: clamp(26px, 3.2vw, 40px);
  letter-spacing: -0.5px;
  margin: 10px 0 18px;
}
.faqList{
  max-width: 980px;
  margin: 0 auto;
  display:flex;
  flex-direction:column;
  gap: 12px;
}
.faqItem{
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(18,21,36,.55);
  overflow:hidden;
}
.faqQ{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 14px;
  padding: 18px 18px;
  background: transparent;
  border: none;
  color: rgba(242,244,255,.92);
  cursor: pointer;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: -0.2px;
  text-align:left;
}
.faqQ:hover{ background: rgba(255,255,255,.03); }
.chev{
  width: 18px;
  height: 18px;
  border-right: 2px solid rgba(242,244,255,.75);
  border-bottom: 2px solid rgba(242,244,255,.75);
  transform: rotate(45deg);
  transition: transform .25s ease, opacity .25s ease;
  opacity: .85;
}
.faqItem.open .chev{ transform: rotate(-135deg); opacity: 1; }
.faqA{
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s ease;
  border-top: 1px solid rgba(255,255,255,.08);
}
.faqA p{
  margin: 0;
  padding: 14px 18px 18px;
  color: rgba(169,175,199,.95);
  line-height: 1.65;
  font-size: 14.5px;
}

/* Contact */
.contactBox{
  max-width: 780px;
  padding: 16px;
  border-radius: 18px;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(18,21,36,.55);
  position:relative;
}
.contactRow{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,.08);
}
.contactRow:last-child{ border-bottom:none; }
.label{ color: var(--muted); font-size: 12px; margin-bottom: 6px; }
.link{ color: rgba(242,244,255,.92); text-decoration: underline; text-underline-offset: 4px; }
.links{ display:flex; gap: 12px; flex-wrap:wrap; }
.hint{ color: var(--muted); font-size: 13px; margin-top: 6px; }
.toast{
  position:absolute;
  right: 14px;
  bottom: 14px;
  padding: 10px 12px;
  border-radius: 14px;
  border:1px solid rgba(255,255,255,.12);
  background: rgba(0,0,0,.55);
  opacity:0;
  transform: translateY(6px);
  transition: opacity .18s ease, transform .18s ease;
  pointer-events:none;
}
.toast.show{ opacity:1; transform: translateY(0); }

/* Footer */
.footer{
  max-width:1180px;
  margin: 14px auto 26px;
  padding: 0 18px;
  color: rgba(169,175,199,.9);
  display:flex;
  gap:10px;
  justify-content:center;
  align-items:center;
  font-size: 13px;
}
.sep{ opacity:.45; }

/* Reveal animations */
.reveal{ opacity: 0; transform: translateY(10px); }
.reveal.in{
  opacity: 1;
  transform: translateY(0);
  transition: opacity .55s ease, transform .55s ease;
}
.delay-1{ transition-delay: .08s !important; }
.delay-2{ transition-delay: .14s !important; }
.delay-3{ transition-delay: .20s !important; }
.delay-4{ transition-delay: .26s !important; }

.panel.enter{ animation: panelIn .38s ease both; }
@keyframes panelIn{
  from{ opacity:0; transform: translateY(10px) scale(.985); }
  to{ opacity:1; transform: translateY(0) scale(1); }
}

/* Glow hover (mouse-follow) */
.glow{
  position: relative;
  overflow: hidden;
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
}
.glow::before{
  content:"";
  position:absolute;
  inset:-1px;
  border-radius: inherit;
  background: radial-gradient(600px circle at var(--x,50%) var(--y,50%),
    rgba(120,130,255,.35),
    rgba(80,200,255,.15),
    transparent 70%);
  opacity:0;
  transition: opacity .35s ease;
  pointer-events:none;
}
.glow:hover{
  transform: translateY(-6px) scale(1.02);
  box-shadow:
    0 0 0 1px rgba(140,160,255,.35),
    0 30px 80px rgba(90,120,255,.28);
  border-color: rgba(140,160,255,.28);
}
.glow:hover::before{ opacity:1; }

/* Responsive */
@media (max-width: 1020px){
  .statsRow{ grid-template-columns: 1fr; }
  .skillsGrid{ grid-template-columns: 1fr; }
  .projectsGrid{ grid-template-columns: 1fr; }
  .panelHead{ flex-direction:column; align-items:flex-start; }
}

@media (max-width: 860px){
  .nav{
    position: fixed;
    top: 66px;
    right: 14px;
    left: 14px;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.10);
    background: rgba(11,12,16,.90);
    backdrop-filter: blur(14px);
    box-shadow: var(--shadow);
    display:none;
    flex-wrap:wrap;
    gap: 10px;
    justify-content:flex-start;
  }
  .nav.open{ display:flex; }
  .burger{ display:block; }
}
