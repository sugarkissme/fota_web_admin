import request from '@/utils/request'
import axios from 'axios'

/** 版本升级定制策略查询*/
export function getVersionStrategyByVersionDetailId(versionDetailId) {
    return axios.get('/version/queryByVersionDetailId/'+versionDetailId)
  }

/**版本升级定制策略编辑 */
export function updateVersionDetailStrategy(params) {
  return axios.post('/version/updateVersionDetailStrategy',params)
}