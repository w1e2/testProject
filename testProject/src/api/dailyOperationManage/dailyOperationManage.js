import request from '@/utils/request'
// 日常操作管理-初始化表格请求
export function queryInit(WorkingPoolDTO) {
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}

export function queryInfo(WorkingPoolDTO) {
  // 查询按钮
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}

export function addInfo(WorkingPoolDTO) {
  // 录入按钮
  return request({
    url: '/api/wf/WorkingPool/manuUWAllNeweasyQueryClick', // 修改
    method: 'post',
    data: WorkingPoolDTO
  })
}
