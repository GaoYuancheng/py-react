const getCache = (ctx) => {
  ctx.response.body = {
    data: {
      isCache: true,
    },
  };
  // ctx.status = 403;
  ctx.append("Cache-Control", "max-age=10");
};

const clearCache = (ctx) => {
  ctx.response.body = {
    data: {},
  };
};

export default {
  "GET /getCache": getCache,
  "GET /clearCache": clearCache,
};
