import request from '@/router/axios';

export default class Analyze {
  static page(data, current, size) {
    return request({
      url: '/api/bus/analyze/page',
      method: 'get',
      params: {
        ...data,
        current, size
      }
    })
  }
  static save(data) {
    return request({
      url: '/api/bus/analyze/save',
      method: 'post',
      data: data
    });
  }
  static delete(ids) {
    return request({
      url: '/api/bus/analyze/delete',
      method: 'get',
      params: {
        ids
      }
    });
  }
  static update(id, data) {
    return request({
      url: `/api/bus/analyze/update/${id}`,
      method: 'post',
      data: data
    });
  }
  static upload(data) {
    return request({
      url: `/api/bus/analyze/upload`,
      method: 'post',
      data: data
    });
  }
  static detail(id) {
    return request({
      url: '/api/bus/analyze/detail',
      method: 'get',
      params: {
        id
      }
    });
  }
  static detailAll(names) {
    return request({
      url: '/api/bus/analyze/detail/all',
      method: 'get',
      params: {
        names
      }
    });
  }
}
