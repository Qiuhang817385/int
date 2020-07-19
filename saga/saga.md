![image-20200422103710280](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422103710280.png)

![image-20200422103915620](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422103915620.png)



![image-20200422103942187](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422103942187.png)













![image-20200422104036909](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422104036909.png)

![image-20200422104102704](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422104102704.png)

### 里面的函数依赖于外面的函数调用

![image-20200422104123379](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422104123379.png)





![image-20200422104200676](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422104200676.png)







# 开始使用

![image-20200422104240017](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422104240017.png)





## 自己搭建的需要安装generator支持

![image-20200422104548747](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422104548747.png)



![image-20200422135441122](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422135441122.png)





## redux的中间件,中间件是redux的概念



thunk允许action返回一个函数

![image-20200422140018795](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422140018795.png)





步骤1.

![image-20200422140654073](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422140654073.png)

![image-20200422141240481](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422141240481.png)

组件

![image-20200422142241774](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422142241774.png)

![image-20200422141350490](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422141350490.png)



sagas.js

![image-20200422142215116](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422142215116.png)









![image-20200422142813753](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200422142813753.png)



## call,put,takelatest,takeevery





## takeEvery
​    用来监听action，每个action都触发一次，如果其对应是异步操作的话，每次都发起异步请求，而不论上次的请求是否

## takeLatest(用来阻止重复提交)
​         作用同takeEvery一样，唯一的区别是它只关注最后，也就是最近一次发起的异步请求，如果上次请求还未返回，则会被取消。

##  call
call用来调用异步函数，将异步函数和函数参数作为call函数的参数传入，返回一个js对象。
saga引入他的主要作用是方便测试，同时也能让我们的代码更加规范化。

​     修改sagas/index.js文件
​       import { takeEvery,put,call} from 'redux-saga/effects‘
​       call(delay,2000);//模拟ajax异步请求



## call 和 fork 

call 和 fork 都是用来执行指定函数 fn，区别在于：

1. call effect 会阻塞当前 saga 的执行，直到被调用函数 fn 返回结果，才会执行下一步代码。
2. fork effect 则不会阻塞当前 saga，会立即返回一个 task 对象。

说明:fork 的异步非阻塞特性更适合于在后台运行一些不影响主流程的代码



## redex-saga文件夹/ redux-saga 综合实验-6
通过redux-saga实现 axios异步请求合并多个saga函数:
说明:redux-saga中all方法:
all，可以将多个异步操作作为参数参入all函数中，如果有一个call操作失败或者所有call操作都成功返回，则本次all操作执行完毕。all中异步处理是并发也就是同时执行，不用等一个结束，另一个开始。
    call是阻塞性调用 ，fork是非阻塞性调用
    call方法，中间件会停止 generator 函数(被阻塞)，直到 axios 返回的 Promise 被 resolved（或 rejected），然后才恢复执行 generator 函数。
       import { takeEvery,put,call,all} from ‘redux-saga/effects‘ //call 可以换成fork看看

```js
1.修改contants/index.js，添加常量
     export const FETCHUSER='FETCHUSER';
2.修改actions/index.js，添加fetchUser的action函数
import {ADD,SUB,ADDASYNC,FETCHUSER} from './../contants'

export const fetchUser=()=>{
    return {
        type:FETCHUSER
    }
}
```



## 修改sagas/index.js，添加watchFetchUser监听器saga,和FetchUser函数
```js
import { takeEvery,put,call,all} from 'redux-saga/effects'
import {ADDASYNC,ADD,FETCHUSER} from './../contants'
import axios from 'axios‘
……
//fetchUser
function* fetchUser(){
    const users=yield call(axios.get,"https://jsonplaceholder.typicode.com/users");
    console.log(users);
}
//fetchUser监听函数
function* watchFetchUser(){
	yield takeEvery(FETCHUSER,fetchUser);
}
```





## 4.修改sagas/index.js，添加watchFetchUser监听器saga,和FetchUser函数
```js
….
//合并两个监听器saga
//将两个监听函数合并成一个函数，然后默认导出
function* rootSaga(){
yield all([
    watchAddAsync(),
    watchFetchUser()
]);
}
export default rootSaga;
```





## 说明:存在问题,all({监听函数(),监听函数()….})，比较多会比较难看，而且saga 有时候分散到其他文件，下一个实验解决



