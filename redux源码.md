https://segmentfault.com/a/1190000016460366

![图片描述](https://segmentfault.com/img/bVbg72D?w=548&h=494)



## 第一个actionType

单纯的暴露了两个类型

## 第二个 isPlainObject

判断是否是一个简单对象

> 简单对象:直接实例或者New Object创建的对象

所谓的简单对象就是该对象的__proto__等于Object.prototype



## 第三个 不能进行压缩操作index

防止开发环境下面进行压缩



## 第四个	createStore.js

（reducer、preloadedState、enhancer）

三个参数

reducer 纯函数,同步修改store当中的数据



常见的enhancer就是redux-thunk以及redux-saga，一般都会配合applyMiddleware一起使用，而applyMiddleware的作用就是将这些enhancer格式化成符合redux要求的enhancer



isDispatching

作为锁来用，我们redux是一个统一管理状态容器，它要保证数据的一致性，所以同一个时间里，只能做一次数据修改，如果两个action同时触发reducer对同一数据的修改，那么将会带来巨大的灾难。所以变量isDispatching就是为了防止这一点而存在的。

防止同时触发了两个action



## dispatch

函数dispatch在函数体一开始就进行了三次条件判断，分别是以下三个：

判断action是否为简单对象
判断action.type是否存在
判断当前是否有执行其他的reducer操作



## getState

```js
function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }

    return currentState
  }
```



**getState相比较dispatch要简单许多,返回currentState即可，**而这个currentState在每次dispatch得时候都会得到响应的更新。同样是为了保证数据的一致性，当在reducer操作的时候，是不可以读取当前的state值的。说到这里，我想到之前一次的面试经历：

>
>
>面试官：执行createStore函数生成的store,可不可以直接修改它的state？
>
>我：可以。（普罗大众的第一反应）
>
>面试官：你知道redux怎么做到不能修改store的state吗？
>
>我：额......（处于懵逼状态）
>
>面试官：很简单啊！重写store的set方法啊


那会没看过redux的源码，就被他忽悠了！读完redux源码之后，靠！这家伙就是个骗子！自己没读过源码还跟我聊源码，无语了！当然，我自己也有原因，学艺不精，被忽悠了。我们这里看了源码之后，getState函数返回state的时候，并没有对currentState做一层拷贝再给我们，所以是可以直接修改的。只是这么修改的话，就不会通知订阅者做数据更新。得出的结论是：

**store通过getState得出的state是可以直接被更改的，但是redux不允许这么做，因为这样不会通知订阅者更新数据。**



## subscribe

在注册订阅者之前，做了两个条件判断：

判断监听者是否为函数
是否有reducer正在进行数据修改（保证数据的一致性）

函数unsubscribe执行时，也会执行两个条件判断：

是否已经取消订阅（已取消的不必执行）
是否有reducer正在进行数据修改（保证数据的一致性）

## replaceReducer

这个函数是用来替换reducer的，平时项目里基本很难用到，replaceReducer函数执行前会做一个条件判断：

判断所传reducer是否为函数



## combineReducers.js
这个js对应着redux里的combineReducers方法，主要作用就是合并多个reducer。

第一步:浅拷贝reducers

第二步：检测finalReducers里的每个reducer是否都有默认返回值

第三步：返回一个函数，用于代理所有的reducer

## compose.js

这个函数主要作用就是将多个函数连接起来，将一个函数的返回值作为另一个函数的传参进行计算，得出最终的返回值。以烹饪为例，每到料理都是从最初的食材经过一道又一道的工序处理才得到的。compose的用处就可以将这些烹饪工序连接到一起，你只需要提供食材，它会自动帮你经过一道又一道的工序处理，烹饪出这道料理。

```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```



函数reduce接受下面四个参数

total 初始值或者计算得出的返回值
current 当前元素
index 当前元素的下标
array 当前元素所在的数组

## applyMiddleware.js

**用compose整合chain数组**

```js
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

前面我们讲enhancer的时候，提到过这个applyMiddleware，现在我们将二者的格式对比看一下。

// enhancer
 function enhancer(createStore) {
    return (reducer,preloadedState) => {
         //逻辑代码
        .......
    }
 }
//applyMiddleware
function //applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        //逻辑代码
        ....... 
    }
 }
通过二者的对比，我们发现函数applyMiddleware的返回就是一个enhancer，下面我们再看其具体实现逻辑：

通过createStore方法创建出一个store
定一个dispatch，如果在中间件构造过程中调用，抛出错误提示
定义middlewareAPI，有两个方法，一个是getState，另一个是dispatch，将其作为中间件调用的store的桥接
middlewares调用Array.prototype.map进行改造，存放在chain
**用compose整合chain数组，并赋值给dispatch**
将新的dispatch替换原先的store.dispatch
看完整个过程可能小伙伴们还是一头雾水，玄学的很！不过没关系，我们以redux-thunk为例，模拟一下整个过程中，先把redux-thunk的源码贴出来：



    function createThunkMiddleware(extraArgument) {
      return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }
    return next(action);
      };
    }
    
    const thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;
    
    export default thunk;

哈哈哈！看完redux-thunk的源码之后是不是很奔溃，几千star的项目居然就几行代码，顿时三观就毁了有木有？其实源码没有大家想象的那么复杂，不要一听源码就慌。稳住！我们能赢！根据redux-thunk的源码，我们拿到的thunk应该是这样子的：

```js
 const thunk = ({ dispatch, getState })=>{
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        return next(action);
    };
 }  
```



## bindActionCreators.js

这个API要看看



https://segmentfault.com/a/1190000016460366