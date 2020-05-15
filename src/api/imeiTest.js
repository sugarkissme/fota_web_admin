import request from '@/utils/request'
/**分页查询测试imei */
export function fetchList(params) {
    return request({
      url:'/imeiTest/queryPage',
      method:'get',
      params:params
    })
  }
/**测试imei添加 */
export function createImeiTest(data) {
    return request({
      url:'/imeiTest/create',
      method:'post',
      data:data
    })
  }
/**删除指定项目的imeiTest */
export function deleteIemiTestByProjectId(projectId) {
    return request({
      url:'/imeiTest/deleteByProjectId/'+projectId,
      method:'post',
    })
  }
/**删除指定imei */
export function deleteIemiTestById(id) {
    return request({
      url:'/imeiTest/deleteById/'+id,
      method:'post',
    
    })
  }

/**重置所有imeiTest */
export function resetAllStatus() {
    return request({
      url:'/imeiTest/resetAllStatus',
      method:'post',
    })
  }

/**重置指定测试imei,status 1启用 0停用 */
export function resetStatusById() {
    return request({
      url:'/imeiTest/resetStatusById',
      method:'post',
    })
  }
