# 一、目标

- 构建项目的要求如下：
  - 支持Typescript
  - 支持React、JSX语法
  - 支持ES6语法
  - 支持Scss module
  - 支持Eslint、Prettier、Pre-commit hook
  - 支持HMR快速热更新
  - 支持Antd按需引入与主题样式覆盖
  - 支持Proxy代理、alias别名
  - 兼容传统浏览器
  - 开发启动速度要够快，以秒计算
  - 支持懒加载和chunk分割

# 二、初始化项目

- 采用的 [vite 2.0](https://link.segmentfault.com/?enc=JadgkOebg1una78BjJbS4Q%3D%3D.uSLZJu4yWcX%2FnD7TbtnzF4RgEThDMa9AVu0W6OzJ3RUq9ZP7ygXSRf6ZT06f%2Fh98) 来初始化我们的项目

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

# 三、ESLint

- [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy/blob/master/README.zh-CN.md)
- [彻底搞懂 ESLint 和 Prettier](https://juejin.cn/post/6909788084666105864)

## 安装依赖

```shell
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

## 配置

- 新建.eslintrc.js，.eslintignore两个文件，更src同级目录，内容如下

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-debugger': 0,
    'default-case': 1,
    'no-empty-function': 1,
    'no-multi-spaces': 1,
    'spaced-comment': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
  },
};
```

```shell
node_modules
.DS_Store
dist
coverage
vite-env.d.ts
*.local
node_modules/*
```

## 脚本配置

```json
"lint": "eslint ./src --ext .jsx,.js,.ts,.tsx",
"lint:fix": "eslint ./src --ext .jsx,.js,.ts,.tsx --fix"
```

## 自动检测

### 安装依赖

```shell
npm install -D vite-plugin-checker
```

### 配置

```typescript
import checker from 'vite-plugin-checker';
export default function configEslint() {
  return [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ];
}

```

```typescript
import configEslint from './eslint';
export default function createVitePlugins() {
  const vitePlugins = [configEslint()];
  return vitePlugins;
}

```

## 扩展

- [从零构建前端 ESLint 工作流](https://segmentfault.com/a/1190000022881634)
- [彻底搞懂 ESLint 和 Prettier](https://juejin.cn/post/6909788084666105864)

# 四、Prettier

## 安装依赖

```shell
npm install -D prettier
```

## 配置

- 新建.prettierrc.js，.prettierignore两个文件，更src同级目录，内容如下

```javascript
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

```shell
**/*.md
**/*.svg
**/*.ejs
**/*.html
package.json
```

# 五、GitHooks

- [一文带你彻底学会 Git Hooks 配置](https://segmentfault.com/a/1190000022970270)

## 安装依赖

```shell
npm i -D yorkie
npm i -D lint-staged
```

## 配置

```json
// 主要配置 触发pre-commit 进行elint stylelint 格式校验
{
   "lint": "npm run lint:js && npm run lint:style && npm run lint:prettier",
   "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
   "lint:prettier": "prettier --check "**/*" --end-of-line auto",
   "lint:style": "stylelint --fix "src/**/*.less" --syntax less",
   "lint-staged": "lint-staged",
   "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx "
 },
 // 使用yorkie 来自动触发识别 gitHooks这个钩子，然后执行pre-commit 然后在执行lint-staged 
 "gitHooks": {
   "pre-commit": "lint-staged"
 },
 // lint-staged 配置 校验less,ts,tsx等文件有无不规范写法
 "lint-staged": {
   "*.less": "stylelint --syntax less",
   "*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
   "*.{js,jsx,tsx,ts,less,md,json}": [
     "prettier --write"
     ]
 },
```

# 六、stylelint

## 安装依赖

```shell
npm install -D sass
npm install -D stylelint
npm install -D stylelint-config-standard
npm install -D stylelint-config-prettier
npm install -D stylelint-config-html
npm install -D stylelint-order
npm install -D stylelint-scss
npm install -D postcss-html
npm install -D postcss-scss

```

## 配置

```javascript
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    indentation: 2,
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'string-quotes': 'double',
    'unit-case': null,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'block-opening-brace-space-before': 'always',
    'property-no-unknown': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    // 'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'keyframes-name-pattern': null,
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak',
    ],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
```

```javascript
/dist/*
/public/*
public/*
```

## 脚本配置

```json
{
  "name": "vite-react-ts",
  "version": "0.0.0",
  "description": "A Vite2 + Typescript + React + Antd + Scss + Eslint + Prettier template",
  "homepage": "https://github.com/lotosv2010/vite-react-ts",
  "repository": {
    "type": "git",
    "url": "git@github.com:lotosv2010/vite-react-ts.git"
  },
  "keywords": [
    "vite",
    "typescript",
    "react",
    "antd",
    "scss",
    "eslint",
    "prettier"
  ],
  "author": {
    "name": "Robin",
    "email": "lotosv2010@163.com",
    "github": "https://github.com/lotosv2010"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "npm run lint:js && npm run lint:style && npm run lint:prettier",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "lint:prettier": "prettier --check \"**/*\" --end-of-line auto",
    "lint:style": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx "
  }, 
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.scss": "npm run lint:style",
    "*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "*.{js,jsx,tsx,ts,less,md,json}": [
      "prettier --write",
      "git add"
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
    "eslint-config-prettier": "^8.4.0",
    "eslint-plugin-import": "^2.25.4",
    "eslint-plugin-jsx-a11y": "^6.5.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "^7.29.2",
    "eslint-plugin-react-hooks": "^4.3.0",
    "eslint-plugin-simple-import-sort": "^7.0.0",
    "lint-staged": "^12.3.4",
    "postcss-html": "^1.3.0",
    "postcss-scss": "^4.0.3",
    "prettier": "^2.5.1",
    "sass": "^1.49.9",
    "stylelint": "^14.5.3",
    "stylelint-config-html": "^1.0.0",
    "stylelint-config-prettier": "^9.0.3",
    "stylelint-config-standard": "^25.0.0",
    "stylelint-order": "^5.0.0",
    "stylelint-scss": "^4.1.0",
    "typescript": "^4.4.4",
    "vite": "^2.7.2",
    "vite-plugin-checker": "^0.4.2",
    "yorkie": "^2.0.0"
  }
}
```

# 七、css-module/scss

- vite默认是支持module的，只需将文件名称加一个module即可，如：xx.module.css,这样就变成了module了，更create-react-app一样的写法。
- scss/less的module模式同css一样，如：xx.module.scss,xx.module.less

## 安装依赖

```shell
npm install -D sass
```

## 全局变量

- 在src文件夹下新增styles文件夹，在styles文件夹中新增variable.scss文件，编写如下代码：

```less
$bg: #282c34;
@mixin flexContainer($dir: column, $jc: center, $align: center) {
  display: flex;
  flex-direction: $dir;
  align-items: $align;
  justify-content: $jc;
}
@mixin style($size, $color, $bold: normal) {
  font-size: $size;
  color: $color;
  font-weight: $bold;
}
```

## 配置

- 在config文件夹下，新增style文件夹，且在style文件夹下新增index.ts，config/style/index.ts中编写如下代码：

```typescript
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
```

> **注意点:**
> additionalData中如果引用@import格式的，后面一定要加;否则会报错

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...createVitePlugins()],
  css: cssOption,
});
```

