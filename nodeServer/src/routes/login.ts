
const login = (ctx) => {
  const { username = '', password = '' } = ctx.request.body
  if( username === 'admin' && password === '123456' ){
    ctx.session.isLogin = true
    ctx.response.body = {
      data: '登录成功'
    }
    ctx.response.session = {
      isLogin : true
    }

  }else {
    ctx.response.body = {
      message: '登录失败'
    }
  }
  
}

export default {
  'POST /login' : login
}


// test
// curl -d 'username=admin' -d 'password=123456' -X POST http://localhost:5000/login
// http://localhost:5000/login?username=admin&password=123456