import request from '@/utils/request'
import axios from 'axios'

/**版本配置分页查询(升级包上传文件展示列表接口) */
export function fetchList(params) {
    return request({
      url:'/version/queryVersionDetailPageByVersionId',
      method:'get',
      params:params
    })
  }
/**更新版本详情配置状态 */
  export function updateVersionDetailStatus(params) {
    return axios.post('/version/updateVersionDetailStatus',params)
  }
/**更新版本详情配置 */
  export function updateVersionDetail(params) {
    return axios.post('/version//updateVersionDetail',params)
  }

  export function getAllLanguages(){
    return axios.get('/version/queryLanguageAll')
  }


