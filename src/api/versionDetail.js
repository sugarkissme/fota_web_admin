import request from '@/utils/request'
/**版本配置分页查询(升级包上传文件展示列表接口) */
export function fetchList(params) {
    return request({
      url:'/versionDetail/queryVersionDetailPageByVersionId',
      method:'get',
      params:params
    })
  }
/**更新版本详情配置状态 */
  export function updateVersionDetailStatus(params) {
    return request({
      url:'/versionDetail/updateVersionDetailStatus',
      method:'post',
      params:params
    })
  }
