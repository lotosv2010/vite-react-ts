import { post } from '@/apis/request';

export const getAboutInfo = (param?: object) => post('/api/getAboutInfo', param);
