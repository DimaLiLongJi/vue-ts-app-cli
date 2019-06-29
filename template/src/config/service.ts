import axios from 'axios';

axios.interceptors.request.use((config) => config, (err) => Promise.resolve(err));

axios.interceptors.response.use((res) => res, (err) => Promise.resolve(err));

class Service {
  public static instance: Service;

  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  /**
   * post methed
   *
   * @memberof Service
   */
  public post = <T = any>(url: string, params: T) => axios({
    method: 'post',
    url,
    data: params,
    withCredentials: true,
  })

  /**
   *
   *
   * @memberof Service
   */
  public get = (url: string) => axios({
    method: 'get',
    url,
    withCredentials: true,
  })

  /**
   *
   *
   * @memberof Service
   */
  public put = <T = any>(url: string, params: T) => axios({
    method: 'put',
    url,
    data: params,
    withCredentials: true,
  })

  /**
   *
   *
   * @memberof Service
   */
  public delete = <T = any>(url: string, params: T) => axios({
    method: 'delete',
    url,
    data: params,
    withCredentials: true,
  })
}

export default Service.getInstance();
