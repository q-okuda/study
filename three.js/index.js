((d, w) => {
  w.addEventListener('DOMContentLoaded', () => {
    init();
    sphere();
  });

  // レンダラーのサイズを設定。
  const width = 960;
  const height = 540;
  let rot = 0; //角度
  let mouseX = 0; // マウス座標

  // マウス座標はマウスが動いた時のみ取得できる
  d.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
  });

  function init() {
    const canvas = d.querySelector('#myCanvas');

    // 1.レンダラーを作る。
    // WebGLのレンダリングをするためのレンダラーを作成。
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });

    renderer.setSize(width, height);
    // SPでも綺麗に見えるよう、デバイスピクセル比を設定。（これがないとSPでぼやける。）
    renderer.setPixelRatio(w.devicePixelRatio);

    // 2.シーンを作る。
    // シーンを作成。シーンはオブジェクトや光源などの置き場。
    const scene = new THREE.Scene();

    // 3.カメラを作る。
    // Three.jsではカメラを作成し、その視点から見えるものがレンダラーを介してcanvas要素へ描画される。
    // THREE.PerspectiveCameraに画角、アスペクト比、描画開始距離、描画終了距離の4つの情報を引数として渡し、カメラを作成する。
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    // カメラの初期座標を設定(X:0, Y:0, Z:0)
    camera.position.set(0, 0, 2000);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls(camera, canvas);

    // 4.立方体を作る。
    // 立方体はメッシュという表示オブジェクトを使用して作成する。メッシュを作るには、ジオメトリ（形状）とマテリアル（素材）を用意する必要がある。
    // ジオメトリ・・・頂点情報や面情報を持っている。さまざまなジオメトリが用意されている。
    const geometry = new THREE.BoxGeometry(500, 500, 500);// 幅、高さ、奥行き
    const material = new THREE.MeshStandardMaterial({ color: 0xE87A90 });
    // 作成したジオメトリとマテリアルを使ってメッシュを作る。
    const box = new THREE.Mesh(geometry, material);
    // シーンに追加
    scene.add(box);

    // 5.ライトを作る。
    const light = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0);// 色
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1); // ライトの方向 x, y ,z
    // シーンに追加
    scene.add(light);

    // 6.描画する。
    // renderer.render()メソッドに先ほど作成したシーンとカメラを引数に渡すことで初めてcanvasに描かれる。
    renderer.render(scene, camera);

    // 7.アニメーション
    // renderer.render()を一度実行しただけでは、canvasに一度描かれるだけなので更新はされない。

    tick();

    function tick() {
      requestAnimationFrame(tick);

      // 箱を回転させる。
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      // レンダリング
      renderer.render(scene, camera);
    }
  }


  // 球体
  function sphere() {
    const canvas = d.querySelector('#sphereCanvas');

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // フォグを設定
    // new THREE.Fog(色, 開始距離, 終点距離);
    scene.fog = new THREE.Fog(0x000000, 2000, 2800);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, +2000);

    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    //width, height, depth（奥行き）, radius（半径）, segmentsW（横方向の分割数）, segmentsH（縦方向の分割数）
    // 画像を読み込む
    const loader = new THREE.TextureLoader();
    const texture = loader.load('earth.jpg');
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    // const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

    // 星屑を作成します (カメラの動きをわかりやすくするため)
    createStarField();

    /** 星屑を作成します */
    function createStarField() {
      // 頂点情報を作詞絵
      const vertices = [];
      for (let i = 0; i < 1000; i++) {
        const x = 3000 * (Math.random() - 0.5);
        const y = 3000 * (Math.random() - 0.5);
        const z = 3000 * (Math.random() - 0.5);

        vertices.push(x, y, z);
      }

      // 形状データを作成
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      // マテリアルを作成
      const material = new THREE.PointsMaterial({
        size: 10,
        color: 0xffffff,
      });

      // 物体を作成
      const mesh = new THREE.Points(geometry, material);
      scene.add(mesh);
    }

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // rot += 0.25; // 毎フレーム角度を0.5度ずつ足していく
      canvas.addEventListener('mousemove', () => {
        // マウスの位置に応じて角度を設定
        // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
        const targetRot = (mouseX / innerWidth) * 360;
        // イージングの公式を用いて滑らかにする
        // 値 += (目標値 - 現在の値) * 減速値
        rot += (targetRot - rot) * 0.02;
      });

      // ラジアンに変換する
      const radian = (rot * Math.PI) / 180;
      // 角度に応じてカメラの位置を設定
      camera.position.x = 2000 * Math.sin(radian);
      camera.position.z = 2000 * Math.cos(radian);
      // 原点方向を見つめる
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // レンダリング
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    }
  }
})(document, window);