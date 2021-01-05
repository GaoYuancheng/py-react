// 如果有返回有data 则自动加上success: true

import login from "./login";
import session from "./session";
import httpStatus from "./httpStatus";
import cache from "./cache";

const nodeTestGet = async (ctx, next) => {
  ctx.response.body = {
    data: {
      msg: "ok",
    },
  };
};

const nodeTestPost = async (ctx, next) => {
  // console.log(ctx.request.body)
  ctx.response.body = "post sss";
};

// export default {
//   'GET /nodeTestGet': nodeTestGet,
//   'POST /nodeTestPost': nodeTestPost,
//   ...login
// }

module.exports = {
  "GET /nodeTestGet": nodeTestGet,
  "POST /nodeTestPost": nodeTestPost,
  ...login,
  ...session,
  ...httpStatus,
  ...cache,
};

//test
// curl localhost:5000/nodeTestGet
