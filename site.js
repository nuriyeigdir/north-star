// Ortak ayarlar ve dil seçici. E-posta ve geliştirici adı sadece burada yazılır.
const SITE = {
  email: 'ozzyai.dev@gmail.com',
  developer: 'OzzyAi-Labs', // Google Play'deki geliştirici adı (istenirse gerçek adla değiştirilebilir)
};

(function () {
  const LANGS = ['tr', 'en', 'es', 'pt', 'de'];
  const NAMES = { tr: 'Kutup Yıldızı', en: 'North Star', es: 'Estrella Polar', pt: 'Estrela Polar', de: 'Polarstern' };
  const PRIVACY = { tr: 'Gizlilik Politikası', en: 'Privacy Policy', es: 'Política de privacidad', pt: 'Política de privacidade', de: 'Datenschutzerklärung' };
  const LABELS = { tr: 'Türkçe', en: 'English', es: 'Español', pt: 'Português', de: 'Deutsch' };

  // E-posta ve geliştirici adını sayfadaki yerlerine yaz
  document.querySelectorAll('[data-email]').forEach((el) => {
    el.textContent = SITE.email || '—';
    if (SITE.email && el.tagName === 'A') el.href = 'mailto:' + SITE.email;
  });
  document.querySelectorAll('[data-developer]').forEach((el) => {
    el.textContent = SITE.developer || '—';
  });

  // Dil: ?lang=xx > #xx > tarayıcı dili > İngilizce
  const fromUrl = new URLSearchParams(location.search).get('lang') || location.hash.slice(1);
  const fromBrowser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  let lang = LANGS.includes(fromUrl) ? fromUrl : LANGS.includes(fromBrowser) ? fromBrowser : 'en';

  const nav = document.querySelector('nav.langs');
  function apply(code) {
    lang = code;
    document.documentElement.lang = code;
    document.querySelectorAll('section[lang]').forEach((s) => s.classList.toggle('on', s.lang === code));
    nav && nav.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === code)));
    const title = document.querySelector(`section[lang="${code}"] h1`);
    document.querySelectorAll('[data-appname]').forEach((el) => (el.textContent = NAMES[code]));
    document.querySelectorAll('[data-privacy]').forEach((el) => {
      el.textContent = PRIVACY[code];
      el.href = 'privacy.html?lang=' + code;
    });
    if (title) document.title = title.textContent + ' · ' + NAMES[code];
  }
  if (nav) {
    LANGS.forEach((code) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.lang = code;
      b.textContent = LABELS[code];
      b.addEventListener('click', () => {
        apply(code);
        history.replaceState(null, '', '?lang=' + code);
      });
      nav.appendChild(b);
    });
  }
  apply(lang);
})();
