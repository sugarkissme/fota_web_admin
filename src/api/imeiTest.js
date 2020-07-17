import request from '@/utils/request'

import axios from 'axios'
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

    return axios.post('/imeiTest/create',data)
}

/**删除指定项目的imeiTest */
export function deleteIemiTestByProjectId(projectId) {
  return axios.post('/imeiTest/deleteByProjectId/'+projectId)
 
  }
/**删除指定imei */
export function deleteIemiTestById(id) {
   
    return axios.post('/imeiTest/deleteById/'+id)
}

/**重置所有imeiTest */
export function resetAllStatus() {
  return axios.post('/imeiTest/resetAllStatus')
  }

/**重置指定测试imei,status 1启用 0停用 */
export function resetStatusById(id,status) {
  return axios.post('/imeiTest/resetStatusById?id='+id+'&status='+status)
  }

  export function imeiTemplateDownLoad() {
    return axios.get('/template/download?templateName=imeiTestImportTemplate')
  }
