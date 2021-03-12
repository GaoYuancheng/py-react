import { defineConfig } from 'umi';
import { menuConfig, routes } from '../src/menuConfig';

export default defineConfig({
  antd: {},
  dva: {
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  hash: true,
  headScripts: [
    // 'https://d3js.org/d3.v5.min.js'
  ],
  // analyze: {
  //   analyzerMode: 'server',
  //   analyzerPort: 8888,
  //   openAnalyzer: true,
  //   // generate stats file while ANALYZE_DUMP exist
  //   generateStatsFile: false,
  //   statsFilename: 'stats.json',
  //   logLevel: 'info',
  //   defaultSizes: 'parsed', // stat  // gzip
  // },
  //前端处理跨域
  proxy: {
    '/api': {
      target: 'http://localhost:5000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },

    // '/toutiaoProxy': {
    //   target: 'https://index.toutiao.com/api/keyword/trends/',
    //   changeOrigin: true,
    //   pathRewrite: { '^/toutiaoProxy': '' },
    // },
  },
  chunks: ['vendors', 'umi'],
  chainWebpack(config, { env, webpack, createCSSRule }) {
    // 设置 alias
    // memo.resolve.alias.set('foo', '/tmp/a/b/foo');
    // console.log(env);
    // memo.optimization.splitChunks({
    //   chunks: 'all',
    //   name: 'common',
    // });
    // memo.optimization.runtimeChunk('multiple');
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '.',
          // name: true,
          minSize: 30000,
          minChunks: 1,
          cacheGroups: {
            // react: {
            //   name: 'react',
            //   test: /[\\/]node_modules[\\/](react)[\\/]/,
            //   priority: -9,
            //   enforce: true,
            // },
            reactDom: {
              name: 'react-dom',
              test: /react-dom/,
              priority: -9,
              enforce: true,
            },
            lodash: {
              name: 'lodash',
              test: /lodash/,
              priority: -9,
              enforce: true,
            },
            codemirror: {
              name: 'codemirror',
              test: /codemirror/,
              priority: -9,
              enforce: true,
            },
            // echarts: {
            // name: 'echarts',
            // test: /[\\/]node_modules[\\/](echarts)[\\/]/,
            // priority: -9,
            // enforce: true,
            // },
            antd: {
              name: 'antd',
              test: /(@antd|antd|@ant-design)/,
              priority: -10,
              enforce: true,
            },
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: -11,
              enforce: true,
            },
          },
        },
      },
      plugins: [],
    });
  },
});

// File                                Size               Gzipped

// dist/common.820c30a5.async.js       1.2 MB             412.6 KB
//  dist/umi.96b46430.async.js          48.0 KB            14.1 KB
// dist/runtime~umi.5bbd0ca2.js          1.5 KB             730.0 B
// dist/common.8a10784a.chunk.css      505.7 KB           64.4 KB
// dist/umi.e048a71a.chunk.css         3.9 KB             1.0 KB
