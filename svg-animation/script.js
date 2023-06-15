((d, w) => {
  w.addEventListener('load', () => {
    let windowWidth = innerWidth;
    let windowHeight = innerHeight;

    const pc = 768;
    const pcMax = 1400;

    // メガネアニメ１
    const glassSvgs1 = [].slice.call(d.querySelectorAll('.js-glass1'));
    const glassPaths1 = [].slice.call(d.querySelectorAll('.js-glassPath1'));
    const beforeGlassPath1 = Snap('#glassPath_1');
    const beforeGlassPath2 = Snap('#glassPath_2');
    const afterGlassPath = "m152,88.5c0,33.41-26.86,60.5-60,60.5s-60-27.09-60-60.5,26.86-60.5,60-60.5,60,27.09,60,60.5ZM0,88.5c0,36.38,22.81,67.63,55.43,81.23,13.57,4.27,30.95,8.24,50.57,6.27,3-1,54.96-8.79,63-47,4-19-18-6-24-2-6,5-28.28,22.96-35,23-7.41.04-4,26-4,26,45.21-5.6,78-42.49,78-87.5C184,39.62,142.81,0,92,0,61.38,0,34.25,14.39,17.53,36.52,6.5,51.12,0,69.08,0,88.5Z";
    const duration = 2000;
    const deg = 360 * 1;

    beforeGlassPath1.animate({ d: afterGlassPath }, duration * 0.7);
    beforeGlassPath2.animate({ d: afterGlassPath }, duration * 0.7);
    glassSvgs1.forEach((glassSvg) => {
      glassSvg.style.transition = `transform ${duration}ms`;
      glassSvg.style.transform = `rotate(${deg}deg)`;
    });
    glassPaths1.forEach((glassPath) => {
      glassPath.style.transition = `fill ${duration}ms`;
      glassPath.style.fill = '#d7000f';
    });

    // メガネアニメ２
    const glassSvgs2 = [].slice.call(d.querySelectorAll('.js-glass2'));
    const glassPaths2 = [].slice.call(d.querySelectorAll('.js-glassPath2'));
    const beforeGlassPath3 = Snap('#glassPath_3');
    const beforeGlassPath4 = Snap('#glassPath_4');
    const rectGlassPath = "m147,144.08H37s0-110.06,0-110.06h110s0,110.06,0,110.06ZM184,0H0s0,178.1,0,178.1h184s0-178.1,0-178.1Z";
    const hexaGlassPath = "m137.99,0l46,89.18-46,89.18H46S0,89.18,0,89.18L46,0h92Zm-73.5,33.96l-27.5,55.2,27.5,55.2h55s27.5-55.2,27.5-55.2l-27.5-55.2h-55Z";
    const circleGlassPath = "m152,88.5c0,33.41-26.86,60.5-60,60.5s-60-27.09-60-60.5,26.86-60.5,60-60.5,60,27.09,60,60.5ZM0,88.5c0,36.38,22.81,67.63,55.43,81.23,13.57,4.27,30.95,8.24,50.57,6.27,3-1,54.96-8.79,63-47,4-19-18-6-24-2-6,5-28.28,22.96-35,23-7.41.04-4,26-4,26,45.21-5.6,78-42.49,78-87.5C184,39.62,142.81,0,92,0,61.38,0,34.25,14.39,17.53,36.52,6.5,51.12,0,69.08,0,88.5Z";
    const duration2 = 650;

    beforeGlassPath3.animate({ d: rectGlassPath }, duration2, () => {
      beforeGlassPath3.animate({ d: hexaGlassPath }, duration2, () => {
        beforeGlassPath3.animate({ d: circleGlassPath }, duration2);
      });
    });
    beforeGlassPath4.animate({ d: rectGlassPath }, duration2, () => {
      beforeGlassPath4.animate({ d: hexaGlassPath }, duration2, () => {
        beforeGlassPath4.animate({ d: circleGlassPath }, duration2);
      });
    });
    glassSvgs2.forEach((glassSvg) => {
      glassSvg.style.transition = `transform ${duration2 * 3}ms`;
      glassSvg.style.transform = `rotate(360deg)`;
    });
    glassPaths2.forEach((glassPath) => {
      glassPath.style.transition = `fill ${duration2 * 3}ms`;
      glassPath.style.fill = '#d7000f';
    });

    // メガネアニメ３
    const glassesWrap = d.getElementById('js-glassesWrap');
    const glassesAnime = gsap.timeline();
    glassesAnime
      .to(glassesWrap, {
        scale: 1.2,
        duration: 0.2,
      })
      .to(glassesWrap, {
        scale: 0,
        duration: 0.2,
        ease: 'power4',
        onComplete: () => { 
          const glasses = [].slice.call(d.querySelectorAll('.js-glassPath3'));
          glasses.forEach((glass)=>{
            glass.setAttribute('d', afterGlassPath);
            glass.style.fill = '#d7000f';
          });
        }
      }, 0.2)
      .to(glassesWrap, {
        scale: 1.2,
        duration: 0.2,
        ease: 'power4',
      }, '+=0.2')
      .to(glassesWrap, {
        scale: 1,
        duration: 0.2,
      });

    // 切り替え
    const eyesSection = d.getElementById('js-eyesSection');
    const toggleBtn = d.getElementById('js-toggleBtn');
    toggleBtn.addEventListener('click', () => {
      eyesSection.classList.toggle('add-lookBubble');
    });
    eyesSection.addEventListener('mouseleave', () => {
      eyesSection.classList.add('add-lookBubble');
    });
    eyesSection.addEventListener('mouseenter', () => {
      eyesSection.classList.remove('add-lookBubble');
    });


    // 吹き出しアニメーション
    let bubblePos = { x: 0, y: 0 };
    const changeBubbleVisible = (el) => {
      let index = 0;
      setInterval(() => {
        el[index].classList.remove('add-show');
        index++;
        if (index > el.length - 1) index = 0;
        el[index].classList.add('add-show');
        bubblePos = {
          x: pageXOffset + el[index].getBoundingClientRect().left + el[index].offsetWidth / 2,
          y: pageYOffset + el[index].getBoundingClientRect().top + el[index].offsetHeight / 2,
        };
        if (eyesSection.classList.contains('add-lookBubble')) {
          calcEyePos();
        }
      }, 2000);
    };

    const bubbles = [].slice.call(d.querySelectorAll('.js-bubble'));
    changeBubbleVisible(bubbles);

    // 目アニメーション
    const eyesWrap = d.getElementById('js-eyesWrap');
    const leftEye = d.getElementById('js-leftEye');
    const rightEye = d.getElementById('js-rightEye');

    const abs = amount => {
      return amount < 0 ? -amount : amount;
    };

    let x;
    let y;
    let eyePosX;
    let eyePosY;

    const calcEyePos = (e) => {
      let mouse;
      if (eyesSection.classList.contains('add-lookBubble')) {
        mouse = {
          x: bubblePos.x,
          y: bubblePos.y,
        };
      } else {
        mouse = {
          x: e.pageX,
          y: e.pageY,
        };
      }
      const eyesCenter = {
        x: pageXOffset + eyesWrap.getBoundingClientRect().left + eyesWrap.offsetWidth / 2,
        y: pageYOffset + eyesWrap.getBoundingClientRect().top + eyesWrap.offsetHeight / 2,
      };
      x = Math.floor((eyesCenter.x - mouse.x) / eyesWrap.offsetWidth * 100);
      y = Math.floor((eyesCenter.y - mouse.y) / eyesWrap.offsetHeight * 100);

      const eyeWidth = leftEye.offsetWidth;
      const eyeHeight = leftEye.offsetHeight;

      const radian = Math.atan2(y, x);
      const ratioX = eyeWidth * (x / eyeWidth);
      const ratioY = eyeHeight * (y / eyeHeight);
      const maxX = eyeWidth * Math.cos(radian);
      const maxY = eyeHeight * Math.sin(radian);
      eyePosX = abs(maxX) >= abs(ratioX) ? ratioX : maxX;
      eyePosY = abs(maxY) >= abs(ratioY) ? ratioY : maxY;
    };

    w.addEventListener('mousemove', (e) => {
      if (eyesSection.classList.contains('add-lookBubble')) {
        return false;
      }
      calcEyePos(e);
    });


    (function updateEyesPos() {
      leftEye.style.transform = `translate(calc(-50% - ${eyePosX}px), calc(-50% - ${eyePosY}px))`;
      rightEye.style.transform = `translate(calc(-50% - ${eyePosX}px), calc(-50% - ${eyePosY}px))`;
      requestAnimationFrame(updateEyesPos);
    }
    )();

    w.addEventListener('resize', () => {
      leftEye.style.transform = `translate(calc(-50% - ${eyePosX}px), calc(-50% - ${eyePosY}px))`;
      rightEye.style.transform = `translate(calc(-50% - ${eyePosX}px), calc(-50% - ${eyePosY}px))`;
    });

    w.addEventListener('mousedown', () => {
      leftEye.style.width = '38%';
      rightEye.style.width = '38%';
    });

    w.addEventListener('mouseup', () => {
      leftEye.style.width = '35%';
      rightEye.style.width = '35%';
    });

    // テキストアニメーション
    const txtSection = d.getElementById('js-txtSection');
    const txt = d.getElementById('js-txt');
    const pcFig = d.getElementById('js-pc');
    const letter = d.querySelectorAll('.js-letter');
    const inhaleEnd = windowHeight * 2;
    const inhaleTxt = gsap.timeline({
      scrollTrigger: {
        trigger: txt,
        start: 'center center', // 'trigger, browser'
        end: '+=' + inhaleEnd, //アニメーション開始位置から2000px固定する
        scrub: true, //スクロール量に合わせてアニメーションが進む（数字も指定できる）
        pin: true, //トリガー要素を固定する
        // markers: true,
      }
    });

    const fig = '#js-pc, #js-pcBottom';
    gsap.set(fig, { xPercent: -50, yPercent: 100 });
    inhaleTxt
      .to(fig, {
        yPercent: 0,
        duration: 4,
      })
      .to(txt, {
        y: () => { return -pcFig.offsetHeight; },
        duration: 4,
      }, '<')
      .to(txt, {
        yPercent: 20,
        duration: 3,
      })
      .to(letter, {
        y: () => { return windowHeight * 0.5; },
        // opacity: 0.5,
        rotate: 90,
        scale: 0,
        duration: 4,
        ease: "power3.in",
        stagger: {
          from: "end",
          each: 1 / letter.length * 2.5,
        }
      }, '<')
      .to(fig, {
        scale: () => { return windowHeight / pcFig.offsetHeight + 2.5; },
        duration: 3,
      })
      .to(fig, {
        opacity: 0
      });


    // 線引くアニメーション
    const svgSection = d.getElementById('js-svgSection');
    const svgWrap = d.getElementById('js-svgWrap');

    const line = d.getElementById('js-line');
    const lineLength = line.getTotalLength();
    line.style.strokeDasharray = lineLength + 'px';
    line.style.strokeDashoffset = lineLength + 'px';

    const circle1 = d.getElementById('js-circle1');
    const circle2 = d.getElementById('js-circle2');
    const circle3 = d.getElementById('js-circle3');

    const dot = d.getElementById('js-dot');

    let svgWrapWidth = svgWrap.offsetWidth;
    let svgHiddenWidth = svgWrapWidth - windowWidth;

    const drawEnd = '2000px';
    // const scrollX = gsap.to(svgSection, {
    //   duration: 0.5,
    //   xPercent: () => svgHiddenWidth / svgWrapWidth * -100,
    //   ease: "power1.inOut",
    //   paused: true,
    // });
    const drawLine = gsap.timeline({
      scrollTrigger: {
        trigger: svgSection,
        start: 'center center', // 'trigger, browser'
        end: '+=' + drawEnd, //アニメーション開始位置から2000px固定する
        scrub: true, //スクロール量に合わせてアニメーションが進む（数字も指定できる）
        pin: true, //トリガー要素を固定する
        // markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // console.log(progress);
          if (progress >= 0.115) {
            circle1.style.opacity = '1';
          } else {
            circle1.style.opacity = '0';
          }

          if (progress >= 0.273) {
            circle2.style.opacity = '1';
          } else {
            circle2.style.opacity = '0';
          }

          if (progress >= 0.553) {
            circle3.style.opacity = '1';
          } else {
            circle3.style.opacity = '0';
          }

          // if (progress >= 0.38) {
          //   scrollX.play();
          // } else {
          //   scrollX.reverse();
          // }
        }
      }
    });


    drawLine
      .to(line, {
        strokeDashoffset: 0,
      })
      .to(dot, {
        motionPath: {
          path: line,
          align: line,
          alignOrigin: [0.5, 0.5]
        }
      }, 0)
      .to(svgWrap, {
        xPercent: svgHiddenWidth / svgWrapWidth * -100,
      }, 0.11);


      // 橋アニメーション
      const bridgeSection = d.getElementById('js-bridgeSection');
      const bridge = d.getElementById('js-bridge');
      const bridgeSectionEnd = bridgeSection.getBoundingClientRect().bottom + scrollY;

      const moveBridge = gsap.timeline({
        scrollTrigger: {
          trigger: bridgeSection,
          start: 'center center', // 'trigger, browser'
          end: '+=' + bridgeSectionEnd, //アニメーション開始位置から2000px固定する
          scrub: true, //スクロール量に合わせてアニメーションが進む（数字も指定できる）
          pin: true, //トリガー要素を固定する
          markers: true,
        }
      });

      console.log(bridge.offsetWidth - innerWidth);

      moveBridge.to(bridge, {
        x: -bridge.offsetWidth - innerWidth,
      });
  });
})(document, window);
