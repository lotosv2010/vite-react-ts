import { get, post } from '@/apis/request';

export const getMapData = (params?: any) => {
  return get('/api/datav-res/datav/map.json', params);
};

export const getUserInfo = (param?: object) => post('/api/getUserInfo', param);
