import request from '@/router/axios';

export const processLowSave = (data) => {
  return request({
    url: '/api/business/process/low/save',
    method: 'post',
    data: data
  })
}
