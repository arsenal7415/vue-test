﻿/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router/routes'
import store from '../store'
import QS from 'qs'
/**
 * 判断是否是登陆页
 */
const loginReg = /^\/login/i;

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      this.$message('登录过期，请重新登录')
      localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      this.$message('请求的资源不存在');
      break;
    case 0:
      console.log('未登录');
      break;
    default:
      console.log(status)
  }
};

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    //axios的get请求不带content-type所以加上
    if (config.method == 'get') {
      config.data = true
    }
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    const token = store.state.token;
    // if(!loginReg.test(window.location.pathname)){
    //   //非登录页才加token
    //   token && (config.headers.post['token'] = token);
    // }
    return config
  },
  error => Promise.error(error));

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    console.log(error)
    const { response } = error
    // tip('登录过期，请重新登录')
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false)
    }
  });
export function get(url, params){
  return new Promise((resolve, reject) =>{
    instance.get(url, params).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}

export function Delete(url, params) {
  return new Promise((resolve, reject) => {
    instance.delete(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}
