/* JL HomePro Solution — shared behaviour for service / landing pages
   Language toggle (EN default, persisted), FAQ accordion, footer year. */
(function () {
  var enBtn = document.getElementById('enBtn');
  var zhBtn = document.getElementById('zhBtn');

  function setLang(lang) {
    document.documentElement.lang = lang;
    if (enBtn && zhBtn) {
      enBtn.classList.toggle('active', lang === 'en');
      zhBtn.classList.toggle('active', lang === 'zh');
    }
    try { localStorage.setItem('jl_lang', lang); } catch (e) {}
  }

  // URL ?lang= wins (trade-partner links land in Chinese); else saved; else English
  var urlLang = new URLSearchParams(location.search).get('lang');
  var saved = 'en';
  try { saved = localStorage.getItem('jl_lang') || 'en'; } catch (e) {}
  setLang(urlLang === 'zh' ? 'zh' : (urlLang === 'en' ? 'en' : saved));

  if (enBtn) enBtn.addEventListener('click', function () { setLang('en'); });
  if (zhBtn) zhBtn.addEventListener('click', function () { setLang('zh'); });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.faq-item').classList.toggle('open');
    });
  });

  // footer year
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
})();
