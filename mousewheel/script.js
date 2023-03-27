'use strict';

((d, w) => {
  const box = d.getElementById('box');

  let deg = 0;
  let degAdjust = 0;
  const fullDeg = 360;
  const rotate = 2;
  const speedAdjust = 30;
  const boxRotate = (num) => {
    if (num > 0 && degAdjust <= fullDeg * rotate) {
      deg += num;
      degAdjust = Math.ceil(deg / speedAdjust);
      box.style.transform = `rotate(${degAdjust}deg)`;
    } else {
      console.log('終了');
      return false;
    };
  };

  w.addEventListener('mousewheel', (e) => {
    boxRotate(e.wheelDelta);
  });

})(document, window);