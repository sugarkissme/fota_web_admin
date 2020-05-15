import request from '@/utils/request'
/**分页查询版本 */
export function fetchList(params) {
    return request({
      url:'/version/queryVersionPage',
      method:'get',
      params:params
    })
  }
/**添加版本 */
export function createVersion(data) {
    return request({
      url:'/version/create',
      method:'post',
      data:data
    })
  }
/**版本信息查询 */
export function getversionInfo(versionId) {
    return request({
      url:'/version/queryVersion?versionId'=+versionId,
      method:'get'  
    })
}
/**编辑版本 */
export function updateversion(data) {
    return request({
        url:'/version/update',
        method:'post',
        data:data
    })
    
}
/**删除版本 */
export function deleteVersion(versionId) {

   return request({
    url:'/version/delete?id='+versionId,
     method:'post'

  })
  
}