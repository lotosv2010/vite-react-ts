import request from '@/service';

export const getAboutInfo = (data?: object) =>
  request({
    url: '/getAboutInfo',
    method: 'POST',
    data,
  });
