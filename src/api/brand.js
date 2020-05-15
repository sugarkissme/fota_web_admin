import request from '@/utils/request'

export function fetchList(params) {
    return request({
      url:'/brand/queryPage',
      method:'get',
      params:params
    })
  }

export function createBrand(data) {
    return request({
      url:'/brand/create',
      method:'post',
      data:data
    })
  }

export function getBrand(id) {
    return request({
      url:'/brand/detail?id='+id,
      method:'get'  
    })
}

export function updateBrand(data) {
    return request({
        url:'/brand/update',
        method:'post',
        data:data
    })
    
}