/* HazratAminOfficial — GA4 custom event tracking (added 13 Nov 2026).
   Fires clean named events so they can be marked as Key Events in GA4:
   apply_click, job_detail_view, whatsapp_click (key events),
   lecture_video_click, outbound_click (regular events).
   No personal data is sent — only link URLs and page titles. */
(function () {
  if (typeof gtag !== 'function') return;

  function fire(name, params) {
    try { gtag('event', name, params || {}); } catch (e) { /* GA unavailable */ }
  }

  /* Job detail page view — fires once on every per-job page. */
  var path = window.location.pathname || '';
  if (/\/job-[a-z0-9-]+\.html$/i.test(path)) {
    var title = (document.querySelector('h1') || {}).textContent || document.title || '';
    fire('job_detail_view', {
      job_page: path.split('/').pop(),
      job_title: title.trim().slice(0, 120)
    });
  }

  /* Click tracking (event delegation — works for all links on the page). */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!href) return;
    var text = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
    var page = path.split('/').pop() || 'index.html';

    if (href.indexOf('wa.me/') !== -1) {
      fire('whatsapp_click', { link_url: href, link_text: text, page: page });
      return;
    }
    if (href.indexOf('etea.edu.pk') !== -1 || href.indexOf('nts.org.pk') !== -1) {
      fire('apply_click', { link_url: href, link_text: text, page: page });
      return;
    }
    if (href.indexOf('youtube.com/watch') !== -1 || href.indexOf('youtu.be/') !== -1) {
      fire('lecture_video_click', { link_url: href, link_text: text, page: page });
      return;
    }
    if (/^https?:\/\//i.test(href)) {
      var host = '';
      try { host = new URL(href, window.location.href).hostname; } catch (err) { return; }
      if (host && host !== window.location.hostname) {
        fire('outbound_click', { link_url: href, link_text: text, page: page });
      }
    }
  }, false);
})();
