import request from '@/utils/request'

export const getInitialValues = async (params:any = {}, options = {}) => {
  const res = await request.get('/mock/antdFormComponents/initialValues',{params,...options})
  return res
}

export const getAllTableData = async (params:any = {}, options = {}) => {
  const res = await request.get('/mock/antdFormComponents/allTableData',{params,...options})
  return res
}

 