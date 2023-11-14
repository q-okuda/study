((d, w) => {
  w.addEventListener('load', () => {
    const container = d.getElementById('js-container');
    let isDrawing = false;
    const lineWidth = 4;

    // マウスの座標を取得
    function getMousePos(canvas, event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }

    // 座標が十分に近いかどうかをチェックする関数
    function arePointsClose(point1, point2, threshold = 5) {
      // ここでは単純に x 座標と y 座標の差の絶対値をとって閾値と比較
      return Math.abs(point1.x - point2.x) < threshold && Math.abs(point1.y - point2.y) < threshold;
    }

    // パスが閉じているかどうかを判定する関数
    function isPathClosed(drawnPoints) {
      // 最初の点と最後の点を比較して、十分に近ければ閉じているとみなす
      const firstPoint = drawnPoints[0];
      const lastPoint = drawnPoints[drawnPoints.length - 1];

      return arePointsClose(firstPoint, lastPoint, 75);
    }


    container.addEventListener('mousedown', (event) => {
      let offsetX = 0;
      let offsetY = 0;
      let points = []; // マウスで描画した座標を記録するための配列

      isDrawing = true;
      const winWidth = innerWidth;
      const winHeight = innerHeight;

      // div作成
      let div = d.createElement('div');
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.width = `${winWidth}px`;
      div.style.height = `${winHeight}px`;

      // canvas作成
      let canvas = d.createElement('canvas');
      canvas.width = winWidth;
      canvas.height = winHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';

      div.appendChild(canvas);
      container.appendChild(div);

      // コンテキスト作成
      const ctx = canvas.getContext('2d');

      // 線の太さを2ピクセルに設定
      ctx.lineWidth = lineWidth;

      // 描画を開始
      const pos = getMousePos(canvas, event);
      ctx.moveTo(pos.x, pos.y);
      ctx.beginPath();

      // 描画を続ける
      canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
          const pos = getMousePos(canvas, e);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
          const x = pos.x;
          const y = pos.y;

          points.push({ x, y });
        }
      });

      // 描画を終了
      canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        console.log(points);

        if (points.length > 4) {
          let minX = points[0].x;
          let minY = points[0].y;
          let maxX = points[0].x;
          let maxY = points[0].y;

          // 座標から最小・最大の位置を見つける
          points.forEach(point => {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
          });

          const width = maxX - minX;
          const height = maxY - minY;

          // 左上の座標から移動量を計算
          offsetX = minX;
          offsetY = minY;

          // パス全体を更新して移動する
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvasをクリア

          // canvasのサイズを更新
          canvas.width = width + lineWidth;
          canvas.height = height + lineWidth;

          // 再描画
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          points.forEach((point) => {
            const x = point.x - offsetX + lineWidth / 2;
            const y = point.y - offsetY + lineWidth / 2;
            ctx.lineTo(x, y);
          });
          ctx.stroke();

          div.style.width = `${width + lineWidth}px`;
          div.style.height = `${height + lineWidth}px`;
          div.style.top = `${offsetY - lineWidth / 2}px`;
          div.style.left = `${offsetX - lineWidth / 2}px`;
          div.style.pointerEvents = 'none';

          // パスが閉じているかどうかを判定
          if(isPathClosed(points)) {
            div.classList.add('add-show');
            div.removeChild(canvas);
          } else {
            container.removeChild(div);
          }
        } else {
          // マウスを動かさなかった時
          container.removeChild(div);
        }
      });

      // マウスがCanvas外に移動した場合も描画を終了
      canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
        container.removeChild(div);
      });
    });
  });
})(document, window);