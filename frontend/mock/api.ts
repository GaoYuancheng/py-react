export default {
  // 支持值为 Object 和 Array
  'GET /mock/antdFormComponents/initialValues': {
    success: true,
    data: {
      input: 'input',
      editTable: [
        { id: 11, label: 11, value: 11 },
        { id: 21, value: 21, label: 21 },
      ],
    },
  },
  // GET 可忽略
  '/mock/antdFormComponents/allTableData': {
    success: true,
    data: {
      list: [
        { id: 1, label: 1, value: 1 },
        { id: 2, value: 2, label: 2 },
        { id: 3, label: 3, value: 3 },
        { id: 4, label: 4, value: 4 },
        { id: 5, label: 5, value: 5 },
        { id: 6, label: 6, value: 6 },
        { id: 7, label: 7, value: 7 },
        { id: 8, label: 8, value: 8 },
        { id: 9, label: 9, value: 9 },
      ],
      total: 9,
    },
  },
  // 支持自定义函数，API 参考 express@4
  // 'POST /api/users/create': (req, res) => {
  //   // 添加跨域请求头
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.end('ok');
  // },
};