## 使用

- 将src/app.css中的app.css换成app.module.scss，更改文件中的代码：

```less
.App {
  text-align: center;
  header {
    @include style(calc(10px + 2vmin), #ffffff);
    @include flexContainer();
    min-height: 100vh;
    background-color: $bg;
    img {
      height: 20vmin;
      pointer-events: none;
    }
    button {
      font-size: calc(10px + 2vmin);
    }
  }
}
@media (prefers-reduced-motion: no-preference) {
  img {
    animation: App-logo-spin infinite 20s linear;
  }
}
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
```

- 将src/App.ts中的代码修改如下：

```typescript
import { useState } from 'react';
import logo from './assets/logo.svg';
import Styles from './app.module.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={Styles.App}>
      <header>
        <img src={logo} alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
```

# 八、路由

## 安装依赖

```shell
npm i -S react-router-dom
```

## 约定式路由

> [Vite 约定式路由的最佳实践](https://mp.weixin.qq.com/s/zgl59dbLiR8CNg1ON6Yqbw)

### 生成路由

- 我们暂定 _ 开头的文件作为路由生成的规则
  - pages/_index.tsx → /
  - pages/home/_index.tsx → /home
  - pages/home/_hello-world.tsx → /home/hello-world
  - pages/home/_[name].tsx → /home/:name
  - pages/about/_index.tsx → /about
- 用 _.tsx 作为 layout

```typescript
import React from 'react';
import set from 'lodash/set';
import { lazy, Suspense } from 'react';

/**
 * 根据 pages 目录生成路径配置
 * @returns 路径配置
 */
function generatePathConfig(): Record<string, any> {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('/src/pages/**/_*.{ts,tsx}');
  const pathConfig = {};
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('/src/pages/', '')
      // 去除文件名后缀
      .replace(/.tsx?/, '')
      // 转换动态路由 $[foo].tsx => :foo
      .replace(/_\[([\w-]+)]/, ':$1')
      // 转换以 $ 开头的文件
      .replace(/_([\w-]+)/, '$1')
      // 以目录分隔
      .split('/');
    // 使用 lodash.set 合并为一个对象
    set(pathConfig, routePath, modules[filePath]);
  });
  return pathConfig;
}

/**
 * 将文件路径配置映射为 react-router 路由
 */
/**
 * 将文件路径配置映射为 react-router 路由
 * @param cfg 路径配置
 * @returns  路由
 */
function mapPathConfigToRoute(cfg: Record<string, any>): any[] {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === 'function') {
      // 等于 index 则映射为当前根路由
      const isIndex = routePath === 'index';
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        // 转换为组件
        element: wrapSuspense(child),
      };
    }
    // 否则为目录，则查找下一层级
    const { $, ...rest } = child;
    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense($),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    };
  });
}

/**
 * 为动态 import 包裹 lazy 和 Suspense
 * @param importer
 * @returns
 */
export function wrapSuspense(importer: any) {
  if (!importer) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = lazy(importer);
  // 结合 Suspense，这里可以自定义 loading 组件
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

/**
 * 组装配置, 生成路由
 * @returns
 */
function generateRouteConfig(): any[] {
  const { _, ...pathConfig } = generatePathConfig();
  // 提取跟路由的 layout
  return [
    {
      path: '/',
      element: wrapSuspense(_),
      children: mapPathConfigToRoute(pathConfig),
    },
  ];
}

export default generateRouteConfig;
```

```typescript
import generateRoutes from './generateRoutes';

export { generateRoutes };

```

### 封装组件

```typescript
import { useRoutes } from 'react-router-dom';
import { generateRoutes } from '../routes';

function PageRoutes() {
  const routeConfig = generateRoutes();
  return useRoutes(routeConfig);
}

export default PageRoutes;
```

### 页面编写

```tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <h3>layout</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to="/">首页</Link>
        <Link to="/home">home</Link>
        <Link to="/home/child">home child</Link>
        <Link to="/home/child/hello-world">home hello-world</Link>
        <Link to="/home/child/1234">home name</Link>
        <Link to="/about">about</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
```

```tsx
import React from 'react';

function Index() {
  return <div>Index</div>;
}

export default Index;
```

```tsx
import React from 'react';

function Index() {
  return <div>Home Index</div>;
}

export default Index;
```

```tsx
import React from 'react';

function Index() {
  return <div>Child Index</div>;
}

export default Index;
```

```tsx
import React from 'react';

function Child() {
  return <div>hello-world</div>;
}

export default Child;
```

```tsx
import React from 'react';
import { useParams } from 'react-router-dom';

function Name() {
  const { name } = useParams();
  return <div>{name}</div>;
}

export default Name;
```

```tsx
import React from 'react';

function About() {
  return <div>About</div>;
}

export default About;
```

### 路由使用

```tsx
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
};

export default App;

```

## 配置式路由

### 生成路由

```tsx
import { wrapSuspense } from './generateRoutes';
// 路由处理方式
export default function lazyLoad(src: any) {
  if (!src) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = wrapSuspense(() => import(`../../pages/${src}.tsx`));
  return Component;
}
```

```typescript
import generateRoutes from './config/generateRoutes';
import lazyLoad from './config/lazyLoad';

export { generateRoutes, lazyLoad };
```

### 路由编写

```typescript
import { lazyLoad } from '.';

const routes = [
  {
    element: lazyLoad('_'),
    path: '/',
    children: [
      {
        index: true,
        element: lazyLoad('_index'),
      },
      {
        path: 'home',
        children: [
          {
            index: true,
            element: lazyLoad('home/_index'),
          },
          {
            path: 'child',
            children: [
              {
                index: true,
                element: lazyLoad('home/child/_index'),
              },
              {
                index: false,
                path: 'hello-world',
                element: lazyLoad('home/child/_hello-world'),
              },
              {
                index: false,
                path: ':name',
                element: lazyLoad('home/child/_[name]'),
              },
            ],
          },
        ],
      },
      {
        path: 'about',
        children: [
          {
            index: true,
            element: lazyLoad('about/_index'),
          },
        ],
      },
    ],
  },
];
export default routes;
```

### 封装组件

```typescript
import { useRoutes } from 'react-router-dom';
import { generateRoutes } from '../routes';

function PageRoutes(props: any) {
  let { routes } = props;
  const routeConfig = generateRoutes();
  return useRoutes(routes ?? routeConfig);
}

export default PageRoutes;
```

### 路由使用

```tsx
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes/routes';

const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes routes={routes} />
    </BrowserRouter>
  );
};

export default App;
```

# 九、状态管理

## 安装依赖

```shell
npm i -S mobx mobx-react
```

## 创建store

- 需要注意的是，在 store 初始化的时候，如果需要数据能够响应式绑定，需要在初始化的时候，给默认值，不能设置为 undefined 或者 null，这样子的话，数据是无法实现响应式的

```typescript
import { makeAutoObservable } from 'mobx';

class GlobalStore {
  public title = '';
  public theme = 'default';
  public language = 'zh';
  constructor() {
    makeAutoObservable(this);
  }
  setTheme(theme: string) {
    this.theme = theme;
  }
  setTitle(title: string) {
    this.title = title;
  }
  async setLanguage(language: string) {
    // 模拟接口请求
    return await new Promise((resolve) => {
      setTimeout(() => {
        this.language = language;
        resolve(language);
      }, 1000);
    });
  }
}

export default new GlobalStore();
```

```typescript
import { makeAutoObservable } from 'mobx';

class LayoutStore {
  public collapse = false;
  public pathname = location.pathname;
  constructor() {
    makeAutoObservable(this);
  }
  setCollapse(collapse: boolean) {
    this.collapse = collapse;
  }
  setPathname(pathname: string) {
    this.pathname = pathname;
  }
}

export default new LayoutStore();
```

```typescript
import globalStore from './global';
import layoutStore from './layout';

const stores = {
  globalStore,
  layoutStore,
};
export default stores;
```

## Store 注入

- mobx的数据注入，采用的 react 的 context 特性；

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import stores from './stores';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

## Store 使用

### 默认方式

```tsx
import React from 'react';
import { observer, inject } from 'mobx-react';

function About({ globalStore, layoutStore }: any) {
  return (
    <div>
      <p>About</p>
      <p>{globalStore.theme}</p>
      <p>{layoutStore.pathname}</p>
    </div>
  );
}

export default inject(...['globalStore', 'layoutStore'])(observer(About));
```

### 自定义钩子

```typescript
import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import stores from '../stores';

export type StoreType = typeof stores;

/**
 * 获取根 store 或者指定 store 名称数据
 * @param storeName 指定子 store 名称
 * @returns typeof StoreType[storeName]
 */
function useStores<T extends keyof StoreType>(storeName: T) {
  // 这里的 MobXProviderContext 就是上面 mobx-react 提供的
  const rootStore = useContext(MobXProviderContext);
  const stores = rootStore as StoreType;
  return stores[storeName] as StoreType[T];
}
export default useStores;
```

```typescript
import useStore from './useStore';

export { useStore };
```

```tsx
import React, { useEffect } from 'react';
import { useStores } from '../../hooks';
import { observer } from 'mobx-react';

function Index() {
  const global = useStores('globalStore');
  const layout = useStores('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    console.log(res);
    return res;
  };
  useEffect(() => {
    setTimeout(() => {
      global.setTheme('dark');
      setLan();
      layout.setPathname('/about');
    }, 1000);
  }, []);
  return (
    <div>
      <p>Home Index</p>
      <p>{global?.theme}</p>
      <p>{layout?.pathname}</p>
    </div>
  );
}

export default observer(Index);
```

# 十、别名配置

## 安装依赖

```shell
npm i -D path @types/node
```

## 配置

- vite.config.ts 中新增 resolve 配置节点，用来编译识别用的

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...createVitePlugins()],
  css: cssOption,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

