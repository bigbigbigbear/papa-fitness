import request from '@/utils/request'

// 获取品牌数据
export function getBrandsData (param) {
  return request({
    url: '/business/business/businessGet',
    method: 'post',
    data: param
  })
}

// 编辑品牌数据
export function editBands (param) {
  return request({
    url: '/business/business/businessUpdate',
    method: 'post',
    data: param
  })
}
