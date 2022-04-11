import request from '@/service';

export const getAboutInfo = (data?: object) =>
  request({
    url: '/api/getAboutInfo',
    method: 'POST',
    data,
  });