- tsconfig.json 中新增 paths 配置节点，是用来给 Typescript 识别用的

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["./src"]
}
```

## 使用

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from '@/App';
import stores from '@/stores';
import '@/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

# 十一、环境变量

## 设置环境变量

- 新增.env，.env.test，.env.staging，.env.production 四个文件，更src同级目录
- 分别代表开发，测试，预发，生产四个环境变量，如果想要扩展其它的变量，以此类推
- 自定义环境变量一定要是 VITE 为前缀的变量才会暴露给vite,如：VITE_APP_TITLE

```
NODE_ENV=development
VITE_APP_TITLE="DEVELOPMENT APP"
```

```
NODE_ENV=production
VITE_APP_TITLE="TEST APP"
```

```
NODE_ENV=production
VITE_APP_TITLE="STAGING APP"
```

```
NODE_ENV=production
VITE_APP_TITLE="PRODUCTION APP"
```

## 设置脚本

- 之所以要在package.json中的命令加--mode，是为了覆盖命令使用的默认模式production,development

```json
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:test": "vite build --mode test",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview",
  },
```

## 设置typescript

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_TITLE: 'development' | 'test' | 'staging' | 'production';
}
```

## 获取环境变量

- 在vite中获取环境变量通过：import.meta.env来获取的，并不是process.env，如果要在代码中，每次通过import.meta.env来获取，写的实在繁琐，不如封装一个hooks
- 在src文件夹下，新建utils文件夹，utils文件夹中新建env.ts,在src/utils/env.ts中编写如下代码

