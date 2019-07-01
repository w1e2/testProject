import request from '@/utils/request'
// 卡用户管理-查询按钮
export function queryInit(WorkingPoolDTO) {
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}

export function initInfo(WorkingPoolDTO) {
  // 卡用户管理-初始化表格数据
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}

export function addInfo(WorkingPoolDTO) {
  // 卡用户管理-录入按钮
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}
