((d, w) => {
  // 型一覧 https://qiita.com/t0daaay/items/a6f9106800488a622fbb

  // 明示的に型定義
  interface User {
    name: string;
    id: number;
    admin: boolean;
  }

  const user: User = {
    name: 'aiichiro',
    id: 0,
    admin: true,
  };

  // 引数と戻り値に型をつけられる。戻り値は型推論してくれるが、引数は何もしないとany型になってしまう。
  logUser(user);
  function logUser(user: User) {
    console.log({ user });
    return user;
  }

  function logHello(): void {
    console.log('Hello');
  }

  // 自分で型を作成
  type LockStates = 'locked' | 'unlocked';
  logLockState('locked');
  function logLockState(lockStates: LockStates) {
    console.log({ lockStates });
  }

  // ジェネリクス https://nextribe.co.jp/keita/typescript-generics
  type NumberArray = Array<number>;
  logNumberArray([1, 2, 3]);
  function logNumberArray(numArray: NumberArray) {
    console.log({ numArray });
  }

  // Genericsは抽象的な型引数を使用して、実際に利用されるまで型が確定しないクラス・関数・インターフェイスを実現する為に使用されます。
  function test<T>(arg: T): T {
    return arg;
  }
  test<number>(1);
  test<string>('test');



  // 宣言時の変数に方の注釈をつけることを型アノテーションという。
  // 下記のように複雑になったら見通しが悪くなる。
  // let apple: { nickName: string; isHuman: boolean; level: number } = {
  //   nickName: 'りんご",
  //   isHuman: true,
  //   level: 0
  // };

  // interfaceでの型定義
  interface Team {
    nickName: string;
    isHuman: boolean;
    level: number;
  }

  let appleTeam: Team = {
    nickName: 'りんご',
    isHuman: true,
    level: 0
  };

  // typeでの型定義
  type Team2 = {
    nickName: string;
    isHuman: boolean;
    level: number;
  };
  
  let orangeTeam: Team2 = {
    nickName: 'オレンジ',
    isHuman: true,
    level: 0
  };
  
  // interfaceとtypeの違い
  // interface  宣言
  // type       代入

  // 以下のような型定義はinterfaceではできない。
  type Color = '白' | '黒' | '赤' | '緑';
  let color: Color = '白';
  color = '青';

  type test = {
    color: 'しろ' | '青'
  }

  const testtest: test = {
    color: "青"
  }

  // interfaceは拡張できる。typeではできない。
  interface party {
    name: string;
  }
  
  interface party {
    level: number;
  }
  
  const member: party = {
    name: 'hero',
    level: 0
  };
  
  const member2: party = {
    name: 'monk'
  };

  // typeでも拡張っぽいことはできる。
  type ErrorHandling = {
    success: boolean;
    error?: { message: string };
  };
  
  type ArtistsData = {
    artists: { name: string }[];
  };
  
  type ArtistsResponse = ArtistsData & ErrorHandling;
  
  const dummyData: ArtistsResponse = {
    artists: [{ name: "apple" }, { name: "banana" }],
    success: true
  };

})(document, window);
