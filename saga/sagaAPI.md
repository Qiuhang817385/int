# 官网

https://redux-saga-in-chinese.js.org/docs/api/

https://www.jianshu.com/p/6f96bdaaea22

## effects

格式

```js
*(action,effects)=>void
或者
[*(action,effects)=>void,{type}]
type类型
* takeEvery
* takeLatest
* throttle
* watcher
```





## takeEvery

​    用来监听action，每个action都触发一次，如果其对应是异步操作的话，每次都发起异步请求，而不论上次的请求是否,属于被动监听



## takeLatest(用来阻止重复提交)

​         作用同takeEvery一样，唯一的区别是它只关注最后，也就是最近一次发起的异步请求，如果上次请求还未返回，则会被取消。

```js
const takeLatest = {type:'takeLatest'}

effects:{
    addDelay:[
        function*({payload},{call,put}){
            yield call(dalay,100);
            yield put({type:'add',payload})
        },
        takeLatest
    ]
}
```



## take

```js
因为take方法类似于一次性使用得所以经常和while搭配，可以保持一直监听得状态，但是又可以有效的控制流程

take的表现和takeEvery的表现一样,都是监听某一个action,但是和takeEvery不同的是,他不是每次action的时候都响应,而只是在执行顺序执行到take语句的时候才会响应相应的action

当在generator中使用take语句等待action的时候,generator被阻塞,等待action被分发,然后继续向下执行
takeEvery知识监听每个action,然后执行处理函数,对应什么时候相应action,怎么相应,takeEvery没有控制权,take不一样,我们可以在generator函数当中决定什么时候响应一个action,以及一个action被触发后做什么操作

最大的区别:take只有在执行流达到时候才会响应对应的action,而takeEvery一旦注册,立即响应

function* watchInput() {
  let task
  while (true) {
    const { input } = yield take('INPUT_CHANGED')
    if (task) {
      yield cancel(task)
    }
    task = yield fork(handleInput, input)
  }
}
```

##  call

call用来调用异步函数，将异步函数和函数参数作为call函数的参数传入，返回一个js对象。
saga引入他的主要作用是方便测试，同时也能让我们的代码更加规范化。



## call 和 fork 

call 和 fork 都是用来执行指定函数 fn，区别在于：

1. call effect 会阻塞当前 saga 的执行，直到被调用函数 fn 返回结果，才会执行下一步代码。

2. fork effect 则不会阻塞当前 saga，

   会立即返回一个 task 对象。会立即返回一个 task 对象。

说明:fork 的异步非阻塞特性更适合于在后台运行一些不影响主流程的代码

## fork

```js
function* rootSaga(){
     yield all([
        fork(watchAddAsync),
        fork(watchFetchTodo),
        fork(watchFetchUser)
     ]);
     
}
```

## all

 all，可以将多个异步操作作为参数参入all函数中，如果有一个call操作失败或者所有call操作都成功返回，则本次all操作执行完毕。all中异步处理是并发也就是同时执行，不用等一个结束，另一个开始。

```js
合并监听函数
function* rootSaga(){
    yield all([
        watchAddAsync(),
        watchFetchTodo(),
        watchFetchUser()
    ]);
    }
export default rootSaga;


function* rootSaga(){
    fork effect 则不会阻塞当前 saga，会立即返回一个 task 对象。
    //非阻塞调用
    yield all([
            fork(watchAddAsync),
            fork(watchFetchTodo),
            fork(watchFetchUser)
        ]);
    
    //如果写成这样的形式,那么单个saga文件导出的时候是以一个数组
    function* rootSaga(){
        yield all([
        ...Object.values(watchAddAsync),
        ...Object.values(watchFetchTodo),
        ...Object.values(userSagas)
         ].map(fork));
        }
  export default rootSaga;

    


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

## put,相当于dispatch

```js
yield put({type:FETCH_USER_SUCCESS,user:users});
```

## Throttling

用来防止连续不断的响应某个事件。

```js
import { throttle } from 'redux-saga/effects'
function* handleInput(input) {
  // ...
}

function* watchInput() {
  yield throttle(500, 'INPUT_CHANGED', handleInput)
}

//
const throttle = {type:'throttle',ms:100}

effects:{
    addDelay:[
        function*({payload},{call,put}){
            yield call(dalay,100);
            yield put({type:'add',payload})
        },
        throttle
    ]
}
```

## watch

传入的任务函数就是一个watcher直接fork就好

简单理解为在初始化的执行一次，后续的dispatch也不会触发

```js
const watcher = {type:'watcher'}

effects:{
    addDelay:[
        function*({},{call,put,take}){
            while(true){
                const {payload} = yield take('addwatcher');
                yield call(dalay,100);
            	yield put({type:'add',payload})
            }
        },
        watcher
    ]
}

