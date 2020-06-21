import { defineConfig } from 'umi';
import {menuConfig, routes} from '../src/menuConfig'

export default defineConfig({
  antd: {},
  dva: {
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  headScripts: [
    // 'https://d3js.org/d3.v5.min.js'
  ],
  //前端处理跨域
  proxy: {
    '/api': {
      target: 'http://localhost:5000/',
      changeOrigin: true,
      pathRewrite: { '^/api' : '' },
    },

    // '/toutiaoProxy': {
    //   target: 'https://index.toutiao.com/api/keyword/trends/',
    //   changeOrigin: true,
    //   pathRewrite: { '^/toutiaoProxy': '' },
    // },
  },
});
