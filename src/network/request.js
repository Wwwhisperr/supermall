import axios from 'axios'

export function request(config){
  // 创建axios实例
  const instance=axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',//接口
    timeout:5000
  })
  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err);

  }) 

  // 响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  }) 


  // 发送真正的网络请求 
  // 返回的是promise，其他地方调用之间.then处理
  return instance(config)

}