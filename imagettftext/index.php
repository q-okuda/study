<?php
$file = './img1.jpg';
$newfile = './img1_width_text.jpg';
$image = imagecreatefromjpeg($file);
$text = 'ポッピングシャワー';
$fontfile ='./NotoSansJP-VariableFont_wght.ttf';
$color = imagecolorallocate($image, 255, 255, 255);
$imageSize = getimagesize($file);
$imageWidth = $imageSize[0];
$imageHeight = $imageSize[1];
$pt_to_px = 0.75;

// フォントサイズ計算
$fontSize = $imageHeight / mb_strlen($text) * ($imageWidth / $imageHeight) * $pt_to_px;
if($fontSize > 72) { $fontSize = 72; }

// テキストボックスサイズ計算
$textBox = imagettfbbox($fontSize, 0, $fontfile, $text);
$textWidth = $textBox[2] - $textBox[0];
$textHeight = $textBox[1] - $textBox[7];

// テキスト設置座標計算
$x = ($imageWidth - $textWidth) / 2;
$y = $imageHeight  - $textHeight / 4;
$angle = 0;

imagettftext($image, $fontSize, $angle, $x, $y, $color, $fontfile, $text);
imagejpeg($image, $newfile);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>テキスト画像合成</title>
</head>
<body>
  <img src="<?php echo $newfile ?>" alt="">
  <img src="https://www.31ice.co.jp/flcontest/compo/index.php/A:01:01:01:01:01/pc/" alt="">
</body>
</html>

<!-- 
[ジェネレート画像について]
前回の画像生成URLを流用を想定しています。
今回は背景画像も追加するとのことでしたので、その際は背景画像の値も追加してバックエンド側で画像生成をお願いします。
フロント側から下記に対応した値を送信するよう実装いたします。

A:01:01:01:01:01:〇〇
リボン型:フレーバー１:フレーバー2:イングレ１:イングレ２:リボン味:背景

[フレーバー名を含めた画像生成について]
今回は画像内にフレーバー名も載せるとのことで、フレーバー名にはwebフォントを使用する予定です。
その際は、ttfデータをサーバー内に設置してご使用ください。
フロント側から先ほどのデータに加えてフレーバー名を送信しますので、アイス画像＋テキストの形で画像生成をお願いします。
-->