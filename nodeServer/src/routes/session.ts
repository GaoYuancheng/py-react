const getSession = ctx => {
  ctx.response.body = {
    data: {
      session: ctx.session
    }
  };
  // ctx.status = 403;
};
const clearSession = ctx => {
  ctx.session = null;
  ctx.response.body = {
    data: {}
  };
};

export default {
  "GET /getSession": getSession,
  "GET /clearSession": clearSession
};
