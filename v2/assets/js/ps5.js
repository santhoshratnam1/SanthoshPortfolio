/* =======================================================================
   SANTHOSH OS — a PS5-style portfolio shell (vanilla JS, no deps)
   Boot -> Profile select -> Home (Games/Media) -> Launch game -> close
   Trophies = Awards · Profile = About · Settings = Contact
   ======================================================================= */
(function () {
  'use strict';

  // ---- DATA -----------------------------------------------------------
  var IMG = '../assets/portfolio-images/';
  var PROJECTS = [
    {
      title: 'Mechanical Fury', kicker: 'Level Designer · Unreal Engine 5',
      tags: ['Level Design', 'UE5', 'Movement Shooter'],
      grad: ['#dc2626', '#ea580c'], img: IMG + 'mechanical-fury',
      video: 'TdGhl2Gea_E', case: '../portfolio/mechanical-fury.html',
      stats: [['12', 'Arenas'], ['20+', 'Encounters'], ['40%', 'Faster Workflow']],
      blurb: 'Fast-paced movement shooter (Steam, team of 6). Designed 12 combat arenas and 20+ enemy encounters from blockout to first playable — verticality-focused layouts, three-phase encounter progression, and procedural tools that cut blockout time ~40%.'
    },
    {
      title: 'Showreel', kicker: 'Mini Projects · Reel',
      tags: ['Mini Projects', 'UE5', 'Unity'],
      grad: ['#e63946', '#8b1e2b'], img: 'https://i.ytimg.com/vi/yg3L5Djh7TY/hqdefault.jpg',
      video: 'yg3L5Djh7TY', case: '../portfolio/showreel.html', stats: [],
      blurb: 'A short reel of mini projects, prototypes, and experiments — gameplay prototypes, level blockouts, mechanic tests, and VFX studies across Unreal Engine and Unity.'
    },
    {
      title: 'Frenemies', kicker: 'Game Designer · Unity',
      tags: ['Co-op', 'Puzzle', 'Unity'],
      grad: ['#FFEB3B', '#f59e0b'], img: IMG + 'frenemies',
      video: '56J5k_aIvAk', case: '../portfolio/frenemies.html', stats: [],
      blurb: '2.5D local co-op puzzle game for three players — designed cooperative mechanics, balance, and VFX from concept to final build.'
    },
    {
      title: 'Quest for Valor', kicker: 'Solo Developer · Unreal Engine 5',
      tags: ['Adventure', 'UE5', 'Blueprints'],
      grad: ['#f59e0b', '#d97706'], img: IMG + 'quest-of-valor',
      video: 'OJANps3CArI', case: '../portfolio/quest-for-valor.html', stats: [],
      blurb: '3D single-player adventure — three environments, 7 gameplay beats, full Blueprint mechanics, and a multi-phase boss encounter, taken from blockout to polished build.'
    },
    {
      title: 'Ragball', kicker: 'Game / Level Designer · Unity',
      tags: ['Arena', 'Unity', 'Game Jam'],
      grad: ['#10b981', '#047857'], img: IMG + 'ragball',
      video: 'vf67VXSnb-E', case: '../portfolio/ragball.html', stats: [],
      blurb: 'Party arena action built for a game jam — arena design, gameplay flow, and a custom "squash & stretch" character controller. British Columbia Game Jam 2022, 1st place.'
    },
    {
      title: 'Fresh Color Horror', kicker: 'Level Designer · Unreal Engine 4',
      tags: ['Horror', 'UE4', 'VFX'],
      grad: ['#ec4899', '#9d174d'], img: IMG + 'fleshcolorhorror',
      video: 'mQvzlEEW-CA', case: '../portfolio/fresh-color-horror.html', stats: [],
      blurb: 'A complete single-player horror level — greybox to polish, scripted scare sequences, pacing curves for tension and release, and custom Niagara VFX.'
    },
    {
      title: 'Nekokuza', kicker: 'Game Design Document',
      tags: ['Action RPG', 'GDD'],
      grad: ['#ff3b30', '#ff2d55'], img: IMG + 'nekokuza',
      video: null, case: '../portfolio/nekokuza.html', stats: [],
      blurb: 'Action-RPG game design document — systems, progression, and combat design laid out as a full GDD.'
    },
    {
      title: 'UX/UI Design', kicker: 'UX / UI Documentation',
      tags: ['UX', 'UI'],
      grad: ['#007AFF', '#5856D6'], img: IMG + 'ui_ux',
      video: null, case: '../portfolio/ux-ui.html', stats: [],
      blurb: 'User experience and interface design documentation — flows, wireframes, and interface systems.'
    },
    {
      title: 'OverLord', kicker: 'Strategy Game Design Document',
      tags: ['Strategy', 'GDD'],
      grad: ['#3a3a3c', '#1d1d1f'], img: IMG + 'overlord',
      video: null, case: '../portfolio/overlord.html', stats: [],
      blurb: 'Strategy game design document — factions, economy, and systems design.'
    },
    {
      title: 'Journey 2095', kicker: 'Sci-Fi Game Design Document',
      tags: ['Sci-Fi', 'GDD'],
      grad: ['#ffd60a', '#ff9f0a'], img: IMG + 'journey',
      video: null, case: '../portfolio/journey2095.html', stats: [],
      blurb: 'Sci-fi adventure game design document — world, narrative, and gameplay systems.'
    },
    {
      title: 'Nekomancer!', kicker: 'Narrative Document',
      tags: ['Narrative'],
      grad: ['#8b2635', '#6d2932'], img: IMG + 'nekomancer',
      video: null, case: '../portfolio/nekomancer.html', stats: [],
      blurb: 'Magic-cat adventure narrative document — characters, story beats, and world.'
    }
  ];

  var TROPHIES = [
    { tier: 'gold', name: 'British Columbia Game Jam', year: '2022', note: '1st Place' },
    { tier: 'gold', name: 'Best Narrative Designer', year: '2022', note: 'Winner' },
    { tier: 'silver', name: 'Best Final Project Award', year: '2022', note: 'Vancouver Film School' }
  ];

  var SPECIAL = [
    ['Arena & combat design', 'balanced, competitive multiplayer spaces'],
    ['Fast-paced action', 'high-speed gameplay tuned for player skill'],
    ['Level flow & architecture', 'readable layouts that guide movement'],
    ['Systems & tool design', 'in-engine tools that speed up the work']
  ];
  var SKILLS = ['Unreal Engine', 'Unity', 'Blueprints', 'C#', 'Visual Scripting', 'Shader Graph',
    'HLSL', 'Niagara VFX', 'Level Design', 'Arena Design', 'Technical Design', 'Prototyping', 'UI/UX'];

  // ---- HELPERS --------------------------------------------------------
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function grad(p) { return 'linear-gradient(135deg,' + p.grad[0] + ' 0%,' + p.grad[1] + ' 100%)'; }
  function imgUrl(p) { return p.img.indexOf('http') === 0 ? p.img + ')' : p.img + '.png)'; }
  function reduceMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  var selected = 0;

  // ---- CLOCK ----------------------------------------------------------
  function tick() {
    var d = new Date();
    var hh = d.getHours(), mm = d.getMinutes();
    var ap = hh >= 12 ? 'PM' : 'AM'; var h12 = ((hh + 11) % 12) + 1;
    var t = h12 + ':' + (mm < 10 ? '0' + mm : mm) + ' ' + ap;
    $$('[data-clock]').forEach(function (n) { n.textContent = t; });
    var full = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) + '  ·  ' + t;
    $$('[data-clock-full]').forEach(function (n) { n.textContent = full; });
  }

  // ---- RENDER RAIL + HERO --------------------------------------------
  function renderRail() {
    var rail = $('#rail');
    PROJECTS.forEach(function (p, i) {
      var li = el('li', 'tile' + (i === 0 ? ' is-sel' : ''));
      li.setAttribute('role', 'option');
      li.setAttribute('tabindex', '0');
      li.style.setProperty('--g', grad(p));
      li.innerHTML =
        '<div class="tile-art" style="background-image:' + 'url(' + imgUrl(p) + ',' + grad(p) + '"></div>' +
        '<div class="tile-meta"><span class="tile-name">' + p.title + '</span>' +
        '<span class="tile-kick">' + p.kicker.split(' · ')[0].split(' · ')[0] + '</span></div>' +
        (p.video ? '<span class="tile-badge">▶</span>' : '');
      li.addEventListener('click', function () { select(i); });
      li.addEventListener('mouseenter', function () { select(i, true); });
      li.addEventListener('focus', function () { select(i, true); });
      li.addEventListener('dblclick', function () { launch(i); });
      rail.appendChild(li);
    });
  }

  function select(i, soft) {
    selected = i;
    var p = PROJECTS[i];
    $$('#rail .tile').forEach(function (t, k) { t.classList.toggle('is-sel', k === i); });
    var sel = $$('#rail .tile')[i];
    if (sel && !soft) sel.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    else if (sel) { var r = $('#rail'); r.scrollTo({ left: sel.offsetLeft - r.clientWidth / 2 + sel.clientWidth / 2, behavior: reduceMotion() ? 'auto' : 'smooth' }); }

    var bg = $('#hero-bg');
    bg.style.backgroundImage = 'url(' + imgUrl(p) + ',' + grad(p);
    $('#hero-kicker').textContent = p.kicker;
    $('#hero-title').textContent = p.title;
    $('#hero-desc').textContent = p.blurb;
    $('#hero-tags').innerHTML = p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    $('#hero-stats').innerHTML = (p.stats || []).map(function (s) {
      return '<div class="stat"><span class="stat-v">' + s[0] + '</span><span class="stat-l">' + s[1] + '</span></div>';
    }).join('');
    $('#btn-case').href = p.case;
    $('#hero').style.setProperty('--accent', p.grad[0]);
  }

  // ---- LAUNCH / CLOSE -------------------------------------------------
  function launch(i) {
    var p = PROJECTS[typeof i === 'number' ? i : selected];
    $('#game-kicker').textContent = p.kicker;
    $('#game-title').textContent = p.title;
    $('#game-tags').innerHTML = p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    $('#game-desc').textContent = p.blurb;
    $('#game-bg').style.backgroundImage = 'url(' + imgUrl(p) + ',' + grad(p);
    $('#game').style.setProperty('--accent', p.grad[0]);
    $('#game-case').href = p.case;
    var media = $('#game-media');
    if (p.video) {
      media.innerHTML = '<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/' + p.video +
        '?rel=0&autoplay=1" title="' + p.title + '" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe></div>';
    } else {
      media.innerHTML = '<div class="vid vid-art" style="background-image:' + 'url(' + imgUrl(p) + ',' + grad(p) +
        '"><span class="vid-note">Full write-up, diagrams &amp; visuals in the case study →</span></div>';
    }
    openOverlay('game');
  }

  // ---- OVERLAYS / SCREENS --------------------------------------------
  function openOverlay(id) {
    var o = $('#' + id);
    o.classList.add('is-open'); o.setAttribute('aria-hidden', 'false');
    document.body.classList.add('has-overlay');
    setHint(id === 'game' ? '✕ / Esc  Close      ◯  Back to library' : '✕ / Esc  Close');
  }
  function closeOverlays() {
    $$('.overlay.is-open').forEach(function (o) {
      o.classList.remove('is-open'); o.setAttribute('aria-hidden', 'true');
    });
    // stop any playing iframe by clearing its src
    var gm = $('#game-media'); if (gm) gm.innerHTML = '';
    document.body.classList.remove('has-overlay');
    setHint(defaultHint);
  }

  function gotoScreen(id) {
    $$('.screen').forEach(function (s) { s.classList.remove('is-active'); s.setAttribute('aria-hidden', 'true'); });
    var s = $('#' + id); s.classList.add('is-active'); s.setAttribute('aria-hidden', 'false');
  }

  // ---- TABS -----------------------------------------------------------
  function switchTab(name) {
    $$('.tab').forEach(function (t) { t.classList.toggle('is-active', t.dataset.tab === name); });
    $$('.tabpane').forEach(function (p) { p.classList.toggle('is-active', p.dataset.pane === name); });
    var reel = $('#reel');
    if (name === 'media') { if (reel.src === 'about:blank') reel.src = reel.dataset.src; setHint('Esc  Home'); }
    else { setHint(defaultHint); }
  }

  // ---- HINT BAR -------------------------------------------------------
  var defaultHint = '◄ ►  Navigate     Enter  Launch     T  Trophies     P  Profile     S  Settings';
  function setHint(t) { var h = $('#hintbar'); if (h) h.textContent = t; }

  // ---- BUILD STATIC LISTS --------------------------------------------
  function buildLists() {
    $('#trophy-list').innerHTML = TROPHIES.map(function (t) {
      return '<li class="trophy trophy-' + t.tier + '">' +
        '<span class="trophy-ic">🏆</span>' +
        '<span class="trophy-meta"><span class="trophy-name">' + t.name + '</span>' +
        '<span class="trophy-note">' + t.note + ' · ' + t.year + '</span></span>' +
        '<span class="trophy-tier">' + t.tier + '</span></li>';
    }).join('');
    $('#spec-list').innerHTML = SPECIAL.map(function (s) {
      return '<li><strong>' + s[0] + '</strong> — ' + s[1] + '</li>';
    }).join('');
    $('#skill-chips').innerHTML = SKILLS.map(function (s) { return '<span class="chip">' + s + '</span>'; }).join('');
  }

  // ---- KEYBOARD -------------------------------------------------------
  function onKey(e) {
    if (!$('#home').classList.contains('is-active')) {
      if (e.key === 'Enter' && $('#profile-select').classList.contains('is-active')) enterOS();
      return;
    }
    if (document.body.classList.contains('has-overlay')) {
      if (e.key === 'Escape') closeOverlays();
      return;
    }
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); select(Math.min(selected + 1, PROJECTS.length - 1)); break;
      case 'ArrowLeft': e.preventDefault(); select(Math.max(selected - 1, 0)); break;
      case 'Enter': launch(selected); break;
      case 't': case 'T': openOverlay('trophies'); break;
      case 'p': case 'P': openOverlay('profile'); break;
      case 's': case 'S': openOverlay('settings'); break;
      case 'Escape': switchTab('games'); break;
    }
  }

  // ---- BOOT FLOW ------------------------------------------------------
  function enterOS() {
    gotoScreen('home');
    setHint(defaultHint);
    select(0);
  }

  function init() {
    renderRail(); buildLists(); tick(); setInterval(tick, 1000 * 20);
    select(0);

    // boot -> profile select
    var toProfile = function () { gotoScreen('profile-select'); };
    if (reduceMotion()) { toProfile(); }
    else { setTimeout(toProfile, 2000); }
    $('#boot').addEventListener('click', toProfile);

    $('#enter-btn').addEventListener('click', enterOS);

    $$('.tab').forEach(function (t) { t.addEventListener('click', function () { switchTab(t.dataset.tab); }); });
    $('#btn-launch').addEventListener('click', function () { launch(selected); });
    $$('[data-open]').forEach(function (b) { b.addEventListener('click', function () { openOverlay(b.dataset.open); }); });
    $$('[data-close-overlay]').forEach(function (b) { b.addEventListener('click', closeOverlays); });
    // click on overlay backdrop closes (but not when clicking content)
    $$('.overlay').forEach(function (o) {
      o.addEventListener('click', function (e) { if (e.target === o) closeOverlays(); });
    });
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
