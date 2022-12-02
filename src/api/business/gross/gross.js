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
  static listSynonyms(name) {
    return request({
      url: '/api/bus/gross/list/synonyms',
      method: 'get',
      params: {
        name
      }
    })
  }
  static listWith(names, type) {
    return request({
      url: `/api/bus/gross/list/with/${type}`,
      method: 'post',
      data: names
    })
  }
  static resemblance(ids) {
    return request({
      url: `/api/bus/gross/resemblance`,
      method: 'get',
      params: {
        ids
      }
    })
  }
}
