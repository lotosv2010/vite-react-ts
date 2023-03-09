import request from '@/service';

export const getMapData = (data?: any) => {
  return request({
    url: '/posts',
    method: 'GET',
    data,
    interceptors: {
      requestInterceptors(res: any) {
        console.log('接口请求拦截');
        return res;
      },
      responseInterceptors(result: any) {
        console.log('接口响应拦截');
        return result;
      },
    },
  });
};

export const getUserInfo = (data?: object) =>
  request({
    url: '/users',
    method: 'GET',
    data,
  });
