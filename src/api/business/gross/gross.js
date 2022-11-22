import request from '@/router/axios';

export default class Gross {
  static page(data, current, size) {
    return request({
      url: '/api/bus/gross/page',
      method: 'get',
      params: {
        ...data,
        current, size
      }
    })
  }
  static dictList(excludeIds) {
    return request({
      url: '/api/bus/gross/list',
      method: 'get',
      params: {
        excludeIds
      }
    })
  }
}
