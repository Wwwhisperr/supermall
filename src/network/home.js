// 封装的我对首页数据的所有请求，都在这里统一管理
import {request} from "./request"
export function getHomeMultidate(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}