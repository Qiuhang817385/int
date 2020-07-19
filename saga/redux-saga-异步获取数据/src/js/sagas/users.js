import {takeEvery,call,put} from 'redux-saga/effects'
import {FETCHUSER,FETCHUSERERROR,FETCHUSERSUCCESS} from './../contants'
import axios from 'axios'

//users
function* gFetchUser(){
   try{
    yield console.log("准备获取用户信息");
    const users=yield call(axios.get,"https://jsonplaceholder.typicode.com/users");
    yield put({type:FETCHUSERSUCCESS,user:users})
    yield console.log("users",users);
    yield console.log("获取用户信息完成");
   }catch(e){
     yield put({type:FETCHUSERERROR,error:e.message})
   }
}

 function* watchgFetchUser(){
     yield  console.log("watchgFetchUser开始");
     yield takeEvery(FETCHUSER,gFetchUser)
     yield console.log("watchgFetchUser结束");
}

//posts
function* gFetchPosts(){
    yield console.log("准备获取posts信息");
    const users=yield call(axios.get,"https://jsonplaceholder.typicode.com/users");
    yield console.log("users",users);
    yield console.log("获取posts信息完成");
}

function* watchgFetchPosts(){
     yield  console.log("watchgFetchPosts开始");
     yield takeEvery(FETCHUSER,gFetchPosts)
     yield console.log("watchgFetchPosts结束");
}

export const fetchUserSagas=[
    watchgFetchUser(),
    watchgFetchPosts()
] 