```typescript
export const getEnv = () => {
  return import.meta.env;
};
```

```typescript
import { getEnv } from './env';

export { getEnv };
```

## 自定义钩子

```typescript
import { useEffect } from 'react';
import { getEnv } from '@/utils';

export default function useTitle(title?: string) {
  useEffect(() => {
    const { VITE_APP_TITLE } = getEnv();
    document.title = title ?? VITE_APP_TITLE ?? 'Vite Project';
  }, []);
}
```

```typescript
import useStore from './useStore';
import useTitle from './useTitle';

export { useStore, useTitle };
```

## 页面使用

```tsx
import React, { useEffect } from 'react';
import { useStore, useTitle } from '@/hooks';
import { observer } from 'mobx-react';

function Index() {
  const global = useStore('globalStore');
  const layout = useStore('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    console.log(import.meta.env);
    console.log(res);
    return res;
  };
  useTitle();
  useEffect(() => {
    setTimeout(() => {
      global.setTheme('dark');
      setLan();
      layout.setPathname('/about');
    }, 1000);
  }, []);
  return (
    <div>
      <p>Home Index</p>
      <p>{global?.theme}</p>
      <p>{layout?.pathname}</p>
    </div>
  );
}

export default observer(Index);
```

# 十二、基础配置

## server 配置

