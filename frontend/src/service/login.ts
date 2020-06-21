import request from '@/utils/request'

export const login = async ( params: any, options = {}) => {
  const res = await request.post('/login',{data: params,...options})
  return res
}