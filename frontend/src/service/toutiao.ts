import request from '@/utils/request'

export const getData = async (params:any, options = {}) => {
  const res = await request.post('/toutiaoIndex',{data:params,...options})
  return res
}

 