declare module '*.css';
declare module '*.less';
declare module '*.png';

// type Record1<K extends number | symbol, T> = {
//   [P in K]: T;
// };

type keys = 'hobbyu' | '2';

type Infos = Record1<keys, string>;
