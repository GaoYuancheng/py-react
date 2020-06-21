import request from '@/utils/request'

export const upload = async (params:any, options = {}) => {
  const res = await request.post('/upload',{data:params,...options})
  return res
}

 