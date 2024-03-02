import request from '@/utils/request'

// 查询用户调用接口关系列表
export function listUserInterfaceInfo(query) {
  return request({
    url: '/api/userInterfaceInfo/list',
    method: 'get',
    params: query
  })
}

// 查询用户调用接口关系详细
export function getUserInterfaceInfo(id) {
  return request({
    url: '/api/userInterfaceInfo/' + id,
    method: 'get'
  })
}

// 新增用户调用接口关系
export function addUserInterfaceInfo(data) {
  return request({
    url: '/api/userInterfaceInfo',
    method: 'post',
    data: data
  })
}

// 修改用户调用接口关系
export function updateUserInterfaceInfo(data) {
  return request({
    url: '/api/userInterfaceInfo',
    method: 'put',
    data: data
  })
}

// 删除用户调用接口关系
export function delUserInterfaceInfo(id) {
  return request({
    url: '/api/userInterfaceInfo/' + id,
    method: 'delete'
  })
}

// 用户订阅接口，新增用户接口关联关系
export function handleSubscription(interfaceId) {
  return request({
    url: '/api/userInterfaceInfo/subscription/' + interfaceId,
    method: 'post'
  })
}
