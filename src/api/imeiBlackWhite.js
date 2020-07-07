
import axios from 'axios'

  /**重置指定测试imei,黑白名单 1启用 0停用 */
export function resetBlackByProjectIdAndImei(projectId,imei,blackFlag) {
  return axios.post('/imeiBlackWhite/resetStatusByProjectIdAndImei?projectId='+projectId+'&blackFlag='+blackFlag+"&imei="+imei)
  }