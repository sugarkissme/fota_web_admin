import request from '@/utils/request'

export function fetchList(params) {
    return request({
      url:'/designCompany/queryPage',
      method:'get',
      params:params
    })
  }

export function createDesignCompany(data) {
    return request({
      url:'/designCompany/create',
      method:'post',
      data:data
    })
  }

export function getDesignCompany(id) {
    return request({
      url:'/designCompany/detail?id='+id,
      method:'get'  
    })
}

export function updateDesignCompany(data) {
    return request({
        url:'/designCompany/update',
        method:'post',
        data:data
    })
}