import request from '@/utils/request'

// 查询接口信息列表
export function listInfo(query) {
  return request({
    url: '/api/info/list',
    method: 'get',
    params: query
  })
}

// 查询接口信息详细
export function getInfo(id) {
  return request({
    url: '/api/info/' + id,
    method: 'get'
  })
}

// 新增接口信息
export function addInfo(data) {
  return request({
    url: '/api/info',
    method: 'post',
    data: data
  })
}

// 修改接口信息
export function updateInfo(data) {
  return request({
    url: '/api/info',
    method: 'put',
    data: data
  })
}

// 删除接口信息
export function delInfo(id) {
  return request({
    url: '/api/info/' + id,
    method: 'delete'
  })
}

/**
 * 调用api接口
 */
export function interfaceRequest(data){
  return request({
    url: 'interface/test/request',
    method: 'post',
    data: data
  })
}
