import axios from 'axios'
import qs from 'qs'
// import nprogress from 'nprogress'
import router from '../router/index'
import { Message } from 'element-ui'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const $http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://pm2.winvers.com/zhdxhd',
  timeout: process.env.NODE_ENV === 'development' ? 60 * 1000 : 10 * 1000
})

// 请求拦截
$http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    } else {
      // router.push('/login')
    }
    return config
  },
  err => {
    return Promise.reject(err)
    // console.log(err)
  }
)

// 响应拦截
$http.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 200) {
        return response.data.data
      } else {
        Message.error({
          message: response.data.msg,
          showClose: true,
          duration: 2000
        })
        return Promise.reject(response.data)
      }
    }
  },
  err => {
    const { response } = err
    if (response) {
      switch (response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          Message.error({
            message: '登录过期，请重新登录',
            showClose: true,
            duration: 2000
          })
          localStorage.removeItem('token')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
        case 404:
          Message.error({
            message: '登网络请求不存在',
            showClose: true,
            duration: 2000
          })
          break
        default:
          Message.error({
            message: response.data.msg,
            showClose: true,
            duration: 2000
          })
      }
    } else {
      // 服务器连结果都没有返回
      if (!window.navigator.onLine) {
        // 客户端断网
        Message.error({
          message: '网络连接失败，请检查网络！',
          showClose: true,
          duration: 2000
        })
      }
    }
    return Promise.reject(err)
  }
)

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
export default $http