```typescript
// todo server 配置
/**
 * @description 开发端口
 */
export const VITE_APP_PORT = 3001;
/**
 * @description 公共基础路径
 */
export const VITE_APP_BASE = '/';
/**
 * @description 是否自动在浏览器中打开应用程序
 */
export const VITE_APP_OPEN = true;
```

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';
import path from 'path';
import { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_OPEN } from './config';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), ...createVitePlugins()],
    css: cssOption,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base: VITE_APP_BASE,
    server: {
      host: true,
      port: VITE_APP_PORT,
      open: VITE_APP_OPEN,
    },
  };
});
```

## proxy 配置

```typescript
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';
import path from 'path';
import { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_OPEN } from './config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    plugins: [react(), ...createVitePlugins()],
    css: cssOption,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base: VITE_APP_BASE,
    server: {
      host: true,
      port: VITE_APP_PORT,
      open: VITE_APP_OPEN,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API_HOST,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
```

```latex
NODE_ENV=development
VITE_APP_TITLE="DEVELOPMENT APP"
VITE_API_HOST=http://www.youbaobao.xyz
```

- **测试**

```tsx
import React, { useEffect } from 'react';
import { useStore, useTitle } from '@/hooks';
import { observer } from 'mobx-react';

function Index() {
  const global = useStore('globalStore');
  const layout = useStore('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    console.log(import.meta.env);
    console.log(res);
    return res;
  };
  useTitle();
  useEffect(() => {
    fetch('/api/datav-res/datav/map.json')
      .then((res) => res.json())
      .then((data) => console.log(data));
    setTimeout(() => {
      global.setTheme('dark');
      setLan();
      layout.setPathname('/about');
    }, 1000);
  }, []);
  return (
    <div>
      <p>Home Index</p>
      <p>{global?.theme}</p>
      <p>{layout?.pathname}</p>
    </div>
  );
}

export default observer(Index);
```

## build 配置

### 基本配置

- 找到config/index.ts文件，新增如下代码

```typescript
// todo server 配置
/**
 * @description 开发端口
 */
export const VITE_APP_PORT = 3001;
/**
 * @description 公共基础路径
 */
export const VITE_APP_BASE = '/';
/**
 * @description 是否自动在浏览器中打开应用程序
 */
export const VITE_APP_OPEN = true;

// todo build 配置
/**
 * @description 是否在打包环境下，开启打包的分析可视化图
 */
export const VITE_APP_VISUALIZER = true;
/**
 * @description 是否在打包环境下，去除console.log
 */
export const VITE_APP_CONSOLE = true;
/**
 * @description 打包环境下，删除debugger
 */
export const VITE_APP_DEBUGGER = true;
/**
 * @description 打包环境下是否生成source map 文件
 */
export const VITE_APP_SOURCEMAP = false;
```

- 在config文件夹下，新建build/index.ts文件，且编写如下代码

```typescript
import { BuildOptions } from 'vite';
import { VITE_APP_CONSOLE, VITE_APP_DEBUGGER, VITE_APP_SOURCEMAP } from '../index';
const build: BuildOptions = {
  minify: 'terser',
  terserOptions: {
    compress: {
      keep_infinity: true,
      drop_console: VITE_APP_CONSOLE, // 去除 console
      drop_debugger: VITE_APP_DEBUGGER, // 去除 debugger
    },
  },
  outDir: 'dist', // 指定输出路径目录
  assetsDir: 'assets', // 指定打包生成静态资源的存放路径目录
  sourcemap: VITE_APP_SOURCEMAP, // 构建后是否生成 source map文件
};
export default build;
```

- 找到vite.config.ts文件，新增如下代码

```typescript
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';
import path from 'path';
import { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_OPEN } from './config';
import build from './config/build';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    plugins: [react(), ...createVitePlugins()],
    css: cssOption,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base: VITE_APP_BASE,
    server: {
      host: true,
      port: VITE_APP_PORT,
      open: VITE_APP_OPEN,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API_HOST,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
      },
    },
    build,
  };
});
```

### 打包的分析可视化图

- 安装依赖

```shell
npm install rollup-plugin-visualizer -D
```

- 在config/plugins文件夹中，新建visualizer.ts文件

```typescript
import visualizer from 'rollup-plugin-visualizer';
export default function configVisualizerConfig() {
  return visualizer({
    // 将打包的依赖分析可视化页面，写到node_modules中，这样不占位置
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  });
}
```

- 找到config/plugins/index.ts文件，新增如下代码

```typescript
import configEslint from './eslint';
import { VITE_APP_VISUALIZER } from '../index';
import configVisualizerConfig from './visualizer';

