import { CSSOptions } from 'vite';
const cssOption: CSSOptions = {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
    },
    scss: {
      additionalData: '@import "./src/styles/variable.scss";',
    },
  },
  modules: {
    // 样式小驼峰转化
    // css: goods-list => tsx: goodsList
    localsConvention: 'camelCase',
  },
};
export default cssOption;
