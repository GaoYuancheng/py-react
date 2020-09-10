const get401 = (ctx) => {
  ctx.status = 401;
  ctx.response.body = {
    data: {
      status: 401,
    },
  };
  ctx.append("Location", "http://127.0.0.1:5000/node/test");
};
const clearSession = (ctx) => {
  ctx.session = null;
  ctx.response.body = {
    data: {},
  };
};

const nodeTest = (ctx) => {
  ctx.status = 200;
  ctx.response.body = {
    data: {
      message: "nodeTest",
    },
  };
  // ctx.append("Location", "http://127.0.0.1:5000/node/test");
};

export default {
  "GET /get401": get401,
  "GET /node/test": nodeTest,
  "GET /clearSession": clearSession,
};
