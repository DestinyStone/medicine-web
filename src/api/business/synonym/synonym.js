import request from '@/router/axios';

export default class Synonym {
  static page(data, current, size) {
    return request({
      url: '/api/bus/synonym/page',
      method: 'get',
      params: {
        ...data,
        current, size
      }
    })
  }
}
