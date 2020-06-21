// import * as Koa from "koa" //不这么写就没有提示
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
// import routes from './routes'
import middleWares from './middleWares'

// 注意require('koa-router')返回的是函数:
const router = require("koa-router")();
const cors = require("koa-cors");
const bodyParser = require("koa-bodyparser");
const Koa_Session = require('koa-session');   // 导入koa-session  

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 配置session

   
app.keys = ["some secret hurr"];  // 这个是配合signed属性的签名key
const session_config = {
  key: "koa:sess", //默认
  maxAge: 4000, //cookie过期时间
  autoCommit: true,
  overwrite: true, //默认
  httpOnly: true, //true表示只有服务端能获取cookie
  signed: true, //默认签名
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间
  renew: false
};

// 使用中间件，注意有先后顺序
app.use(Koa_Session(session_config, app));

// 异常处理
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     ctx.app.emit("error", err);
//     ctx.body = "server error";
//     ctx.status = err.status || 500;
//   }
// });


// 配置跨域
app.use(cors());

// 配置post请求的处理
app.use(bodyParser());

app.use( async (ctx, next) => {
  console.log('请求 => 第一层中间件', ctx.session.isLogin )
  if( ctx.session.isLogin || ctx.request.url === '/login' ){
    await next()
  }else {
    ctx.response.body = {
      message: '用户未登录'
    }
  }
  console.log('响应 => 第一层中间件')
})

app.use( async (ctx, next) => {
  console.log('请求 => 第二层中间件')
  await next()
  console.log('响应 => 第二层中间件')
})

app.use( async (ctx, next) => {
  console.log('请求 => 第三层中间件')
  console.log(ctx.response.body,'响应前')
  await next()
  console.log(ctx.response.body, '响应后')
  console.log('响应 => 第三层中间件', )
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('set-cookie', 'hh=22')
})

// 批量导入中间件
middleWares.forEach(middleWare => app.use(middleWare))

// 配置路由


// 编写接口 -- 如果是module.export的就这么写
const routes = require("./routes");

for (let route in routes) {
  let method = route.split(" ")[0].toLowerCase();
  let url = route.split(" ")[1];
  router[method](url, routes[route]);
}

app.use(router.routes()).use(router.allowedMethods());




// 在端口5000监听:
app.listen(5000);
console.log("app started at port 5000...");
