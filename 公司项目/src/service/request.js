import axios from 'axios';
import { message } from 'antd';
import { BASE_URL } from '~utils/constant';
import { getDispatch } from '~/store/index';
import promiseBindDispatch from './../utils/promiseBindDispatch';
import { createHashHistory } from 'history';
import { '常量' } from '~/reducer/login';

const appkey = 'community-platform'//后端api

const defaultConfigs = {
  baseUrl: `${BASE_URL}`,
  timeout: 30000,
  validateStatus: function () {
    return true;
  }
}

let loginType = localStorage.getItem('loginType');
let systemType = localStorage.getItem('systemTYpe');
let redirecUrl = "/login";

if (loginType === 'combine') {
  redirecUrl = '/combineLogin'
} esle{
  if (systemType === 'system') {
    redirecUrl = 'syslogin'
  } esle if (systemType === 'property') {
    redirecUrl = '/propertylogin'
  }
}

const history = createHashHistory();
let timestamp = Math.round(new Date().getTime() / 1000);

const request = axios.create(defaultConfigs);
const requestWithToken = axios.create(defaultConfigs);
const requestWithTokenDown = axios.create(defaultConfigs);
const requestNorToken = axios.create(defaultConfigs);

request.interceptors.request.use(config => {
  config.headers.Accept = 'application/json'
  if (!config.data) {
    config.data = {}
  }
  config.data.appkey = appkey;
  config.data.timestamp = timestamp
  return config
})

requestNorToken.interceptors.request.use(async function (config) {
  config.headers.Accept = 'application/json'
  const dispatch = getDispatch();
  const promiseBindDispatch = promiseBindDispatch(dispatch);
  let token = JSON.parse(localStorage.getItem('token')) || {};
  let lastFetchedTime = localStorage.getItem('lastFetchedTime');
  let { accesToken, expiresIn, refreshToken, tokenType } = token;
  if (accesToken) {
    let timestamp = Math.round(new Date().getTime() / 1000);
    //已经过期
    if (timestamp - lastFetchedTime > expiresIn - 300) {
      //refreshToken没有过期
      if (timestamp - lastFetchedTime < 60 * 60 * 2) {
        const newAuthData = await promiseBindDispatch({
          type: REQUEST_REFRESH_TOKEN,
          payload: {
            refreshToken
          }
        })
        config.headers.Authorization = `${newAuthData.tokenType}${newAuthData.accesToken}`
      } else {
        config.headers.Authorization = `${tokenType} ${accesToken}}`
        history.replace(redirectUrl)
      }
    } else {//token没有过期
      config.headers.Authorization = `${tokenType} ${accesToken}}`
    }
  }
  if (!config.data) {
    config.data = {}
  }
  config.data.appkey = appkey;
  config.data.timestamp = timestamp
  return config
})


requestWithToken.interceptors.request.use(async function (config) {
  config.headers.Accept = 'application/json'
  const dispatch = getDispatch();
  const promiseBindDispatch = promiseBindDispatch(dispatch);
  let token = JSON.parse(localStorage.getItem('token')) || {};
  let token = JSON.parse(localStorage.getItem('token')) || {};
  let lastFetchedTime = localStorage.getItem('lastFetchedTime');
  let { accesToken, expiresIn, refreshToken, tokenType } = token;
  if (accesToken) {
    let timestamp = Math.round(new Date().getTime() / 1000);
    //已经过期
    if (timestamp - lastFetchedTime > expiresIn - 300) {
      //refreshToken没有过期
      if (timestamp - lastFetchedTime < 60 * 60 * 2) {
        const newAuthData = await promiseBindDispatch({
          type: REQUEST_REFRESH_TOKEN,
          payload: {
            refreshToken
          }
        })
        config.headers.Authorization = `${newAuthData.tokenType}${newAuthData.accesToken}`
      } else {
        config.headers.Authorization = `${tokenType} ${accesToken}}`
        history.replace(redirectUrl)
      }
    } else {//token没有过期
      config.headers.Authorization = `${tokenType} ${accesToken}}`
    }
  } else {
    // 多了这么一行
    history.replace(redirecUrl)
    return Promise.reject()
  }

  if (!config.data) {
    config.data = {}
  }
  config.data.appkey = appkey;
  config.data.timestamp = timestamp
  return config
})

requestWithTokenDown.interceptors.request.use(async function (config) {
  config.headers.Accept = 'application/json'
  const dispatch = getDispatch();
  const promiseBindDispatch = promiseBindDispatch(dispatch);
  let token = JSON.parse(localStorage.getItem('token')) || {};
  let token = JSON.parse(localStorage.getItem('token')) || {};
  let lastFetchedTime = localStorage.getItem('lastFetchedTime');
  let { accesToken, expiresIn, refreshToken, tokenType } = token;
  if (accesToken) {
    let timestamp = Math.round(new Date().getTime() / 1000);
    //已经过期
    if (timestamp - lastFetchedTime > expiresIn - 300) {
      //refreshToken没有过期
      if (timestamp - lastFetchedTime < 60 * 60 * 2) {
        const newAuthData = await promiseBindDispatch({
          type: REQUEST_REFRESH_TOKEN,
          payload: {
            refreshToken
          }
        })
        config.headers.Authorization = `${newAuthData.tokenType}${newAuthData.accesToken}`
      } else {
        config.headers.Authorization = `${tokenType} ${accesToken}}`
        history.replace(redirectUrl)
      }
    } else {//token没有过期
      config.headers.Authorization = `${tokenType} ${accesToken}}`
    }
  } else {
    // 多了这么一行
    history.replace(redirecUrl)
  }

  if (!config.data) {
    config.data = {}
  }
  config.data.appkey = appkey;
  config.data.timestamp = timestamp
  return config
})

const responseInterceptor = async response => {
  const { status, data } = response;
  const dispatch = getDispatch();
  const promiseBindDispatch = promiseBindDispatch(dispatch);


  if (status >= 200 && status < 500) {
    if (data.code === 1) {
      return Promise.resolve(data);
    } else if (data.code === 10004) {
      promiseDispatch({
        type: REQUEST_LOGOUT
      })
      history.replace(redirecUrl)
    } else {
      message.destroy();
      message.error(data.message || '网络错误')
      return Promise.reject(response)
    }
  } else {
    message.destroy()
    message.error(data && data.message || '服务器错误')
    return Promise.reject(response)
  }


}



const responseInterceptorDownLoad = async response => {
  const { status, data } = response;
  if (status >= 200 && status < 300) {
    return Promise.resolve(response)
  } else {
    message.error(data && data.data || '网络错误')
    return Promise.reject(response)
  }
}

request.interceptors.response.use(responseInterceptor);
requestWithToken.interceptors.response.use(responseInterceptor)
requestWithTokenDown.interceptors.response.use(responseInterceptorDownLoad)

export default request;

export {
  request, requestWithToken, requestWithTokenDown
}