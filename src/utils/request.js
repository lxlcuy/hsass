import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  // 为了触发/api开发时的跨域代理
  // 需要把VUE_APP_BASE_API /dev-api 改为  /api
  baseURL: process.env.VUE_APP_BASE_API // 设置axios请求的基础的基础地址
  //   timeout: 5000 // 定义5秒超时
})
// 请求拦截器
// service.interceptors.request.user()

// 响应拦截器

// service.interceptors.response.user(
//   response => {
//     // axios默认有一层data
//     const { success, message, data } = response.data

//     if (success) {
//       return data
//     } else {
//       Message.error(message) // 提示错误 业务逻辑已经错误  不能进入then
//       //  应该直接进入catch
//       return Promise.reject(new Error(message))
//     }
//   },
//   error => {
//     Message.error(error.message) // 提示错误信息
//     return Promise.reject(error) // 返回执行错误 让当前的执行跳出成功 直接进入catch
//   }
// )
// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios默认加了一层data
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
)

export default service
