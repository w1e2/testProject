import request from '@/utils/request'
// 基础数据配置-初始化表格请求
export function queryInit(WorkingPoolDTO) {
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}

export function addInfo(WorkingPoolDTO) {
  // 基础数据配置添加按钮
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}

export function ruleAddInfo(WorkingPoolDTO) {
  // 规则配置添加按钮
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}

// 规则配置-初始化表格请求
export function queryInitInfo(WorkingPoolDTO) {
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}
