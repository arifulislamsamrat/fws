// Shared chrome: nav, footer, theme, floating WhatsApp dock w/ chat preview, corner radial menu (mobile).
(function () {
  const WHATSAPP_NUM = '+8801610572594';
  const WHATSAPP_E164 = '8801610572594';
  const FACEBOOK_HREF = 'https://www.facebook.com/fajrwebservice';
  const DEFAULT_WA_MSG = "Hi Fajr Web Services 👋 I'd like to know more about your services.";

  const waLink = (msg) => `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(msg || DEFAULT_WA_MSG)}`;

  // --- Authentic WhatsApp glyph (single path, official-look) ---
  const WA_SVG = `<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.49-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.02 1.318-1.02 2.264v.114c.014.83.31 1.66.79 2.49.95 1.66 2.378 3.1 4.024 4.123.835.5 1.768.798 2.674 1.057.331.1.673.158 1.013.158.659 0 1.323-.07 1.823-.493.273-.214.473-.572.473-1.005 0-.072-.013-.143-.043-.215-.072-.16-.36-.272-.53-.358-.215-.1-1.547-.715-1.747-.715zm-2.91 7.063h-.014a9.21 9.21 0 0 1-4.683-1.286l-.336-.2-3.485.913.928-3.4-.215-.345a9.187 9.187 0 0 1-1.41-4.916c0-5.092 4.13-9.222 9.218-9.222a9.16 9.16 0 0 1 6.518 2.704 9.158 9.158 0 0 1 2.7 6.523c-.005 5.09-4.135 9.23-9.22 9.23zm7.85-17.075a11.057 11.057 0 0 0-7.85-3.252C9.06 3.94 4.087 8.91 4.084 15.022c0 1.953.51 3.86 1.482 5.54L4 26.62l6.197-1.625a11.094 11.094 0 0 0 5.297 1.348h.005c6.115 0 11.092-4.97 11.094-11.083 0-2.964-1.152-5.748-3.247-7.84z"/></svg>`;

  const FB_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2V8h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z"/></svg>`;

  // ---- Theme ----
  const stored = localStorage.getItem('fws-theme') || 'light';
  document.documentElement.setAttribute('data-theme', stored);
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('fws-theme', t);
    updateToggle();
  }
  function updateToggle() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const t = document.documentElement.getAttribute('data-theme');
      btn.innerHTML = t === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }

  // ---- Nav ----
  function makeNav(active) {
    const cloudActive = active === 'cloud' ? 'active' : '';
    return `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo" aria-label="Fajr Web Services home">
          <img src="assets/logo-trim.png" alt="Fajr Web Services" class="nav-logo-img light">
          <img src="assets/logo-white.png" alt="" class="nav-logo-img dark" aria-hidden="true">
        </a>

        <ul class="nav-links">
          <li class="has-mega">
            <button class="nav-link-btn ${cloudActive}" aria-haspopup="true" aria-expanded="false">
              Cloud
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="mega" role="menu">
              <div class="mega-grid">
                <a class="mega-item" href="https://cloud.fajrwebservices.com" target="_blank" rel="noopener">
                  <div class="mi-ic" style="--c:#1F8FD6"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg></div>
                  <div><strong>Domains <span class="ext">↗</span></strong><p>Register, transfer, and manage 200+ TLDs.</p><span class="mi-meta">cloud.fajrwebservices.com</span></div>
                </a>
                <a class="mega-item" href="https://cloud.fajrwebservices.com" target="_blank" rel="noopener">
                  <div class="mi-ic" style="--c:#0B5FA5"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/></svg></div>
                  <div><strong>Hosting <span class="ext">↗</span></strong><p>Shared, VPS, dedicated and bare-metal plans.</p><span class="mi-meta">cloud.fajrwebservices.com</span></div>
                </a>
                <a class="mega-item" href="services.html#products">
                  <div class="mi-ic" style="--c:#10B981"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></svg></div>
                  <div><strong>Business Support</strong><p>Startup bundle, business pack, custom builds &amp; AI engineering.</p><span class="mi-meta">From ৳2,500/yr</span></div>
                </a>
              </div>
              <div class="mega-foot">
                <span>Need help choosing? Talk to a sales engineer.</span>
                <a href="contact.html" class="mega-cta">Contact us →</a>
              </div>
            </div>
          </li>
          <li><a href="services.html" class="${active==='services'?'active':''}">Services</a></li>
          <li><a href="about.html" class="${active==='about'?'active':''}">About</a></li>
          <li><a href="contact.html" class="${active==='contact'?'active':''}">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <button class="theme-toggle" aria-label="Toggle theme"></button>
          <a href="login.html" class="btn btn-ghost nav-btn">Sign in</a>
          <a href="login.html?tab=register" class="btn btn-primary nav-btn">Get started</a>
        </div>
      </div>
    </nav>`;
  }

  // ---- Footer ----
  function makeFooter() {
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="footer-logo" aria-label="Fajr Web Services home">
              <img src="assets/logo-white.png" alt="Fajr Web Services">
            </a>
            <p>Cloud, hosting, AI engineering and DevOps — engineered to scale, priced to start.</p>
            <p class="footer-loc">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:-2px;margin-right:6px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Mymensingh, Bangladesh
            </p>
          </div>
          <div>
            <h4>Cloud</h4>
            <ul>
              <li><a href="https://cloud.fajrwebservices.com" target="_blank" rel="noopener">Domains ↗</a></li>
              <li><a href="https://cloud.fajrwebservices.com" target="_blank" rel="noopener">Hosting ↗</a></li>
              <li><a href="services.html#bare-metal">Bare Metal</a></li>
              <li><a href="services.html#kubernetes">Kubernetes</a></li>
            </ul>
          </div>
          <div>
            <h4>Solutions</h4>
            <ul>
              <li><a href="services.html#devops">DevOps</a></li>
              <li><a href="services.html#ai">AI Integration</a></li>
              <li><a href="services.html#agents">Custom Agents</a></li>
              <li><a href="services.html#startup">Startup Bundle</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul>
              <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${WHATSAPP_NUM}</a></li>
              <li><a href="${FACEBOOK_HREF}" target="_blank" rel="noopener">Facebook</a></li>
              <li><a href="mailto:hello@fajrwebservices.com">hello@fajrwebservices.com</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© 2026 Fajr Web Services. All rights reserved.</div>
          <div class="footer-social">
            <a href="${FACEBOOK_HREF}" target="_blank" rel="noopener" aria-label="Facebook">${FB_SVG}</a>
            <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp" class="fs-wa">${WA_SVG}</a>
          </div>
        </div>
      </div>
    </footer>`;
  }

  // ---- Floating dock + WhatsApp chat preview ----
  function makeFloatingDock() {
    return `
    <div class="float-dock" role="complementary" aria-label="Quick contact">
      <button class="fd-btn fd-wa" aria-label="Chat on WhatsApp" data-action="open-wa">
        <span class="fd-icon wa-icon">${WA_SVG}</span>
        <span class="fd-label">WhatsApp us</span>
        <span class="fd-pulse"></span>
      </button>
      <a href="${FACEBOOK_HREF}" target="_blank" rel="noopener" class="fd-btn fd-fb" aria-label="Message on Facebook">
        <span class="fd-icon">${FB_SVG}</span>
        <span class="fd-label">Facebook</span>
      </a>
    </div>

    <div class="wa-chat" hidden role="dialog" aria-modal="false" aria-label="WhatsApp chat preview">
      <div class="wa-head">
        <div class="wa-avatar">
          <span class="wa-online"></span>
          F
        </div>
        <div class="wa-meta">
          <strong>Fajr Web Services</strong>
          <span>Typically replies in minutes</span>
        </div>
        <button class="wa-close" aria-label="Close">×</button>
      </div>
      <div class="wa-body">
        <div class="wa-msg wa-them">
          <p>Hi 👋 thanks for reaching out!</p>
          <p>Tell us what you're looking for and we'll get right back to you.</p>
          <span class="wa-time">now</span>
        </div>
      </div>
      <form class="wa-form" novalidate>
        <textarea class="wa-input" rows="2" placeholder="Type your message..." aria-label="Your message"></textarea>
        <button type="submit" class="wa-send" aria-label="Send to WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
        </button>
      </form>
      <div class="wa-foot">Continue on WhatsApp · ${WHATSAPP_NUM}</div>
    </div>`;
  }

  // ---- Corner radial menu (replaces hamburger on mobile) ----
  function makeRadialMenu(active) {
    const items = [
      { href: 'index.html', label: 'Home', id: 'home', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></svg>' },
      { href: 'services.html', label: 'Services', id: 'services', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { href: 'https://cloud.fajrwebservices.com', label: 'Cloud', id: 'cloud', ext: true, svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10a5 5 0 0 0-9.6-1.5A4 4 0 1 0 7 17h11a4 4 0 0 0 0-7z"/></svg>' },
      { href: 'about.html', label: 'About', id: 'about', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>' },
      { href: 'contact.html', label: 'Contact', id: 'contact', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>' },
      { href: 'login.html', label: 'Sign in', id: 'login', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4v18h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>' }
    ];
    return `
    <div class="radial-nav" data-open="false">
      <div class="rn-items" aria-hidden="true">
        ${items.map((it, i) => `
          <a href="${it.href}" ${it.ext?'target="_blank" rel="noopener"':''} class="rn-item ${active===it.id?'active':''}" style="--i:${i};--n:${items.length}" aria-label="${it.label}">
            <span class="rn-ic">${it.svg}</span>
            <span class="rn-lb">${it.label}</span>
          </a>`).join('')}
      </div>
      <button class="rn-fab" aria-label="Open menu" aria-expanded="false">
        <span class="rn-bars">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>`;
  }

  // ---- Mega menu logic ----
  function bindMega() {
    const wrap = document.querySelector('.has-mega');
    if (!wrap) return;
    const btn = wrap.querySelector('.nav-link-btn');
    let openTimer, closeTimer;
    const open = () => { clearTimeout(closeTimer); wrap.classList.add('open'); btn.setAttribute('aria-expanded','true'); };
    const close = () => { wrap.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
    wrap.addEventListener('mouseenter', () => { clearTimeout(closeTimer); openTimer = setTimeout(open, 60); });
    wrap.addEventListener('mouseleave', () => { clearTimeout(openTimer); closeTimer = setTimeout(close, 120); });
    btn.addEventListener('click', e => { e.preventDefault(); wrap.classList.contains('open') ? close() : open(); });
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // ---- WhatsApp chat preview logic ----
  function bindWA() {
    const chat = document.querySelector('.wa-chat');
    if (!chat) return;
    const closeBtn = chat.querySelector('.wa-close');
    const form = chat.querySelector('.wa-form');
    const input = chat.querySelector('.wa-input');
    const open = (prefill) => {
      chat.removeAttribute('hidden');
      requestAnimationFrame(() => chat.classList.add('open'));
      if (prefill) input.value = prefill;
      setTimeout(() => input.focus(), 250);
    };
    const close = () => {
      chat.classList.remove('open');
      setTimeout(() => chat.setAttribute('hidden',''), 220);
    };
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-action="open-wa"], [data-wa-prefill]');
      if (trigger) {
        e.preventDefault();
        open(trigger.getAttribute('data-wa-prefill') || '');
      }
    });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !chat.hasAttribute('hidden')) close(); });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = input.value.trim() || DEFAULT_WA_MSG;
      window.open(waLink(msg), '_blank', 'noopener');
      // Add user bubble for satisfaction, then close
      const body = chat.querySelector('.wa-body');
      const bubble = document.createElement('div');
      bubble.className = 'wa-msg wa-me';
      bubble.innerHTML = `<p></p><span class="wa-time">just now ✓✓</span>`;
      bubble.querySelector('p').textContent = msg;
      body.appendChild(bubble);
      body.scrollTop = body.scrollHeight;
      input.value = '';
      setTimeout(close, 1200);
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });
  }

  // ---- Radial menu logic ----
  function bindRadial() {
    const rn = document.querySelector('.radial-nav');
    if (!rn) return;
    const fab = rn.querySelector('.rn-fab');
    const setOpen = (state) => {
      rn.setAttribute('data-open', state ? 'true' : 'false');
      fab.setAttribute('aria-expanded', state ? 'true' : 'false');
      rn.querySelector('.rn-items').setAttribute('aria-hidden', state ? 'false' : 'true');
    };
    fab.addEventListener('click', () => {
      setOpen(rn.getAttribute('data-open') !== 'true');
    });
    document.addEventListener('click', e => {
      if (!rn.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  // ---- Inject ----
  function inject() {
    const navMount = document.querySelector('[data-nav]');
    const active = navMount ? navMount.getAttribute('data-nav') : '';
    if (navMount) navMount.outerHTML = makeNav(active);
    const footerMount = document.querySelector('[data-footer]');
    if (footerMount) footerMount.outerHTML = makeFooter();

    if (!document.querySelector('.float-dock')) {
      const wrap = document.createElement('div');
      wrap.innerHTML = makeFloatingDock();
      while (wrap.firstElementChild) document.body.appendChild(wrap.firstElementChild);
    }
    if (!document.querySelector('.radial-nav')) {
      const wrap = document.createElement('div');
      wrap.innerHTML = makeRadialMenu(active);
      document.body.appendChild(wrap.firstElementChild);
    }

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        setTheme(cur === 'dark' ? 'light' : 'dark');
      });
    });
    updateToggle();
    bindMega();
    bindWA();
    bindRadial();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