```js
5.修改index.js，导入rootSaga,并运行rootSaga
import rootSaga from './sagas'
sagaMiddleware.run(rootSaga);//运行saga

6.修改App.jsx组件,绑定事件，导入action 函数fetchUser
import {add,sub,addAsync,fetchUser} from './actions'
…..
let {counter,add,sub,addAsync,fetchUser}=this.props;
…..
<p>
<button onClick={()=>fetchUser()}>获取用户信息</button>
</p>
…..
export default connect(mapStateToProps,{add,sub,addAsync,fetchUser})(App)

```

```js
问题:所有的saga函数都写到sagas/index.js中，将来会非常庞大，而且难以维护，
所以将sagas/index.js 中代码分离到sagas/counter.js和 sagas/users.js中

redex-saga文件夹/ redux-saga-all综合实验-7

1.修改sagas/index.js

2.新建:sagas/counter.js

3.新建sgags/users.js

说明:其他文件不用更改

```

```js
预备知识:ES5,js对象转换为数组方法
   1.   Object.values():
         Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值。
      Object文件夹/demo1   
      Object文件夹/demo2

   2.   Object.keys()
         Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名。
      Object文件夹/demo3
      Object文件夹/demo4

```

```js
 Object.entries():
         Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组。
      Object文件夹/demo5
      Object文件夹/demo6

复习:拓展参数: Object文件夹/demo7
              function test(x,y,z){
			return x+y+z;
		}
		var arr=[10,20,30];
		console.log(test(...arr));
   //输出  60

```

## 在前面实验基础上，新增一个saga函数todo

```js
综合实验-8

1.在sagas文件夹下，增加一个文件todo.js
因为都是同样的ajax请求，所以将users.js代码复制到todo.js中，
修改函数名:
fetchUser改为fetchTodo 

watchFetchUser改为watchFetchToto

FETCHUSER改为FETCHTODO

2.在contatnts/index.js下新增常量:
export const FETCHTODO='FETCHTODO';

3.在actions/index.js下新增fetchTodo  action方法:
       export const fetchTodo=()=>{
          return {
            type:FETCHTODO
             }
```



## 在前面实验基础上，新增一个saga函数todo

```js
4.修改sagas/index.js
import {watchFetchTodo} from './todo'
//将两个监听函数合并成一个函数，然后默认导出
function* rootSaga(){
    yield all([
        watchAddAsync(),
        watchFetchTodo(),
        watchFetchUser()
    ]);
    }
export default rootSaga;
```

## 在前面实验基础上，新增一个saga函数todo

```js

5.修改App.jsx

import {add,sub,addAsync,fetchUser,fetchTodo} from './actions‘
…..
let {counter,add,sub,addAsync,fetchUser,fetchTodo}=this.props;
……
<p>
<button onClick={()=>fetchTodo()}>获取Todo信息</button>
</p>
……

export default connect(mapStateToProps,{add,sub,addAsync,fetchUser,fetchTodo})(App)

```

## 在前面实验基础上，使用fork方法，非阻塞调用—写法一

```js

redux-saga文件夹/redux-saga综合实验-9
修改:sagas/index.js
function* rootSaga(){
    fork effect 则不会阻塞当前 saga，会立即返回一个 task 对象。
yield all([
    fork(watchAddAsync),
    fork(watchFetchTodo),
    fork(watchFetchUser)
]);
}

```

## 在前面实验基础上，使用fork方法，非阻塞调用—写法二

```js

redux-saga文件夹/redux-saga综合实验-10
1.  修改:sagas/users.js 添加一个watchFetchPosts 函数，发送的还是FETCHUSER，主要用于模拟一个users.js文件中，有多个异步请求情况
//fetchPosts
function* fetchPosts(){
    const posts=yield call(axios.get,"https://jsonplaceholder.typicode.com/posts");
    console.log("posts:",posts);
}
//fetchPosts监听函数
export function* watchFetchPosts(){
	yield takeEvery(FETCHUSER,fetchPosts); //fetchPosts函数发送的也是FETCHUSER,只为模拟请求
}
```



```js
2. 修改:sagas/index.js
import * as userSagas from ‘./users‘  //一次性要到users.js中所有generator函数
function* rootSaga(){
    yield all([
        //本身的saga
        ...Object.values(watchAddAsync),
        ...Object.values(watchFetchTodo),
        //users的saga
        ...Object.values(userSagas)
     ].map(fork));
}
          export default rootSaga;

```

## 在前面实验基础上，每个saga文件自己导出一个数组

```js
redux-saga文件夹/redux-saga综合实验-11
修改:sagas/counter.js
export	function* watchAddAsync(){
    yield takeEvery(ADDASYNC,gAddAsync);
}

删除export

添加:
export const addAsyncSaga=[
     watchAddAsync()
];
```

