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
};
export default cssOption;
