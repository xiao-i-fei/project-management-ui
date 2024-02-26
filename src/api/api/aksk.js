import request from '@/utils/request'

// 查询凭据信息，存储访问密钥和密钥信息列表
export function listAkSk(query) {
  return request({
    url: '/api/aksk/list',
    method: 'get',
    params: query
  })
}

// 查询凭据信息，存储访问密钥和密钥信息详细
export function getAkSk(id) {
  return request({
    url: '/api/aksk/' + id,
    method: 'get'
  })
}

// 新增凭据信息，存储访问密钥和密钥信息
export function addAkSk() {
  return request({
    url: '/api/aksk',
    method: 'post'
  })
}

// 修改凭据信息，存储访问密钥和密钥信息
export function updateAkSk(data) {
  return request({
    url: '/api/aksk',
    method: 'put',
    data: data
  })
}

// 删除凭据信息，存储访问密钥和密钥信息
export function delAkSk(id) {
  return request({
    url: '/api/aksk/' + id,
    method: 'delete'
  })
}
