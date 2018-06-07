import request from '@/utils/request'

// 员工列表
export function staffList(param) {
  return request({
    url: '/business/personnel/list',
    method: 'post',
    data: param
  })
}

// 添加员工资料
export function addStaffData(param) {
  return request({
    url: '/business/personnel/add',
    method: 'post',
    data: param
  })
}

// 删除员工
export function delStaffData(param) {
  return request({
    url: '/business/personnel/del',
    method: 'post',
    data: param
  })
}

// 获取员工信息
export function getStaffData(param) {
  return request({
    url: '/business/personnel/get',
    method: 'post',
    data: param
  })
}

// 编辑员工信息
export function editStaffData(param) {
  return request({
    url: '/business/personnel/edit',
    method: 'post',
    data: param
  })
}