export default function createVitePlugins() {
  const vitePlugins: any[] = [configEslint()];
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
```

### 压缩 Html

- 安装依赖

```shell
npm install vite-plugin-html -D
```

- 在config/plugins文件夹中，新建html.ts文件

```typescript
import { createHtmlPlugin } from 'vite-plugin-html';

export default function configHtml() {
  return createHtmlPlugin({
    minify: true,
  });
}
```

- 找到config/plugins/index.ts文件，新增如下代码

```typescript
import configEslint from './eslint';
import { VITE_APP_VISUALIZER } from '../index';
import configVisualizerConfig from './visualizer';
import configHtml from './html';

export default function createVitePlugins() {
  const vitePlugins: any[] = [configEslint(), configHtml()];
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
```

### 压缩资源

- 安装依赖

```shell
npm install vite-plugin-compression -D
```

- 在config/plugins文件夹中，新建compression.ts文件

```typescript
import viteCompression from 'vite-plugin-compression';
export default function configCompression() {
  // gzip压缩 生产环境生成 .gz 文件
  return viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  });
}
```

- 找到config/plugins/index.ts文件，新增如下代码

```typescript
import configEslint from './eslint';
import { VITE_APP_VISUALIZER } from '../index';
import configVisualizerConfig from './visualizer';
import configHtml from './html';
import configCompression from './compression';

