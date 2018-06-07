import request from '@/utils/request'

// 上传图片
export function uploadImg (params) {
  return request({
    url: '/images/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}

// 获取标签列表
export function getBaseTags (params) {
  return request({
    url: '/home/tag/list',
    method: 'post',
    data: params
  })
}
