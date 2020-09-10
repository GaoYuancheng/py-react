// 泛型相关
interface Person {
  name?: string;
  age: number;
  location: string;
}
interface PersonPro {
  [x: string]: Person;
}

const personPro: PersonPro = {
  s: {
    name: '1',
    age: 1,
    location: '2',
  },
  a: {
    name: '1',
    age: 1,
    location: '2',
  },
};

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof PersonPro; // string | number

type Result1 = 'true';
type Result2 = 'false';
type Interface1 = 'a' | 'b';
type Interface2 = 'a' | 'b' | 'c';
type Interface3 = 'd';
type Interface4 = {
  a: number;

} 
type Interface5 = {
  a: number;
  b: string;
  c: string
};
type ResultContain1 = Interface2 extends Interface1 ? Result1 : Result2; // 'false'
type ResultContain2 = Interface1 extends Interface2 ? Result1 : Result2; // 'true'
type ResultContain3 = Interface1 extends Interface3 ? Result1 : Result2; // 'false'
// TODO: 为啥
type ResultContain4 = Interface4 extends Interface5 ? Result1 : Result2; // 'false'

type PartialPerson = Partial<Person>
type RequiredPerson = Required<Person>

interface Length {
  length: number;
}


function identity2<T extends Length>(arg: T): T {
  console.log(arg.length); // 可以获取length属性
  return arg;
}
