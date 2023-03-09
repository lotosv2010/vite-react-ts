import request from '@/service';

export const getAboutInfo = (data?: object) =>
  request({
    url: '/users',
    method: 'GET',
    data,
  });
