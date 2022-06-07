import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'umi';
import { Button } from 'antd';
import './index.less';

/**
 * 券卡片渲染数据
 */
interface IDirectVoucher {
  /** 标题 */
  title?: string;
  /** 副标题 */
  subTitle?: string;
}

const cardDataList: IDirectVoucher[] = [
  {
    title: '杭州市通用5元券',
    subTitle:
      '杭味面馆非常好吃，太好吃了，相当不错，味道鲜美，特别划算，快快抢购，聚划算',
  },
  {
    title: '杭州市10元券',
    subTitle: '兰州拉面非常好吃',
  },
];

interface ICardProps {
  data: IDirectVoucher;
}

const CardBugBtn: React.FC = props => {
  const [countdown, setCountdown] = useState<number>(10);
  const [canBuy, setCanBuy] = useState<boolean>(true);

  const timerRef = useRef<NodeJS.Timeout>();
  const isCounting = countdown > 0;

  useEffect(() => {
    if (isCounting) {
      timerRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown]);

  if (isCounting) {
    return (
      <div className={`card-btn ${isCounting ? 'not-allow' : ''}`}>
        {isCounting ? `${countdown}s` : '抢购'}
      </div>
    );
  } else {
    const buyMock = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(undefined);
        }, 1000);
      });
    };

    const buy = async () => {
      await buyMock().then(() => {
        setCanBuy(false);
      });
    };

    return (
      <div onClick={buy} className="card-btn">
        {canBuy ? '抢购' : '已抢完'}
      </div>
    );
  }
};

const CardReact: React.FC<ICardProps> = props => {
  const { data } = props;

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-title">{data.title}</div>
        <div className="card-sub-title ellipsis-two-lines">{data.subTitle}</div>
      </div>
      <CardBugBtn />
    </div>
  );
};

const Home: React.FC<{ list: IDirectVoucher[] }> = props => {
  return (
    <>
      {cardDataList.map(data => (
        <CardReact key={data.title} data={data} />
      ))}
    </>
  );
};

export default Home;
