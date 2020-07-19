import {all} from 'redux-saga/effects'
import {addAsyncSaga} from './counter'
import {fetchUserSagas} from './users'
import  {fetchTodoSaga} from './todos'

//合并watch generator函数

export function* rootSaga(){
    yield all([
     ...addAsyncSaga,
     ...fetchUserSagas,
     ...fetchTodoSaga      
    ])
}