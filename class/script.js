class Human {
  // constructorメソッド
  constructor(name) {
    this.name = name;
  }

  // prototypeメソッド
  hello() {
    console.log('私の名前は' + this.name + 'です');
  }

  // staticメソッド
  static num_of_hands() {
    console.log(2);
  }
}

// prototypeメソッドの呼び出し
const taro = new Human('太郎');
taro.hello(); //=> '私の名前は太郎です'

// staticメソッドの呼び出し
Human.num_of_hands(); //=> 2

class Animal {
  constructor(name, voice) {
    this.name = name;
    this.voice = voice;
  }

  speak() {
    console.log(`${this.name}:「${this.voice}」`);
  }
}

// 継承
class Dog extends Animal {
  speak() {
    console.log(`${this.name}: わんわん！`);
  }
}

const pochi = new Dog('ポチ');
pochi.speak(); //=>ポチ: わんわん！
