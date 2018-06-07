import request from '@/utils/request'

// 获取接口列表
export function getApiList (params) {
  return request({
    url: '/admin/interface/list',
    method: 'post',
    data: params
  })
}

// 新增接口
export function addApi (params) {
  return request({
    url: '/admin/interface/add',
    method: 'post',
    data: params
  })
}

/**
 * 编辑接口，参数interface_id，interface_belong，interface_name，interface_path，interface_status,interface_type,interface_verify
 */
export function editApi (params) {
  return request({
    url: '/admin/interface/edit',
    method: 'post',
    data: params
  })
}

/**
 * 删除接口，参数interface_id
 */
export function delApi (params) {
  return request({
    url: '/admin/interface/del',
    method: 'post',
    data: params
  })
}
