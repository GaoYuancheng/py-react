import * as Koa from "koa"; //不这么写就没有提示
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
// const Koa = require("koa");

// import middleWares from './middleWares'
const middleWares = require("./middleWares");
const routes = require("./routes");

// 注意require('koa-router')返回的是函数:
const Koa_Logger = require("koa-logger");
const router = require("koa-router")();
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const Koa_Session = require("koa-session"); // 导入koa-session

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 配置session

app.keys = ["some secret hurr"]; // 这个是配合signed属性的签名key
const session_config = {
  key: "koa:sess1", //默认
  maxAge: 400000, //cookie过期时间
  autoCommit: true,
  overwrite: true, //默认
  // httpOnly: true, //true表示只有服务端能获取cookie
  signed: false, //默认签名
  rolling: true, //在每次请求时强行设置cookie，这将重置cookie过期时间
  renew: false,
  // sameSite: "None",
  // secure: false,
};

// 使用中间件，注意有先后顺序
app.use(Koa_Session(session_config, app));

app.use(Koa_Logger());

// 配置跨域
app.use(
  cors({
    credentials: true, //是否允许发送Cookie
  })
);

// 配置post请求的处理
app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log("请求 => 第一层中间件", ctx.session.isLogin, ctx.request.url);

  if (ctx.session.isLogin || ctx.request.url === "/login") {
    await next();
  } else {
    await next();
    ctx.response.body = {
      success: false,
      message: "用户未登录",
    };
    ctx.status = 401;
    // ctx.redirect("/getSession");
    // 未登录自动重定向到登录页面
    // ctx.append("Location", "http://127.0.0.1/node/test");
  }
  // TODO: 怎么设置cookie 的samesite 和secure属性

  console.log("响应 => 第一层中间件");
});

app.use(async (ctx, next) => {
  console.log("请求 => 第二层中间件");
  await next();
  console.log("响应 => 第二层中间件");
});

app.use(async (ctx, next) => {
  console.log("请求 => 第三层中间件");
  // console.log(ctx.response.body, "响应前");
  await next();
  // console.log(ctx.response.body, "响应后");
  console.log("响应 => 第三层中间件");
});

// 批量导入中间件
middleWares.forEach((middleWare) => app.use(middleWare));

// 配置路由

for (let route in routes) {
  let method = route.split(" ")[0].toLowerCase();
  let url = route.split(" ")[1];
  router[method](url, routes[route]);
}

app.use(router.routes()).use(router.allowedMethods());

// 在端口5000监听:
// app.listen(5000);
app.listen(5000);

console.log("app started at port 5000...");
// console.log(app.callback())
