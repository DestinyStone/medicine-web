import request from '@/router/axios';

export default class Case {
  static page(data, current, size) {
    return request({
      url: '/api/bus/case/page',
      method: 'get',
      params: {
        ...data,
        current, size
      }
    })
  }
  static save(data) {
    return request({
      url: '/api/bus/case/save',
      method: 'post',
      data: data
    });
  }
  static delete(ids) {
    return request({
      url: '/api/bus/case/delete',
      method: 'get',
      params: {
        ids
      }
    });
  }
  static detail(id) {
    return request({
      url: '/api/bus/case/detail',
      method: 'get',
      params: {
        id
      }
    });
  }
  static detailByCode(code) {
    return request({
      url: '/api/bus/case/detail/code',
      method: 'get',
      params: {
        code
      }
    });
  }
  static code() {
    return request({
      url: `/api/bus/case/code`,
      method: 'get',
    });
  }
  static list(params) {
    return request({
      url: `/api/bus/case/list`,
      method: 'get',
      params: {
        ...params
      }
    });
  }
  static download(id) {
    return request({
      url: `/api/bus/case/download`,
      method: 'get',
      params: {
        id
      },
      responseType: "blob",
    });
  }
  static downloadObj(data) {
    return request({
      url: `/api/bus/case/download/obj`,
      method: 'post',
      data: data,
      responseType: "blob",
    });
  }
}
