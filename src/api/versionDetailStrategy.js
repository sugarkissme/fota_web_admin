import request from '@/utils/request'

/** 版本升级定制策略查询*/
export function fetchList(versionDetailId) {
    return request({
      url:'/versionDetailStrategy/queryByVersionDetailId/'+versionDetailId,
      method:'get',
      params:params
    })
  }

/**版本升级定制策略编辑 */
export function updateVersionDetailStrategy(params) {
  return request({
    url:'/versionDetailStrategy/updateVersionDetailStrategy',
    method:'post',
    params:params
  })
}