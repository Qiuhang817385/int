import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { request, requestWithToken } from '~service/request';



function* logout () {
  yield takeEvery(REQUEST_LOGOUT, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(requestWithToken.post, '/user/logout', payload)
      localStorage.removeItem('token');
      localStorage.removeItem('lastFetchedTime')
      resolve && resolve(response)
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('lastFetchedTime')
      reject && reject(response)
    }
  })
}

function* getImgCode () {
  yield takeEvery(REQUEST_Img_code, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(requestWithToken.post, '/common/greph-code', payload)
      resolve && resolve(response)
    } catch (error) {
      reject && reject(response)
    }
  })
}

function* getApplPermission () {
  yield takeEvery(getApplPermission, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(requestWithToken.post, '/user/first', payload)

      yield put({
        type: getApplPermission,
        data: response.data.list
      })

      resolve && resolve(response.data)
    } catch (error) {
      yield put({
        type: RECEIVE_FIRST_LEVEL_PERSSION,
        data: []
      })
      reject && reject(response)
    }
  })
}

function* getFirstLevelPermission () {
  yield takeEvery(REQUEST_first_level, function* ({ payload, resolve, reject }) {
    try {
      const response = yield call(requestWithToken.post, '/user/first', payload)

      yield put({
        type: RECEIVE_FIRST_LEVEL_PERSSION,
        data: response.data.list
      })

      resolve && resolve(response.data)
    } catch (error) {
      yield put({
        type: RECEIVE_FIRST_LEVEL_PERSSION,
        data: []
      })
      reject && reject(response)
    }
  })
}

export default function* authFlow () {
  yield all([
    fork(函数1)
    fork(函数1)
    fork(函数1)
    fork(函数1)
    fork(函数1)
    fork(函数1)
    fork(函数1)
  ])
}