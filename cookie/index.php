<?php
$visitedLimit = 60 * 60 * 24 * 1;

// isset() 変数がセットされているかを調べる。
if (isset($_COOKIE["visited"])) {
  $count = $_COOKIE["visited"] + 1;
} else {
  $count = 1;
}

// setCoolkieの第三引数に保存期間を設定する。秒単位で
setcookie("visited", $count, time() + $visitedLimit);

if (isset($_COOKIE["stamp"])) {
  $stamp = $_COOKIE["stamp"];
} else {
  $stamp = 0;
}

setcookie("stamp", $stamp, time() + 10);

// nameがstampedのボタンが押されたとき。
if (isset($_POST["stamped"])) {
  if (!isset($_COOKIE["limit"])) {
    $stamp = $_COOKIE["stamp"] + 1;
    setcookie("stamp", $stamp, time() + 10);
    setcookie("limit", true, time() + 3);
    if ($stamp == 5) echo "満タンになりました。";
  } else {
    echo "3秒以内に2度は押せません。";
  }
}

?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cookie</title>
</head>

<body>
  <h1>cookie</h1>
  <p>cookieは有効期限を指定しない場合、クライアント側のブラウザが閉じてしまうと消える。ブラウザが閉じてもクッキーを一定期間残しておきたい場合には明示的に有効期限を設定する。
  </p>

  <form action="index.php" method="post">
    <button type="submit" name="stamped">スタンプを押す</button>
  </form>

  <?php
  echo '<p>本日の訪問回数は' . $count . '回目です</p>';
  echo '<p>スタンプは' . $stamp . '個です</p>';
  ?>
</body>

</html>