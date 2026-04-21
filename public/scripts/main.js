(function () {
  'use strict';

  // -------- Depth reader accordion --------
  document.querySelectorAll('[data-dr-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tier = btn.closest('[data-dr-tier]');
      if (!tier) return;
      const open = tier.getAttribute('data-open') === 'true';
      tier.setAttribute('data-open', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  // -------- Personal impact: dropdowns + verdict swap --------
  const piRoot = document.querySelector('[data-personal-impact]');
  if (piRoot) {
    const selects = piRoot.querySelectorAll('[data-pi-sel]');
    const verdicts = piRoot.querySelectorAll('[data-verdict]');
    const fallback = piRoot.querySelector('[data-verdict-fallback]');

    function closeAll(except) {
      selects.forEach((sel) => {
        if (sel === except) return;
        sel.setAttribute('data-open', 'false');
        const trig = sel.querySelector('[data-pi-trigger]');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
    }

    function updateVerdict() {
      const vintageSel = piRoot.querySelector('[data-pi-sel="vintage"]');
      const addrSel = piRoot.querySelector('[data-pi-sel="addr"]');
      if (!vintageSel || !addrSel) return;
      const v = vintageSel.getAttribute('data-value');
      const a = addrSel.getAttribute('data-value');

      let matched = false;
      verdicts.forEach((el) => {
        const ok = el.getAttribute('data-vintage') === v && el.getAttribute('data-addr') === a;
        el.setAttribute('data-active', ok ? 'true' : 'false');
        if (ok) matched = true;
      });
      if (fallback) fallback.setAttribute('data-active', matched ? 'false' : 'true');
    }

    selects.forEach((sel) => {
      const trigger = sel.querySelector('[data-pi-trigger]');
      const labelEl = trigger ? trigger.querySelector('[data-pi-label]') : null;
      const opts = sel.querySelectorAll('[data-pi-opt]');

      trigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = sel.getAttribute('data-open') === 'true';
        closeAll(sel);
        sel.setAttribute('data-open', open ? 'false' : 'true');
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
      });

      opts.forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = opt.getAttribute('data-pi-opt');
          const label = opt.getAttribute('data-pi-label');
          sel.setAttribute('data-value', value);
          if (labelEl && label) labelEl.textContent = label;
          opts.forEach((o) =>
            o.setAttribute('aria-selected', o === opt ? 'true' : 'false'),
          );
          sel.setAttribute('data-open', 'false');
          trigger?.setAttribute('aria-expanded', 'false');
          updateVerdict();
        });
      });
    });

    document.addEventListener('mousedown', (e) => {
      const inside = e.target.closest('[data-pi-sel]');
      if (!inside) closeAll(null);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll(null);
    });

    updateVerdict();
  }

  // -------- Footer back-to-top --------
  const backToTop = document.querySelector('[data-back-to-top]');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