export default function createVitePlugins() {
  const vitePlugins: any[] = [configEslint(), configHtml(), configCompression()];
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
```

# 十三、兼容传统浏览器

## 安装依赖

```shell
npm i -D @vitejs/plugin-legacy
```

## 插件配置

- 在config/plugins文件夹中，新建legacy.ts文件

```typescript
import legacy from '@vitejs/plugin-legacy';

export default function configLegacy() {
  return legacy({
    // targets: ['ie >= 11', 'Android >= 39', 'Chrome >= 39', 'Safari >= 10.1', 'iOS >= 10', '> 0.5%'],
    // polyfills: ['es.promise', 'regenerator-runtime'],
    targets: ['ie >= 11'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  });
}
```

- 找到config/plugins/index.ts文件，新增如下代码

```typescript
import configEslint from './eslint';
import { VITE_APP_VISUALIZER } from '../index';
import configVisualizerConfig from './visualizer';
import configHtml from './html';
import configCompression from './compression';
import configLegacy from './legacy';

export default function createVitePlugins() {
  const vitePlugins: any[] = [configEslint(), configHtml(), configCompression(), configLegacy()];
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
```

# 十四、请求封装

## 安装依赖

```shell
npm i -S axios
```

## Aixos 封装

- 在src文件夹中，新建api文件夹，并且新建src/api/request.ts文件

```typescript
import axios, { AxiosInstance } from 'axios';
import { getEnv } from '@/utils';

function mergeOptions(options: Record<string, any>) {
  const { VITE_API_HOST, DEV } = getEnv();
  const url = DEV ? '' : VITE_API_HOST;
  return {
    timeout: 100000,
    baseURL: url,
    headers: {},
    ...options,
  };
}
function createInstance(options?: Record<string, any>) {
  // 合并选项
  const opts = mergeOptions(options ?? {});
  // 创建实例
  const instance = axios.create(opts);
  // 添加拦截器
  setInterceptor(instance);
  // 当调用Axios.request 时，内部会创建一个Axios实例，并且给这个实例传入配置属性
  return instance;
}

/**
 * 添加拦截器
 * @param instance
 */
function setInterceptor(instance: AxiosInstance) {
  /**
   * http request 拦截器
   */
  const token = 'xxxxx';
  instance.interceptors.request.use(
    (config) => {
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  /**
   * http response 拦截器
   */
  instance.interceptors.response.use(
    (response) => {
      // 自定义错误码处理
      if (response.data.errCode === 2) {
        return Promise.reject('XXX');
      }
      // 成功状态返回
      return Promise.resolve(response);
    },
    (error) => {
      // 请求配置发生的错误
      if (!error.response) {
        return Promise.reject(`Error：${error.message}`);
      }
      // 错误码统一处理
      const { status, statusText } = error.response;
      const msg = errorMessage(status) ?? statusText ?? '服务端异常。';
      // console.log('请求出错：', error.response);
      return Promise.reject(`${status}：${msg}`);
    },
  );
}

const instance = createInstance();

/**
 * 封装get方法
 *  获取数据
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: any, params?: Object): Promise<unknown> {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
      })
      .then((response) => {
        // landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 *  提交数据
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: any, data?: Object): Promise<unknown> {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        // 关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

/**
 * 封装patch请求
 *  更新数据(只将修改的数据推送到后端)
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: any, data?: Object): Promise<unknown> {
  return new Promise((resolve, reject) => {
    instance.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

/**
 * 封装put请求
 *  更新数据(所有数据推送到后端)
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url: any, data?: Object): Promise<unknown> {
  return new Promise((resolve, reject) => {
    instance.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

/**
 * 封装delete请求
 *  删除数据
 * @param url
 * @param params
 * @returns {Promise}
 */
export function del(url: any, params?: Object): Promise<unknown> {
  return new Promise((resolve, reject) => {
    instance.delete(url, { params }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

/**
 * 统一接口处理，返回数据
 * @param fetch
 * @param url
 * @param param
 * @returns {Promise}
 */
export default function (fetch: 'get' | 'post', url: string, param?: Object): Promise<unknown> {
  const fns = { get, post };
  return fns[fetch](url, param);
}

/**
 * 失败提示
 * @param code
 * @returns 失败原因描述
 */
export function errorMessage(code: number) {
  const map = new Map([
    [200, '服务器成功返回请求的数据。'],
    [201, '新建或修改数据成功。'],
    [202, '一个请求已经进入后台排队（异步任务）。'],
    [204, '删除数据成功。'],
    [400, '发出的请求有错误，服务器没有进行新建或修改数据的操作。'],
    [401, '用户没有权限（令牌、用户名、密码错误）。'],
    [403, '用户得到授权，但是访问是被禁止的。'],
    [404, '发出的请求针对的是不存在的记录，服务器没有进行操作。'],
    [406, '请求的格式不可得。'],
    [410, '请求的资源被永久删除，且不会再得到的。'],
    [422, '当创建一个对象时，发生一个验证错误。'],
    [500, '服务器发生错误，请检查服务器。'],
    [502, '网关错误。'],
    [503, '服务不可用，服务器暂时过载或维护。'],
    [504, '网关超时。'],
  ]);
  return map.get(+code);
}
```

## Axios 使用

- 在src/api文件夹中，新建home文件夹，并且新建src/api/home/index.ts文件

```typescript
import { get } from '@/apis/request';

export const getMapData = (params?: any) => {
  return get('/api/datav-res/datav/map.json', params);
};
```

- 在src/pages/home/_index.tsx文件

```tsx
import React, { useEffect } from 'react';
import { useStore, useTitle } from '@/hooks';
import { observer } from 'mobx-react';
import { getMapData } from '@/apis/home';

function Index() {
  const global = useStore('globalStore');
  const layout = useStore('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    // console.log(import.meta.env);
    console.log(res);
    return res;
  };
  const getData = async () => {
    try {
      const res = await getMapData({ id: 111 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useTitle();
  useEffect(() => {
    getData();
    setTimeout(() => {
      global.setTheme('dark');
      setLan();
      layout.setPathname('/about');
    }, 1000);
  }, []);
  return (
    <div>
      <p>Home Index</p>
      <p>{global?.theme}</p>
      <p>{layout?.pathname}</p>
    </div>
  );
}

export default observer(Index);
```

# 十五、mock

## 安装依赖

```shell
npm i mockjs -S
npm i vite-plugin-mock -D
```

## 插件配置

- 在config/plugins文件夹中，新建mock.ts文件

```typescript
import { viteMockServe } from 'vite-plugin-mock';

export default function configMock(command: string) {
  return viteMockServe({
    // default
    mockPath: 'mock', // 解析根目录下的mock文件夹
    localEnabled: command === 'serve', // 开发打包开关
    prodEnabled: false, // 生产打包开关
    supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
    watchFiles: true, // 监视文件更改
  });
}
```

- 找到config/plugins/index.ts文件，新增如下代码

```typescript
import configEslint from './eslint';
import { VITE_APP_VISUALIZER } from '../index';
import configVisualizerConfig from './visualizer';
import configHtml from './html';
import configCompression from './compression';
import configLegacy from './legacy';
import configMock from './mock';

export default function createVitePlugins(command: string) {
  const vitePlugins: any[] = [configEslint(), configHtml(), configCompression(), configLegacy(), configMock(command)];
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
```

- 找到vite.config.ts文件，新增如下代码

```typescript
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';
import path from 'path';
import { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_OPEN } from './config';
import build from './config/build';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  return {
    plugins: [react(), ...createVitePlugins(command)],
    css: cssOption,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base: VITE_APP_BASE,
    server: {
      host: true,
      port: VITE_APP_PORT,
      open: VITE_APP_OPEN,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API_HOST,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
      },
    },
    build,
  };
});
```

## 接口实现

- 在根目录(和src同级)新建mock文件夹，新建mock/home.ts 文件、mock/about.ts 文件以及mock/index.ts 文件

```typescript
import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
export default [
  {
    url: '/api/getUserInfo',
    method: 'post',
    response: () => {
      return Mock.mock({
        code: 200,
        data: {
          nickname: '@cname',
          age: '@integer(10-100)',
          uid: '@id',
          url: '@image(200x100)',
          city: '@city',
          country: '@county(true)',
          province: '@province',
          mobile_phone: '@phone',
          email: '@email',
          region: '@region',
          menus: [
            {
              menu_name: '一级导航',
              id: '@id',
              code: 'Nav1',
              children: [
                {
                  code: 'about',
                  menu_url: 'views/about',
                  access_permissions: '["about"]',
                  children: [],
                  menu_name: '测试1',
                  id: '@id',
                },
                {
                  code: 'home',
                  menu_url: 'views/home',
                  access_permissions: '["home"]',
                  children: [],
                  menu_name: '测试2',
                  id: '@id',
                },
              ],
            },
          ],
        },
      });
    },
  },
] as MockMethod[];
```

```typescript
import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
export default [
  {
    url: '/api/getAboutInfo',
    method: 'post',
    response: () => {
      return Mock.mock({
        code: 200,
        data: {
          nickname: 'about',
          age: '@integer(10-100)',
        },
      });
    },
  },
] as MockMethod[];
```

```typescript
export * from './about';
export * from './home';
```

## Api 实现

- 在src/apis/home/index.ts文件

```typescript
import { get, post } from '@/apis/request';

export const getMapData = (params?: any) => {
  return get('/api/datav-res/datav/map.json', params);
};

export const getUserInfo = (param?: object) => post('/api/getUserInfo', param);
```

- 在src/apis/about/index.ts文件

```typescript
import { post } from '@/apis/request';

export const getAboutInfo = (param?: object) => post('/api/getAboutInfo', param);
```

## Api 调用

- 在src/pages/home/_index.tsx文件

```tsx
import React, { useEffect } from 'react';
import { useStore, useTitle } from '@/hooks';
import { observer } from 'mobx-react';
import { getMapData, getUserInfo } from '@/apis/home';

function Index() {
  const global = useStore('globalStore');
  const layout = useStore('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    // console.log(import.meta.env);
    console.log(res);
    return res;
  };
  const getData = async () => {
    try {
      const res = await getMapData({ id: 111 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await getUserInfo({ id: 1001 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useTitle();
  useEffect(() => {
    getData();
    getUser();
    setTimeout(() => {
      global.setTheme('dark');
      setLan();
      layout.setPathname('/about');
    }, 1000);
  }, []);
  return (
    <div>
      <p>Home Index</p>
      <p>{global?.theme}</p>
      <p>{layout?.pathname}</p>
    </div>
  );
}

export default observer(Index);
```

- 在src/pages/about/_index.tsx文件

```tsx
import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { getAboutInfo } from '@/apis/about';

function About({ globalStore, layoutStore }: any) {
  const getData = async () => {
    try {
      const res = await getAboutInfo();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <p>About</p>
      <p>{globalStore.theme}</p>
      <p>{layoutStore.pathname}</p>
    </div>
  );
}

export default inject(...['globalStore', 'layoutStore'])(observer(About));
```

# 十六、Antd

## 安装依赖

```shell
npm install antd -S
npm i vite-plugin-style-import -D
npm i less -D
```

## 插件配置

- 在config/plugins文件夹中，新建styleImport.ts文件

```typescript
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';

export default function configStyleImport() {
  return createStyleImportPlugin({
    resolves: [AntdResolve()],
    libs: [
      {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => {
          return `antd/es/${name}/style/index`;
        },
      },
    ],
  });
}
```

- 找到config/plugins/index.ts文件，新增如下代码

```typescript
import configEslint from './eslint';
import { VITE_APP_VISUALIZER, VITE_APP_LEGACY } from '../index';
import configVisualizerConfig from './visualizer';
import configHtml from './html';
import configCompression from './compression';
import configLegacy from './legacy';
import configMock from './mock';
import configStyleImport from './styleImport';

export default function createVitePlugins(command: string) {
  const vitePlugins: any[] = [
    configEslint(),
    configHtml(),
    configCompression(),
    configMock(command),
    configStyleImport(),
  ];
  VITE_APP_LEGACY && vitePlugins.push(configLegacy());
  VITE_APP_VISUALIZER && vitePlugins.push(configVisualizerConfig());
  return vitePlugins;
}
```

## Antd 使用

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from '@/App';
import stores from '@/stores';

import '@/index.scss';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

```tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function BasicLayout() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <div className="logo">logo</div>
      </Header>
      <Layout>
        <Sider width={200} className="layout-sider">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/']}
            style={{ height: '100%', borderRight: 0 }}
            defaultOpenKeys={['/']}
          >
            <Menu.Item key="/" icon={<DashboardOutlined />} title="Dashboard">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="home" icon={<HomeOutlined />} title="首页">
              <Menu.Item key="/home">
                <Link to="/home">home</Link>
              </Menu.Item>
              <Menu.Item key="/home/child">
                <Link to="/home/child">child</Link>
              </Menu.Item>
              <Menu.Item key="/home/child/hello-world">
                <Link to="/home/child/hello-world">hello</Link>
              </Menu.Item>
              <Menu.Item key="/home/child/1234">
                <Link to="/home/child/1234">name</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="about" icon={<UserOutlined />} title="关于">
              <Menu.Item key="/about">
                <Link to="/about">about</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="layout-content">
          <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
```

## 参考

# 十七、国际化配置

# 十八、jest

# 十九、目录结构

# 参考
