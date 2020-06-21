import login from './login'
import session from './session'

const nodeTestGet = async (ctx, next)  => {
  ctx.response.body = {
    data: {
      msg: 'ok',
    }
  }
}

const nodeTestPost = async (ctx, next)  => {
  console.log(ctx.request.body)
  ctx.response.body = 'post sss'
}


// export default {
//   'GET /nodeTestGet': nodeTestGet,
//   'POST /nodeTestPost': nodeTestPost,
//   ...login
// }

module.exports = {
  'GET /nodeTestGet': nodeTestGet,
  'POST /nodeTestPost': nodeTestPost,
  ...login,
  ...session

}

//test 
// curl localhost:5000/nodeTestGet