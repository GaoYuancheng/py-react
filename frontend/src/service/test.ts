import request from '@/utils/request'

export const getNodeTest = async ( params: any, options = {}) => {
  const res = await request.get('/nodeTestGet',{params,...options})
  return res
}

export const postNodeTest = async ( params: any, options = {}) => {
  const res = await request.post('/nodeTestPost',{data: params,...options})
  return res
}

export const getSession = async ( params: any, options = {}) => {
  const res = await request.get('/getSession',{params,...options})
  return res
}

export const clearSession = async ( params: any, options = {}) => {
  const res = await request.get('/clearSession',{params,...options})
  return res
}