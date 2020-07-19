import {takeEvery,call,} from 'redux-saga/effects'
import {FETCHTODO} from './../contants'
import axios from 'axios'

//users
function* gFetchTodo(){
    yield console.log("准备获取Todo信息");
    const users=yield call(axios.get,"https://jsonplaceholder.typicode.com/users");
    yield console.log("users",users);
    yield console.log("获取Todo信息完成");
}

 function* watchgFetchTodo(){
     yield  console.log("watchgFetchTodo开始");
     yield takeEvery(FETCHTODO,gFetchTodo);
     yield console.log("watchgFetchTodo结束");
}
export const fetchTodoSaga=[
    watchgFetchTodo()
]