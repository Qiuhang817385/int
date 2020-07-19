import {takeEvery,put} from 'redux-saga/effects'
import {ADD,ADDASYNC} from './../contants'

 const delay=(ms)=>
    new Promise(resolve=>setTimeout(resolve,ms));
//counter
function* gAddAsync(){
    yield console.log("gAddAsync开始");
    yield delay(2000);
    yield put({type:ADD});//dispatch({type:ADD})
    yield console.log("gAddAsync完成");
}

export function* watchgAddAsync(){
    yield console.log("watchgAddAsync开始");
    yield takeEvery(ADDASYNC,gAddAsync)
    yield console.log("watchgAddAsync完成");
}