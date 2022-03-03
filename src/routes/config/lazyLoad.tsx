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
