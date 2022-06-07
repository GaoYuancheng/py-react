import request from '@/utils/request';

const headers = {
  'User-Agent': 'bilibili Security Browser',
  cookie: `buvid3=4FDA93D9-0F58-4029-A8D1-0D1842C474EC47163infoc; LIVE_BUVID=AUTO6115544515572103; stardustvideo=1; rpdid=|(k|Yk||m)mJ0J'ullY|kllJY; fts=1558618555; laboratory=1-1; im_notify_type_12808699=0; CURRENT_QUALITY=116; blackside_state=1; CURRENT_FNVAL=80; sid=8lsw2bqu; DedeUserID=12808699; DedeUserID__ckMd5=62fd8f47fd3865a2; SESSDATA=84f10d26%2C1617024662%2C7e72c*91; bili_jct=d472088c07367d3284837e74cb6f0752; _uuid=7D3D8ED1-B914-AC9B-DD3C-7A94896831F797865infoc; PVID=1; bp_video_offset_12808699=449579970912422592; bsource=search_baidu; bfe_id=1bad38f44e358ca77469025e0405c4a6`,
};

export const getBli = async (params: any, options = {}) => {
  const res = await request
    .get('http://45.113.201.36/api/ctf/2', {
      headers,
    })
    .then(data => console.log(data));
  return res;
};
