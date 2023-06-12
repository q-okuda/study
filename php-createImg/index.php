<?php
// 画像の幅と高さ
$width = 400;
$height = 400;

// 背景色をランダムに生成
$red = rand(0, 255);
$green = rand(0, 255);
$blue = rand(0, 255);

// 画像を作成
$image = imagecreate($width, $height);

// 背景色を設定
$bgColor = imagecolorallocate($image, $red, $green, $blue);
imagefill($image, 0, 0, $bgColor);

// RGB値を文字列に変換
$rgbText = "RGB($red, $green, $blue)";

// テキストを追加
$textColor = imagecolorallocate($image, 255 - $red, 255 - $green, 255 - $blue);
$textX = ($width - 6.5 * strlen($rgbText)) / 2; // テキストの幅が7文字分であることによる計算式
$textY = ($height - 20) / 2; // テキストの高さは画像の中央にする
imagestring($image, 5, $textX, $textY, $rgbText, $textColor);

// ファイル名をタイムスタンプで指定
$file_name = 'sample_' . time() . '.png';

// 画像を保存
imagepng($image, $file_name);

// 画像の破棄
imagedestroy($image);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Sample Image</title>
</head>
<body>
	<!-- PHPで作成した画像を表示 -->
	<img src="<?php echo $file_name ?>" alt="Sample Image">
</body>
</html>
