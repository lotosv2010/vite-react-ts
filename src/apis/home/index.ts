import { get } from '@/apis/request';

export const getMapData = (params?: any) => {
  return get('/api/datav-res/datav/map.json', params);
};
