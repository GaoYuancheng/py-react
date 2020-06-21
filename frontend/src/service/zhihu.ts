import request from '@/utils/request'

export const getData = async (params:any, options = {}) => {
  const res = await request.get('/zhihuHot',{params, ...options})
  return res
}

 