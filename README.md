# vite-react-ts

vite-react-ts-antd 项目模板

## 一、项目初始化

```shell
# npm 6.x
npm create vite@latest vite-react-ts --template react-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest vite-react-ts -- --template react-ts

# yarn
yarn create vite vite-react-ts --template react-ts

# pnpm
pnpm create vite vite-react-ts -- --template react-ts
```

## 二、项目目录规划

```shell
src
├── main.tsx
├── assets // 静态资源，会被打包优化
│   ├── favicon.svg
│   └── logo.svg
├── common // 公共配置，比如统一请求封装，session 封装
│   ├── http-client
│   └── session
├── components // 全局组件，分业务组件或 UI 组件
│   ├── Toast
├── config // 配置文件目录
│   ├── index.ts
├── hooks // 自定义 hook
│   └── index.ts
├── layouts // 模板，不同的路由，可以配置不同的模板
│   └── index.tsx
├── lib // 通常这里放置第三方库，比如 jweixin.js、jsBridge.js
│   ├── README.md
│   ├── jsBridge.js
│   └── jweixin.js
├── pages // 页面存放位置
│   ├── components // 就近原则页面级别的组件
│   ├── home
├── routes // 路由配置
│   └── index.ts
├── store // 全局状态管理
│   ├── common.ts
│   ├── index.ts
│   └── session.ts
├── styles // 全局样式
│   ├── global.less
│   └── reset.less
└── utils // 工具方法
  └── index.ts
```

## 三、ESlint + Prettier

### 安装依赖

```shell
npm install -D typescript
npm install -D @typescript-eslint/eslint-plugin
npm install -D eslint
npm install -D eslint-plugin-import
npm install -D eslint-plugin-jsx-a11y
npm install -D eslint-plugin-prettier
npm install -D @typescript-eslint/parser
npm install -D eslint-config-prettier
npm install -D eslint-plugin-react
npm install -D eslint-plugin-react-hooks
npm install -D eslint-plugin-simple-import-sort
```

### 配置

- .eslintrc.js：ESLint 编码规则配置，这里推荐使用业界统一标准，推荐 AlloyTeam 的 eslint-config-alloy

```js
module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
  },
};
```

- .eslintignore：配置 ESLint 忽略文件

```text
dist
src/lib
```

- .prettierignor：配置 Prettier 忽略文件

```text
/dist

package.json
LICENSE

.DS_Store
.eslintignore
.gitignore

**/*.svg
*.png
```

- .prettierrc.js：格式化自定义配置

```js
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  bracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化内嵌代码
  embeddedLanguageFormatting: 'auto',
};
```

- git 代码提交校验

```shell
npm i -D yorkie
npm i -D lint-staged
```

```js
// package.json
{
  "name": "vite-react-ts",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "npm run lint:js && npm run lint:style && npm run lint:prettier",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "lint:prettier": "prettier --check \"**/*\" --end-of-line auto",
    "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx "
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.less": "stylelint --syntax less",
    "*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "*.{js,jsx,tsx,ts,less,md,json}": [
      "prettier --write"
    ]
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "@types/react": "^17.0.33",
    "@types/react-dom": "^17.0.10",
    "@typescript-eslint/eslint-plugin": "^5.13.0",
    "@typescript-eslint/parser": "^5.13.0",
    "@vitejs/plugin-react": "^1.0.7",
    "eslint": "^8.10.0",
    "eslint-config-alloy": "^4.5.1",
    "eslint-plugin-react": "^7.29.2",
    "lint-staged": "^12.3.4",
    "prettier": "^2.5.1",
    "typescript": "^4.6.2",
    "vite": "^2.7.2",
    "yorkie": "^2.0.0"
  }
}
```

### 参考

- [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy/blob/master/README.zh-CN.md)
- [彻底搞懂 ESLint 和 Prettier](https://juejin.cn/post/6909788084666105864)
- [一文带你彻底学会 Git Hooks 配置](https://segmentfault.com/a/1190000022970270)
