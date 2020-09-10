// 格式化返回对象
const resFormat = async (ctx, next) => {
  await next();
  const { data, message } = ctx.response.body || {};

  if (data) {
    ctx.response.body = {
      success: true,
      data,
    };
  } else {
    ctx.response.body = {
      success: false,
      message,
    };
  }
};

module.exports = resFormat;
