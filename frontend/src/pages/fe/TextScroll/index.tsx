import React, { useEffect, useRef, useState } from '@alipay/bigfish/react';
// import styles from './index.less';

let timer: any = null;
const transitionTime = 300;
let scrollX = 0;
const marginRight = 48;
const setScrollX = (value: number) => {
  scrollX = value;
};

interface TextScrollProps {
  text?: string;
}

const TextScroll: React.FC<TextScrollProps> = ({ text }) => {
  const textArea = useRef<any>();
  const textAreaCopy = useRef<any>();
  const textContent = useRef<any>();

  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const initWidth = textArea.current.scrollWidth;
    if (initWidth > 404) {
      if (timer) clearInterval(timer);
      textAreaCopy.current.innerText = text;
      textContent.current.style.marginRight = `${marginRight}px`;

      timer = setInterval(() => {
        const newScrollX = scrollX - 10;

        setScrollX(newScrollX);
        if (-scrollX > initWidth + marginRight - 10) {
          setRefreshCount((prev) => {
            scrollX = 0;

            return prev + 1;
          });
        }
        textArea.current.style.transform = `translateX(${scrollX}px)`;
      }, transitionTime);
    } else {
      textContent.current.style.marginRight = 0;
      setRefreshCount((prev) => {
        scrollX = 0;
        return prev + 1;
      });
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [text]);

  // https://zhuanlan.zhihu.com/p/96030406?from_voters_page=true

  return (
    <div
      // className={styles.textScroll}
      key={refreshCount}
    >
      <div
        ref={textArea}
        style={{
          transition: `all ${transitionTime / 1000}s linear`,
          transform: `translateX(${scrollX}px)`,
        }}
      >
        <span ref={textContent}>{text}</span>
        <span ref={textAreaCopy} />
      </div>
    </div>
  );
};

export default TextScroll;
