import request from '@/utils/request'
import axios from 'axios'
/**分页查询版本 */
export function fetchList(params) {
  return request({
    url: '/version/queryVersionPage',
    method: 'get',
    params: params
  })
}
/**添加版本 */
export function createVersion(data) {
  return axios.post('/version/create', data)
}

/**版本信息查询 */
export function getversionInfo(versionId) {
  return axios.get('/version/queryVersion?versionId=' + versionId)
}
/**编辑版本 */
export function updateversion(data) {

  return axios.post('/version/update', data)
}
/**删除版本 */
export function deleteVersion(versionId) {

  return axios.post('/version/delete?id=' + versionId)

}