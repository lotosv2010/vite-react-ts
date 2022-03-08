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
