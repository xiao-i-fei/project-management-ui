import request from '@/utils/request'

// 查询接口请求记录列表
export function statisticalQuery() {
  return request({
    url: '/api/interfaceRequestInfo/statisticalQuery',
    method: 'get'
  })
}
