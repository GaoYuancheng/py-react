import request from '@/utils/request';

export const getNodeTest = async (params: any, options = {}) => {
  const res = await request.get('/nodeTestGet', { params, ...options });
  return res;
};

export const postNodeTest = async (params: any, options = {}) => {
  const res = await request.post('/nodeTestPost', { data: params, ...options });
  return res;
};

export const getSession = async (params: any, options = {}) => {
  const res = await request.get('/getSession', { params, ...options });
  return res;
};

export const clearSession = async (params: any, options = {}) => {
  const res = await request.get('/clearSession', { params, ...options });
  return res;
};
export const get401 = async (options = {}) => {
  const res = await request.get('/get401', { ...options });
  return res;
};

export const getCache = async (options = {}) => {
  const res = await request.get('/getCache', { ...options });
  return res;
};

export const clearCache = async (options = {}) => {
  const res = await request.get('/clearCache', { ...options });
  return res;
};
// export const clearSession = async ( params: any, options = {}) => {
//   const res = await request.get('/clearSession',{params,...options})
//   return res
// }
