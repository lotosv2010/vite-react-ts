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
export { useStores };
