const glob = require('glob');
const path = require('path');

const ENTRY = 'main.js';
const PAGE_FLODER = path.resolve(__dirname, './pages/');
const PAGES = PAGE_FLODER + '/**/' + ENTRY;

/**
 * 初始化 pages 下所有的页面
 *
 * @returns
 */
function initPages() {
  const pages = {};
  glob.sync(PAGES).forEach((entry) => {
    const pageName = getPageName(entry);
    pages[pageName] = {
      name: pageName,
      entry: entry
    };
  });

  return pages;
}

/**
 * 获取目录名字
 *
 * @param {*} filePath
 * @returns
 */
function getPageName(filePath) {
  return filePath.substring(PAGE_FLODER.length + 1, filePath.indexOf(ENTRY) - 1);
}

// vue config 配置
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/testpages/' : '/',
  pages: initPages(),
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api/NetflowMarketForWx': {
        target: 'https://wxxcs.hl139.net/api/NetflowMarketForWx',
        ws: false,
        changeOrigin: true
      },
    }
  }
};
