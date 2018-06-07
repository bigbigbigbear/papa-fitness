import request from '@/utils/request'

// 获取会员列表
export function getMemberList(params) {
  return request({
    url: '/home/member/list',
    method: 'post',
    data: params
  })
}

// 新增会员
export function addMember(params) {
  return request({
    url: '/home/member/add',
    method: 'post',
    data: params
  })
}

/**
 * 获取会员信息
 */
export function getMemberInfo(params) {
  return request({
    url: '/home/member/get',
    method: 'post',
    data: params
  })
}

/**
 * 编辑会员，参数
 */
export function editMember(params) {
  return request({
    url: '/home/member/edit',
    method: 'post',
    data: params
  })
}

/**
 * 删除会员，参数interface_id
 */
export function delMember(params) {
  return request({
    url: '/home/member/del',
    method: 'post',
    data: params
  })
}

/**
 * 导出会员
 */
export function exportMember(params) {
  return request({
    url: '/home/member/export',
    method: 'post',
    data: params
  })
}

// 获取会员卡设置列表
export function getMemberCardTypeList(params) {
  return request({
    url: '/home/memberCardType/list',
    method: 'post',
    data: params
  })
}

// 新增会员卡
export function addMemberCardType(params) {
  return request({
    url: '/home/memberCardType/add',
    method: 'post',
    data: params
  })
}

// 获取会员卡设置信息
export function getMemberCardType(params) {
  return request({
    url: '/home/memberCardType/get',
    method: 'post',
    data: params
  })
}

// 编辑会员卡设置
export function editMemberCardType(params) {
  return request({
    url: '/home/memberCardType/edit',
    method: 'post',
    data: params
  })
}

// 删除会员卡设置
export function delMemberCardType(params) {
  return request({
    url: '/home/memberCardType/del',
    method: 'post',
    data: params
  })
}

// 会员卡列表
export function getMemberCardList(params) {
  return request({
    url: '/home/memberCard/list',
    method: 'post',
    data: params
  })
}
