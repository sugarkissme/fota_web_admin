import request from '@/utils/request'
/**项目查询 */
export function fetchList(params) {
    return request({
      url:'project/queryPage',
      method:'get',
      params:params
    })
  }
/**项目添加 */
export function createProject(data) {
    return request({
      url:'/project/create',
      method:'post',
      data:data
    })
  }
