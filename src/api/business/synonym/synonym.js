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
  static save(data) {
    return request({
      url: '/api/bus/synonym/save',
      method: 'post',
      data: data
    })
  }
  static update(id, data) {
    return request({
      url: `/api/bus/synonym/update/${id}`,
      method: 'post',
      data: data
    })
  }
  static delete(ids) {
    return request({
      url: '/api/bus/synonym/delete',
      method: 'get',
      params: {
        ids
      }
    })
  }
  static detail(id) {
    return request({
      url: '/api/bus/synonym/detail',
      method: 'get',
      params: {
        id
      }
    })
  }
}
