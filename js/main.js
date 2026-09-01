/* SALAR — scroll reveals, grade reveals, wipe comparator.
   One easing lives in the CSS; this file only toggles state. */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- scroll-in reveals + grade reveals ---------- */
const targets = document.querySelectorAll('.fade, .reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('in-view', 'is-graded'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(
          entry.target.classList.contains('reveal') ? 'is-graded' : 'in-view'
        );
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.35 }
  );
  targets.forEach((el) => io.observe(el));
}

/* ---------- wipe comparator (case study) ---------- */
const wipe = document.querySelector('.wipe');

if (wipe) {
  const handle = wipe.querySelector('.wipe__handle');
  let value = 50;

  const set = (next) => {
    value = Math.min(100, Math.max(0, next));
    wipe.style.setProperty('--wipe', `${value}%`);
    handle.setAttribute('aria-valuenow', String(Math.round(value)));
  };

  const fromPointer = (event) => {
    const rect = wipe.getBoundingClientRect();
    set(((event.clientX - rect.left) / rect.width) * 100);
  };

  wipe.addEventListener('pointerdown', (event) => {
    wipe.setPointerCapture(event.pointerId);
    fromPointer(event);
  });

  wipe.addEventListener('pointermove', (event) => {
    if (event.buttons) fromPointer(event);
  });

  handle.addEventListener('keydown', (event) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      set(value - step);
      event.preventDefault();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      set(value + step);
      event.preventDefault();
    } else if (event.key === 'Home') {
      set(0);
      event.preventDefault();
    } else if (event.key === 'End') {
      set(100);
      event.preventDefault();
    }
  });

  set(50);
}
