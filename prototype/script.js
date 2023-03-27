// 'use strict';

// prototype
// jsでは全てのオブジェクトが「プロトタイプ」をベースに作られている。
// プロトタイプと呼ばれる最小テンプレートがあり、それをコピーして新しいオブジェクトを作るイメージ。

console.log(this);

var User = function (name, age) {
  this.name = name || '匿名';
  this.age = age || '秘密';
  // this.hello = function () {
  //   return `こんにちは！私は${this.name}、${this.age}歳です。（インスタンスメソッド）`;
  // };
};

User.prototype = {
  hello: function () {
    return `こんにちは！私は${this.name}、年齢は${this.age}です。`;
  },
};
// prototypeでメソッドを定義するメリット・・・
// インスタンス化する度にメモリが圧迫されない。

var taro = new User('taro', '20歳');
var nanashi = new User();
console.log(taro.hello());
console.log(nanashi.hello());

var Member = function (name, age, id) {
  User.call(this, name, age); //親クラスの呼び出し
  this.id = id;
};
Member.prototype = Object.create(User.prototype, {
  value: { constructor: User },
});
// Object.create()は、指定したprototypeオブジェクトを引き継いだ新たなオブジェクトを生成する関数です。
// 2つ目の引数は生成したprototypeオブジェクトに持たせるプロパティを指定するハッシュオブジェクトです。
// ここで設定できるプロパティは決められおり、詳細はこちらで確認。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
console.log(Member.prototype);

var minoru = new Member('minoru', '30歳', '1');
console.log(minoru);
console.log(minoru.hello());
