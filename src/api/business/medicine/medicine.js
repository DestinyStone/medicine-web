import request from '@/router/axios';

export default class Medicine {
  static page(data, current, size) {
    return request({
      url: '/api/bus/medicine/page',
      method: 'get',
      params: {
        ...data,
        current, size
      }
    })
  }
  static save(data) {
    return request({
      url: '/api/bus/medicine/save',
      method: 'post',
      data: data
    });
  }
  static delete(ids) {
    return request({
      url: '/api/bus/medicine/delete',
      method: 'get',
      params: {
        ids
      }
    });
  }
  static update(id, data) {
    return request({
      url: `/api/bus/medicine/update/${id}`,
      method: 'post',
      data: data
    });
  }
  static upload(data) {
    return request({
      url: `/api/bus/medicine/upload`,
      method: 'post',
      data: data
    });
  }
  static detail(id) {
    return request({
      url: '/api/bus/medicine/detail',
      method: 'get',
      params: {
        id
      }
    });
  }
}
