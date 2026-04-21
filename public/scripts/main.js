(function () {
  'use strict';

  // Depth toggle tabs
  const tabs = document.querySelectorAll('[data-depth-tab]');
  const panels = document.querySelectorAll('[data-tab-panel]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = tab.dataset.index;

      tabs.forEach((t, i) => {
        const active = i.toString() === index;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.className = active
          ? 'px-4 py-2 rounded-md text-sm font-medium border transition-colors bg-gray-900 text-white border-gray-900'
          : 'px-4 py-2 rounded-md text-sm font-medium border transition-colors bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800';
      });

      panels.forEach((p, i) => {
        p.classList.toggle('active', i.toString() === index);
      });
    });
  });

  // Impact dropdowns
  const walletSelect = document.getElementById('wallet-vintage');
  const addressSelect = document.getElementById('address-type');
  const impactResults = document.querySelectorAll('[data-impact-result]');
  const fallback = document.querySelector('[data-impact-result][data-fallback]');

  function updateImpact() {
    const w = walletSelect?.value;
    const a = addressSelect?.value;

    if (!w || !a) {
      impactResults.forEach((r) => r.classList.remove('active'));
      fallback?.classList.add('active');
      return;
    }

    let matched = false;
    impactResults.forEach((r) => {
      if (r.hasAttribute('data-fallback')) return;
      const rw = r.dataset.wallet;
      const ra = r.dataset.address;
      const isMatch = rw === w && ra === a;
      r.classList.toggle('active', isMatch);
      if (isMatch) matched = true;
    });

    if (matched) {
      fallback?.classList.remove('active');
    } else {
      fallback?.classList.add('active');
    }
  }

  walletSelect?.addEventListener('change', updateImpact);
  addressSelect?.addEventListener('change', updateImpact);
  updateImpact();
})();
