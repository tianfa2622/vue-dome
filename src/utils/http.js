import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
import { Message } from 'element-ui'
// import { hideLoading, showLoading } from './loading'

// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://pm2.winvers.com/xtwjgl'
    break
  case 'test':
    axios.defaults.baseURL = 'http://192.168.1.12:8080'
    break
  default:
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRouter.fullPath
    }
  })
}

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Message({
    message: msg,
    duration: 2000,
    type: 'error',
    showClose: true
  })
}

// 设置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

// 看公司的后台要求传输的格式
// // 设置请求传递数据的格式 x-www-form-urlencoded xxx=xxx&xxx=xxx
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// // 设置post请求的请求头
// axios.defaults.transformRequest = data => qs.stringify(data)

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    // token存在
    token && (config.headers.Authorization = token)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    const { response } = err
    if (response) {
      switch (response.status) {
        case 401:
          toLogin()
          break
        case 403:
          tip('登录过期，请重新登录')
          localStorage.removeItem('token')
          setTimeout(() => {
            toLogin()
          }, 1000)
          break
        case 404:
          tip('请求的资源不存在')
          break
      }
    } else {
      // 服务器连结果都没有返回
      // 断网处理
      if (!window.navigator.onLine) {
        return
      }
    }
    return Promise.reject(err)
  }
)

export default axios

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
