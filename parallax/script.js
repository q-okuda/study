'use strict';

((d, w) => {
  const els = d.querySelectorAll('.js-parallax');
  const interSecting = 'add-interSecting';

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(interSecting);
      } else {
        entry.target.classList.remove(interSecting);
      }
    });
  };

  const io = new IntersectionObserver(callback);
  els.forEach((el) => {
    io.observe(el);
  });

  w.addEventListener('scroll', () => {
    const moveY = scrollY * 0.2;
    els.forEach((el) => {
      el.style.transform = `translateY(${moveY}px)`;
    });
  });
})(document, window);