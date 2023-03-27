'use strict';

gsap.to('.rect1', {
  backgroundColor: '#000',
  x: 100,
  duration: 1,
  repeat: -1,
  yoyo: true
});

gsap.to('.rect2', {
  backgroundColor: 'red',
  x: 200,
  duration: 1.5,
  delay: 1,
  repeat: -1,
  yoyo: true,
  ease: 'power4.out'
});

gsap.to('.rect3', {
  backgroundColor: 'green',
  x: 300,
  duration: 2,
  delay: 2,
  repeat: -1,
  yoyo: true,
  ease: 'power2.inOut'
});

gsap.to('.rect4', {
  y: 200,
  duration: 2,
  repeat: -1,
  repeatDelay: 2,
  ease: "bounce.out(1, 0.5)",
});

gsap.from('.rect5', {
  y: 100,
  opacity: 0,
  duration: 0.5,
  repeat: -1,
  repeatDelay: 1,
  ease: "power4.out",
});

gsap.from('.circle', {
  y: 50,
  opacity: 0,
  duration: 0.5,
  repeat: -1,
  repeatDelay: 1,
  ease: "power4.out",
  stagger: 0.02,
});

gsap.to('.dot', {
  y: 200,
  duration: 2,
  repeat: -1,
  repeatDelay: 1,
  ease: "bounce.out",
  stagger: {
    each: 0.01, // ばらす間隔（秒）
    // from: "random", // ランダムに開始
    from: "center", // 中央から
  }
});

let tl = gsap.timeline({
  repeat: -1,
});

tl.to('.rect6', {
  x: 300,
  duration: 1,
});

tl.to('.rect6', {
  y: 300,
  duration: 1,
});

tl.to('.rect6', {
  x: 0,
  duration: 1,
});

tl.to('.rect6', {
  y: 0,
  duration: 1,
});