```





## Debouncing

延时执行，使用delay函数实现

```jsx
import { delay } from 'redux-saga'
function* handleInput(input) {
  // debounce by 500ms
  yield call(delay, 500)
  ...
}


function* watchInput() {
  let task
  while (true) {
    const { input } = yield take('INPUT_CHANGED')
    if (task) {
      yield cancel(task)
    }
    task = yield fork(handleInput, input)
  }
}


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
```



## 取消一个任务，比如协调多个任务的并发,这个例子不太对啊



```js
effects: {   
    * takeDemo1({payload}, {put, call, take}) {   
    
    },
    * takeInputChange({payload}, {put, call, take,takeEvery,takeLatest}) {    
        // yield call(delay,1000);    
        console.log(takeEvery);    
     for (let i = 0; i < 3; i++) {     
        const action = yield take('takeBlur'});     
        console.log(action, 'action');     
        console.log(payload.value);    
     }     
},   
    * 
takeBlur() {    console.log(323)   },  }          
changeHandle(e){   
    this.props.dispatch({
        type:'takeInputChange',
       	payload:{value:e.target.value}
   })  
}  
blur(){   
    this.props.dispatch({type:'takeBlur'})  
}  
render() {     
    return (    
        <div style={{position: 'relative'}}>     
        <Input onChange={this.changeHandle.bind(this)} 
        onBlur={this.blur.bind(this)}/>     
</div>    
)  
} 
```



##  11.actionChannel

在之前的操作中，所有的action分发是顺序的，但是对action的响应是由异步任务来完成，也即是说对action的处理是无序的。

如果需要对action的有序处理的话，可以使用actionChannel函数来创建一个action的缓存队列，但一个action的任务流程处理完成后，才可以执行下一个任务流。

代码参考：

对比reduce函数来处理异步的请求,按顺序处理

对比reduce函数来处理异步的请求,按顺序处理

```jsx
import { take, actionChannel, call, ... } from 'redux-saga/effects'
function* watchRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }
　　eventChannel
```

## 10.race

有时候当我们并行的发起多个异步操作时，我们并不一定需要等待所有操作完成，而只需要有一个操作完成就可以继续执行流。这就是race借口的用处。他可以并行的启动多个异步请求，只要有一个 请求返回（resolved或者reject），race操作接受正常返回的请求，并且将剩余的请求取消。



```jsx
import { race, take, put } from 'redux-saga/effects'
function* backgroundTask() {
  while (true) { ... }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```







redux-saga是管理redux异步操作的中间件，redux-saga通过创建sagas将所有异步操作逻辑
收集在一个地方集中处理。

sagas采用Generator函数来yield Effects。Generator函数可以暂停执行，再次执行的时候
从上次暂停的地方继续执行。常见的effect有：fork，call，take，put，cancel
由于使用了generator函数，redux-saga让你可以用 同步的方式来写异步代码
redux-saga启动的任务可以在任何时候通过手动来取消，也可以把任务和其他的Effects放到race方法里以自动取消

# **1. sagas的3种类型**

## 1. root saga

立即启动的所有sagas的唯一入口

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(appReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

## 2. watcher saga

监听被dispatch的actions，当接收到action或者知道其被触发时，调用worker saga执行任务

## 3. worker saga

执行具体的逻辑处理，如进行异步请求，处理返回结果等

# **2.redux-saga的执行流程**

整个流程：ui组件触发action创建函数 ---> action创建函数返回一个action ------> action被传入redux中间件(被 saga等中间件处理) ，产生新的action，传入reducer-------> reducer把数据传给ui组件显示 -----> mapStateToProps ------> ui组件显示

 # **3.常见effect的用法**

### 1. call 异步阻塞调用
### 2. fork 异步非阻塞调用，无阻塞的执行fn，执行fn时，不会暂停Generator
### 3. put 相当于dispatch，分发一个action
### 4. select 相当于getState，用于获取store中相应部分的state
### 5. take 监听action，暂停Generator，匹配的action被发起时，恢复执行。take结合fork，可以实现takeEvery和takeLatest的效果
### 6. takeEvery 监听action，每监听到一个action，就执行一次操作
### 7. takeLatest 监听action，监听到多个action，只执行最近的一次
### 8. cancel 指示 middleware 取消之前的 fork 任务，cancel 是一个无阻塞 Effect。也就是说，Generator 将在取消异常被抛出后立即恢复
### 9. race 竞速执行多个任务
### 10. throttle 节流





## 差两个API  一个cancel

一个select







## 并发执行

```javascript
// 正确写法, effects 将会同步执行
const [users, repos] = yield [
  call(fetch, '/users'),
  call(fetch, '/repos')
]
```

当我们需要 `yield` 一个包含 effects 的数组， generator 会被阻塞直到所有的 effects 都执行完毕，或者当一个 effect 被拒绝 （就像 `Promise.all` 的行为）。