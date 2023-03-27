'use strict';
((d, w) => {
  const hawaii = [
    {
      key: 1,
      name: "ハワイアンクランチ",
    },
    {
      key: 2,
      name: "アロハチョコクッキー",
    },
    {
      key: 3,
      name: "レインボーシャーベット",
    },
    {
      key: 4,
      name: "サンセットサーフィン",
    },
  ];
  const normal = [
    {
      key: 5,
      name: "チョコレートチップ",
    },
    {
      key: 6,
      name: "ワンダフルキャラメルプレッツェル",
    },
    {
      key: 7,
      name: "ツインベリーチーズケーキ",
    },
    {
      key: 8,
      name: "ストロベリーチーズケーキ",
    },
    {
      key: 9,
      name: "クッキーアンドクリーム",
    },
    {
      key: 10,
      name: "キャラメルリボン",
    },
    {
      key: 11,
      name: "ロッキーロード",
    },
    {
      key: 12,
      name: "チョコレート",
    },
    {
      key: 13,
      name: "チョップドチョコレート",
    },
    {
      key: 14,
      name: "ポッピングシャワー",
    },
    {
      key: 15,
      name: "小倉トースト〜大納言あずき使用〜",
    },
    {
      key: 16,
      name: "ジャモカコーヒー",
    },
    {
      key: 17,
      name: "大納言あずき",
    },
    {
      key: 18,
      name: "ラムレーズン",
    },
    {
      key: 19,
      name: "ジャモカアーモンドファッジ",
    },
    {
      key: 20,
      name: "ナッツトゥユー",
    },
    {
      key: 21,
      name: "キャラメル抹茶オレ",
    },
    {
      key: 22,
      name: "チョコレートミント",
    },
    {
      key: 23,
      name: "抹茶",
    },
    {
      key: 24,
      name: "レモンシャーベット",
    },
    {
      key: 25,
      name: "バナナアンドストロベリー",
    },
    {
      key: 26,
      name: "ベリーベリーストロベリー",
    },
    {
      key: 27,
      name: "マスクメロン",
    },
    {
      key: 28,
      name: "オレンジソルベ",
    },
    {
      key: 29,
      name: "バニラ",
    },
    {
      key: 30,
      name: "ラブポーションサーティワン",
    },
    {
      key: 31,
      name: "アマーロアフォガード",
    },
  ];

  // ============================================
  // 配列処理
  // ============================================
  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const popNum = 5;
  const hawaiiShuffle = shuffle([...hawaii]);
  const hawaiiResult = hawaiiShuffle.shift();
  const combFlavor = shuffle([...hawaiiShuffle, ...normal]);
  const combResult = combFlavor.slice(0, popNum - 1);
  const resultArray = [].concat(hawaiiResult, combResult);
  console.log(resultArray);

  // ============================================
  // canvas
  // ============================================
  const c1 = d.getElementById('js-canvas01');
  const c2 = d.getElementById('js-canvas02');
  const c1ctx = c1.getContext('2d');
  const c2ctx = c2.getContext('2d');
  c1.width = 100;
  c1.height = 100;

  c2.width = 300;
  c2.height = 300;

  c1ctx.fillStyle = 'rgb(0, 141, 215)';
  c1ctx.fillRect(0, 0, c1.width, c1.height);

  c2ctx.fillStyle = 'rgb(0, 141, 215)';
  c2ctx.fillRect(0, 0, c2.width, c2.height);
  const img = new Image();
  img.src = './img/price_240.svg';
  img.onload =()=>{
    c1ctx.drawImage(img, 0, 0);
    c2ctx.drawImage(img, 0, 0);
  }
  
  console.log(w.screen.width);
  console.log(w.screen.height);

  const iceCanvas = d.getElementById('js-iceCanvas');
  const ctx = iceCanvas.getContext('2d');
  const topSpace = 352;
  const iceHeight = 372;
  const iceOverLap = 32;
  const cupHeight = 436;
  const cupOverLap = 291;
  const width = 750;
  const bottomSpace = 80;

  // canvasサイズ
  const setCanvasSize = (num) => {
    iceCanvas.width = width;
    iceCanvas.height = topSpace + bottomSpace + (iceHeight * num) - (iceOverLap * (num - 1)) + cupHeight - cupOverLap;
    console.log('setCanvasSize');
  };

  // 背景色
  const fillCanvasBg = () => {
    ctx.fillStyle = 'rgb(0, 141, 215)';
    ctx.fillRect(0, 0, iceCanvas.width, iceCanvas.height);
    console.log('fillCanvasBg');
  };

  // 画像描画
  const drawImg = (num) => {
    if (iceCanvas.getContext) {
      let loadCount = 0;
      let imgArray = [];

      for (let i = 0; i <= num + 2; i++) {
        imgArray[i] = new Image();
        if (i == num + 2) {
          imgArray[i].src = './img/canvas_bgTop.png';
        } else if (i == num + 1) {
          imgArray[i].src = `./img/pop/${num}.png`;
        } else if (i == num) {
          imgArray[i].src = './img/cup.png';
        } else if (i % 2 == 0) {
          imgArray[i].src = `./img/right/ice_${resultArray[i].key}.png`;
        } else {
          imgArray[i].src = `./img/left/ice_${resultArray[i].key}.png`;
        }

        imgArray[i].addEventListener('load', () => {
          loadCount++;
          console.log(loadCount);
          if (loadCount == imgArray.length) {
            console.log('loaded');
            for (let j = num + 2; j >= 0; j--) {
              if (j == num + 2) {
                ctx.drawImage(imgArray[j], 0, 0);
                console.log(imgArray[j]);
              } else if (j == num + 1) {
                ctx.drawImage(imgArray[j], 101, 152);
                console.log(imgArray[j]);
              } else if (j == num) {
                ctx.drawImage(imgArray[j], 42, topSpace + (iceHeight * j) - (iceOverLap * (j - 1) + cupOverLap));
                console.log(imgArray[j]);
              } else if (j > 0) {
                ctx.drawImage(imgArray[j], 0, topSpace + (iceHeight * j) - (iceOverLap * j));
                console.log(imgArray[j]);
              } else if (j == 0) {
                ctx.drawImage(imgArray[j], 0, topSpace);
                console.log(imgArray[j]);
              }
            }
          }
        });
      }
    }
  };

  w.addEventListener('load', () => {
    setCanvasSize(resultArray.length);
    fillCanvasBg();
    drawImg(resultArray.length);
  });

  // 画像に変換→画像表示
  const btn = d.getElementById('js-btn');
  btn.addEventListener('click', () => {
    const png = iceCanvas.toDataURL("image/png");
    d.getElementById("newImg").src = png;
  });

  // 画像に変換→画像ダウンロード
  const download = d.getElementById('js-download');
  const fileName = '31_pop';
  download.addEventListener("click", function () {
    if (iceCanvas.msToBlob) {
      const blob = iceCanvas.msToBlob();
      w.navigator.msSaveBlob(blob, fileName);
    } else {
      download.href = iceCanvas.toDataURL("image/jpeg", 0.8);
      download.download = fileName;
    }
  });


  const canvas = d.getElementById('sample01');
  const container = d.querySelector('.container');
  const getSize = () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  };

  const drawing = () => {
    if (canvas.getContext) { //canvas未対応のブラウザ考慮
      const context = canvas.getContext('2d'); //平面図形を描く際は2dを指定
      context.fillRect(0, 0, 100, 100);
      // context.描画指定(x座標、y座標、width、height);

      context.fillStyle = 'rgb(00,255,00)';
      context.fillRect(20, 40, 50, 100);
      context.clearRect(40, 30, 20, 20);

      context.strokeStyle = 'rgb(00,00,255)';
      context.strokeRect(200, 80, 100, 50);

      context.fillStyle = 'rgb(255,00,00)';
      context.arc(150, 75, 60, Math.PI * 1, Math.PI * 2, true);

      context.font = "14px 'ＭＳ ゴシック'";
      context.fillText('canvasに文字を描画します。', 120, 50);
      context.fill();

      const img = new Image();
      img.src = "./img/400x600.png"; // 画像のURLを指定
      img.addEventListener('load', () => { // 画像が読み込まれたら
        context.drawImage(img,
          0, // sx      (元画像の切り抜き始点X)
          0, // sy      (元画像の切り抜き始点Y)
          400, // sWidth  (元画像の切り抜きサイズ：横幅)
          600, // sHeight (元画像の切り抜きサイズ：高さ)
          100, // dx      (Canvasの描画開始位置X)
          200, // dy      (Canvasの描画開始位置Y)
          200, // dWidth  (Canvasの描画サイズ：横幅)
          300 // dHeight (Canvasの描画サイズ：高さ)
        ); // drawImage()で画像を表示
      });
    }
  };

  w.addEventListener('resize', () => {
    getSize();
    drawing();
  });

  w.addEventListener('load', () => {
    getSize();
    drawing();
  });
})(document, window);