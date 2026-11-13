/* Desktop header dropdown.
   - Mouse devices (hover + wide screen): opens on hover, closes shortly after the pointer leaves.
     Clicking the label goes straight to the parent link's page.
   - Touch / keyboard: click label to open, click outside to close,
     click label again while open to go to the parent link's page. */
(function () {
  var hoverQuery = window.matchMedia('(hover: hover) and (min-width: 990px)');
  var closeTimers = new WeakMap();

  function setOpen(details, open) {
    var summary = details.querySelector('summary');
    if (open) details.setAttribute('open', '');
    else details.removeAttribute('open');
    if (summary) summary.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeOthers(except) {
    document.querySelectorAll('header-menu > details[open]').forEach(function (d) {
      if (d !== except) setOpen(d, false);
    });
  }

  document.querySelectorAll('header-menu').forEach(function (menu) {
    var details = menu.querySelector(':scope > details');
    if (!details) return;

    menu.addEventListener('mouseenter', function () {
      if (!hoverQuery.matches) return;
      clearTimeout(closeTimers.get(details));
      closeOthers(details);
      setOpen(details, true);
    });

    menu.addEventListener('mouseleave', function () {
      if (!hoverQuery.matches) return;
      closeTimers.set(details, setTimeout(function () { setOpen(details, false); }, 300));
    });
  });

  document.addEventListener('click', function (event) {
    var summary = event.target.closest('header-menu > details > summary[data-href]');

    if (summary) {
      var details = summary.parentElement;
      if (hoverQuery.matches || details.hasAttribute('open')) {
        event.preventDefault();
        window.location.href = summary.getAttribute('data-href');
      }
      return;
    }

    document.querySelectorAll('header-menu > details[open]').forEach(function (details) {
      if (!details.contains(event.target)) setOpen(details, false);
    });
  });
})();
