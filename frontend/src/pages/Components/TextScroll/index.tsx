import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';

let timer: any = null;
let transtionTime = 700;
// let scrollX = 0;
// const setScrollX = (value: number) => {
//   scrollX = value;
// };

const TextScroll = () => {
  const [scrollX, setScrollX] = useState(0);
  const textArea = useRef<any>();

  useEffect(() => {
    timer = setTimeout(() => {
      let newScrollX = scrollX - 10;
      console.log(newScrollX);

      setScrollX(newScrollX);
      // console.log(textArea.current.style);
      // let currentX =
      // textArea.current.style.transform=
      clearTimeout(timer);
    }, transtionTime);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [scrollX]);

  //https://zhuanlan.zhihu.com/p/96030406?from_voters_page=true
  console.log('render', scrollX);

  return (
    <div className={styles.textScroll} key={scrollX}>
      <div
        ref={textArea}
        // className={styles.content}
        style={{
          // transform: `translateX(0)`,
          // transition: `all ${transtionTime / 1000}s linear`,
          transform: `translateX(${scrollX}px)`,
        }}
      >
        我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告
      </div>
    </div>
  );
};

export default TextScroll;
