import request from '@/router/axios';

export default class Reback {
  static page(data, current, size) {
    return request({
      url: '/api/bus/reback/page',
      method: 'get',
      params: {
        ...data,
        current, size
      }
    })
  }
  static save() {
    return request({
      url: '/api/bus/reback/save',
      method: 'post',
    })
  }
  static rebackSystem(id) {
    return request({
      url: `/api/bus/reback/reback/${id}`,
      method: 'post',
    })
  }
  static remark(id, data) {
    return request({
      url: `/api/bus/reback/remark/${id}`,
      method: 'post',
      data: data,
    })
  }
}
