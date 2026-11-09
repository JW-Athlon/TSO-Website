/* Desktop header dropdown: click label to open, click outside to close,
   click label again while open to go to the parent link's page. */
(function () {
  function openMenus() {
    return document.querySelectorAll('header-menu > details[open]');
  }

  document.addEventListener('click', function (event) {
    var summary = event.target.closest('header-menu > details > summary[data-href]');

    if (summary) {
      var details = summary.parentElement;
      if (details.hasAttribute('open')) {
        event.preventDefault();
        window.location.href = summary.getAttribute('data-href');
      }
      return;
    }

    openMenus().forEach(function (details) {
      if (!details.contains(event.target)) {
        details.removeAttribute('open');
        var s = details.querySelector('summary');
        if (s) s.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
