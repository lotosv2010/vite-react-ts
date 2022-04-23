import { CSSOptions } from 'vite';

const createCss = (): CSSOptions => {
  return {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {
        additionalData: '@import "./src/styles/index.scss";',
      },
    },
    modules: {
      // 样式小驼峰转化
      // css: goods-list => tsx: goodsList
      localsConvention: 'camelCase',
    },
  };
};

export default createCss;
