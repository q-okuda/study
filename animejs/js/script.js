'use strict';

((d, w) => {
  const square = d.querySelector('.square');
  square.addEventListener('click', () => {
    anime({
      targets: square,
      translateX: 600,
      scale: [0.5, 1], //[始点, 終点]
      rotate: 360,
      duration: 1500,
      loop: 4,
    });
  });

  const circle = d.querySelector('.circle');
  circle.addEventListener('click', () => {
    anime({
      targets: circle,
      translateX: ['0', '200%'],
      duration: 2000,
      endDelay: 1000,
      direction: 'alternate',
    });
  });

  const obj = d.querySelector('.obj');
  const myObject = {
    prop1: 0,
    prop2: '0%'
  }
  obj.addEventListener('click', () => {
    anime({
      targets: myObject,
      prop1: 50,
      prop2: '100%',
      easing: 'linear',
      round: 1, // 小数点位置
      update: () => {
        obj.innerHTML = JSON.stringify(myObject);
        // JSON.stringify()…オブジェクトや値をJSON文字列に変換。
      }
    });
  });

  const attr = d.querySelector('.attr');
  attr.addEventListener('click', () => {
    anime({
      targets: attr,
      placeholder: [0, 1000],
      easing: 'linear',
      round: 1,
    });
  });

})(document, window);