## 在前面实验基础上，每个saga文件自己导出一个数组

```js
redux-saga文件夹/redux-saga综合实验-11
修改:sagas/todo.js
//fetchTodo监听函数
删除function* watchFetchTodo(){
	yield takeEvery(FETCHTODO,fetchTodo);
}前面的export
export const fetchTodoSaga=[
      watchFetchTodo()
];
```

## 在前面实验基础上，每个saga文件自己导出一个数组

```js

redux-saga文件夹/redux-saga综合实验-11
修改:sagas/users.js
//fetchUser监听函数
删除function* watchFetchUser(){
	yield takeEvery(FETCHUSER,fetchUser);
}前面的export
//fetchPosts监听函数
删除function* watchFetchPosts(){
    yield takeEvery(FETCHUSER,fetchPosts); //fetchPosts函数发送的也是FETCHUSER,只为模拟请求
}前面的export

```

## 在前面实验基础上，每个saga文件自己导出一个数组--这个

```js
redux-saga文件夹/redux-saga综合实验-11
修改:sagas/users.js
添加:export const fetchUsersSaga=[
         watchFetchUser(),
         watchFetchPosts()
   ];

```

```js
在前面实验基础上，每个saga文件自己导出一个数组
redux-saga文件夹/redux-saga综合实验-11
修改:sagas/index.js
import {fetchUsersSaga} from './users'
import {addAsyncSaga} from './counter'
import {fetchTodoSaga} from './todo'
function* rootSaga(){
    
    all，可以将多个异步操作作为参数参入all函数中，如果有一个call操作失败或者所有call操作都成功返回，则本次all操作执行完毕。all中异步处理是并发也就是同时执行，不用等一个结束，另一个开始。
    
yield all([
...fetchUsersSaga,
...addAsyncSaga,
...fetchTodoSaga
]);
}
export default rootSaga;

```

```js
在前面实验基础上，实现redux-saga 异步ajax请求，完整过程
redux-saga文件夹/redux-saga ajax请求完成过程-综合实验-12

实现功能描述:点击      按钮            ，

发送action {type:FETCHUSER}，reudcer进行处理显示Loading，

之后中间件redux-saga拦截，ajax成功执行后通过put方法转发action及数据 

{type:FETCH_USER_SUCCESS,user:users} reducer进行处理，

连接到App.jsx刷新this.props，数据刷出来了

```

```js
1.修改sagas/users.js
//fetchUser
function* fetchUser(){
try{
	const users=yield call(axios.get,"https://jsonplaceholder.typicode.com/users");
    yield put({type:FETCH_USER_SUCCESS,user:users});
}catch(e){
    yield put({type:FETCH_USER_ERROR,error:e});
 }
}
```

```js
2.修改reducers/users.js
const initialState={
    isLoading:false,
    error:null,
    user:null
}
const users=(state=initialState,action={})=>{
    switch(action.type){
        case FETCHUSER:
        return {
            isLoading:true,
            error:null,
            user:null
       	case FETCH_USER_SUCCESS:
        return {
            isLoading:false,
            error:null,
            user:action.user
        }
        case FETCH_USER_ERROR:
        return {
            isLoading:false,
            error:action.error,
            user:null
        }
        default:
            return state;
      }
}
```



```js
3.修改App.jsx
const mapStateToProps=(state)=>{
    console.log("mapStateToProps",state.users)
    return {
        counter:state.counter,
        users:state.users
    }
}

```

```js
3.修改App.jsx
let {counter,add,sub,addAsync,fetchUser,fetchTodo}=this.props;
let {isLoading,error,user}=this.props.users;
let data=null;
if(error){
    data=error.message;
 }else if(isLoading){
    data="Loading...";
 }else{
    data=user && user.data[0].name;
}
….
<h3>{data}</h3>

```

# 环境

```js
环境准备:让webpack支持regeneratorRuntime 
1.安装  yarn add  babel-plugin-transform-runtime
```

## 比较async和await

绝大多数情况下不需要了，但是你还是应该了解下 saga 比 async/await 强大的地方，比如取消一个任务，比如协调多个任务的并发之类的高级功能。

个人认为，通常情况下 async/await 就可以了，碰到异步流复杂地方可以考虑局部使用 saga，不喜欢 saga 的，也可以考虑局部使用基于 rxjs 的 redux-observable 做复杂异步流的处理，只有在可以遇见项目的许多异步流程一定会很复杂的情况下才考虑全局使用 saga 或者 redux-observable 比较好。