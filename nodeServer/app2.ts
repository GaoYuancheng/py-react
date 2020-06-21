const Koa = require("koa");
const session = require("koa-session");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const routes = require("./src/routes");

app.keys = ["some secret hurr"];

const CONFIG = {
  key: "koa:sess", //默认
  maxAge: 86400000, //cookie过期时间
  autoCommit: true,
  overwrite: true, //默认
  httpOnly: true, //true表示只有服务端能获取cookie
  signed: true, //默认签名
  rolling: true, //在每次请求时强行设置cookie，这将重置cookie过期时间
  renew: false
};

app.use(session(CONFIG, app));

app.use(async (ctx, next)=> {
  console.log(ctx.session.username,ctx.session.userinfo, '请求')
  await next()
  console.log(ctx.session.username, ctx.session.userinfo, '响应')
})

router.get("/", async ctx => {
  console.log(ctx.session.userinfo);
  ctx.body = "fuck";
});

router.get("/news", async ctx => {
  console.log(ctx.session.userinfo);
  ctx.body = "news";
});
router.get('/clearSession', async ctx => {
  ctx.session = null
})
// router.post("/login", async ctx => {
//   ctx.session.userinfo = "JonSnow";
//   ctx.body = "login";
// });

for (let route in routes) {
  let method = route.split(" ")[0].toLowerCase();
  let url = route.split(" ")[1];
  router[method](url, routes[route]);
}

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080);
console.log("app started at port 8080...");