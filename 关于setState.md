# setState异步、同步与进阶

### 如何使用setState	当调用setState时，它并不会立即改变，而是会把要修改的状态放入一个任务队列，等到事件循环结束时在合并更新。

在 React 日常的使用中，一个很重要的点就是，不要直接去修改 state。例如：`this.state.count = 1`是无法触发 React 去更新视图的。因为React的机制规定，一个state的更新，首先需要调用 setState 方法。

这样便能触发重新渲染。稍有经验的开发者会知道，setState 方法其实是 “异步” 的。即立马执行之后，是无法直接获取到最新的 state 的，需要经过 React 对 state 的所有改变进行合并处理之后，才会去计算新的虚拟dom，再根据最新的虚拟dom去重新渲染真实dom。

那怎么才能获取到修改后的state呢？React为我们提供了一个回调去实现。

```
...
this.setState({count: this.state.count + 1}, ()=>{
    console.log(this.state.count) // 1
})
...
```

回调里的 state 便是最新的了，原因是**该回调的执行时机在于state合并处理之后**。如果我们这样去做：

```
...
	this.setState({count: this.state.count + 1})
	this.setState({count: this.state.count + 1})
...
```

实际最终的 count 会等于 1，原因是执行时得到的 `this.state.count = 0`。那怎么实现结果为 2 呢？

```
...
this.setState(prevState => {count: prevState.count + 1});
this.setState(prevState => {count: prevState.count + 1});
...
复制代码
```

`setState()`实际上可以接受一个函数作为参数，函数的首个参数就是上一次的state。

以上介绍了`setState`的三种使用方式，下面我们来看看它们的执行时机是怎样的：

**这里需要好好理解**

执行的顺序是

* ({})
* (函数，函数形式的2)
* (对象，函数)
* 函数形式的2

```
...
	this.setState({ count: this.state.count + 1 });
    console.log("console: " + this.state.count); // 0
    this.setState({ count: this.state.count + 1 }, () => {
      console.log("console from callback: " + this.state.count); // 2
    });
    this.setState(prevState => {
      console.log("console from func: " + prevState.count); // 1
      return {
        count: prevState.count + 1
      };
    }, ()=>{
      console.log('last console: '+ this.state.count)
    });
...
复制代码



import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 0
  }
  handleClick = () => {

    this.setState({ count: this.state.count + 1 });
    console.log('this.state.count', this.state.count) //还是0

    this.setState({ count: this.state.count + 1 }, () => {
      // 这个this.state.count还是1
      console.log("console from callback: " + this.state.count); // 2
    });

    this.setState(prevState => {
      console.log('prevState', prevState) /* 这里拿到的就是最新的1了，相当于第二个参数 */
      return {
        count: prevState.count + 1
      };
    });
  }

  render () {
    const { count } = this.state;
    return (
      <div>
        {count}
        <button onClick={this.handleClick}>点击+1</button>
      </div>
    )
  }
}


```

执行结果：

```
console: 0 
console from func: 1 
console from callback: 2
last console: 2 
复制代码
```

React 其实会维护着一个 state 的更新队列，每次调用 setState 都会先把当前修改的 state 推进这个队列，在最后，React 会对这个队列进行合并处理，然后去执行回调。根据最终的合并结果再去走下面的流程（更新虚拟dom，触发渲染）。





### setState为什么要设计成异步的

因为`setState()`之后无法立马获取最新的 state，给人的感觉便是异步去设置状态。也确实是有异步的感觉（实 际原理后面讲诉）。那么为什么 React 要把状态的更新设计成这种方式呢？直接 `this.state.count = 1`不好吗？

有兴趣的可以点击看看：[github.com/facebook/re…](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

这边简单总结下：

- 保证内部的一致性：即使`state`是同步更新，`props`也不是。（你只有在父组件重新渲染时才能知道`props`）
- 将`state`的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实dom，那么它将带来巨大的性能消耗。





下面是dan给出的两个理由：
1.保证内部（数据）统一
首先，我们假定setState是同步的那么：

```js
console.log(this.state.value) // 0
this.setState({ value: this.state.value + 1 });
console.log(this.state.value) // 1
this.setState({ value: this.state.value + 1 });
console.log(this.state.value) // 2
```

这种只用到了state的情况下，同步setState是可以的。

但是如果有props参与到了传值，那么同步setState模式就会有问题,比如我们把
state提升到了父组件，利用props将值传导子组件：

```js
console.log(this.props.value) // 0
this.props.onIncrement();
console.log(this.props.value) // 0
this.props.onIncrement();
console.log(this.props.value) // 0
```

导致这样的结果主要原因是：**当setState同步改变父节点state的时候，父节点传递给子节点的props是不能同步刷新的**，原因是上面提到的背景：setState时同步re-render是很差的机制，这一点已经成为了共识，**无法同步re-render就无法同步刷新this.props这就导致了子节点props数据，和父节点state值不一致**，这就破坏了保证内部数据统一。

2.setState异步更新状态使得并发更新组件成为可能
首先我们在这里讨论是否同步刷新state有一个前提那就是我们默认更新节点是遵循特定的顺序的。但是按默认顺序更新组件在以后的react中可能就变了。

在以后的react的更新机制中，我们可能加入setState优先级这一概念。

举个例子：比如你现在正在打字，那么TextBox组件需要实时的刷新。但是当你在输入的时候，来了一个信息，这个时候，可能让信息延后刷新可能更符合交互。

异步rendering不仅仅是性能上的优化，而且这可能是react组件模型在发生的根本性的改变。

当然这个理由，可能是react发展的一个方向，目前还没有实现。





**为了将数据的更新延迟到最后的批量合并**

或者说是为了最后批量的更新数据

### setState真的是异步吗

我们先来看一段代码，执行前建议大家先预估下结果：

[demo请点击](https://codesandbox.io/s/k2jwvz03m3?expanddevtools=1)

```
class App extends Component {
  state = {
    count: 0
  };

  componentDidMount() {
    // 生命周期中调用			不可以最新值
    this.setState({ count: this.state.count + 1 });
    	console.log("lifecycle: " + this.state.count);	//1
    setTimeout(() => {
      // setTimeout中调用		可以最新值
      this.setState({ count: this.state.count + 1 });
      	console.log("setTimeout: " + this.state.count); //2
    }, 0);
    document.getElementById("div2").addEventListener("click", this.increment2);
  }

  increment = () => {
    // 合成事件中调用		不可以最新值
    this.setState({ count: this.state.count + 1 });
    console.log("react event: " + this.state.count);	//3
  };

  increment2 = () => {
    // 原生事件中调用		可以最新值
    this.setState({ count: this.state.count + 1 });
    console.log("dom event: " + this.state.count);		//4
  };

  render() {
    return (
      <div className="App">
        <h2>couont: {this.state.count}</h2>
        <div id="div1" onClick={this.increment}>
          click me and count+1
        </div>
        <div id="div2">click me and count+1</div>
      </div>
    );
  }
}
```

探讨前，我们先简单了解下react的事件机制：react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在`jsx`中常见的`onClick`、`onChange`这些都是合成事件。

那么以上4种方式调用`setState()`，后面紧接着去取最新的state，按之前讲的异步原理，应该是取不到的。然而，`setTimeout`中调用以及原生事件中调用的话，是可以立马获取到最新的state的。根本原因在于，setState并不是真正意义上的异步操作，它只是模拟了异步的行为。React中会去维护一个标识（`isBatchingUpdates`），判断是直接更新还是先暂存state进队列。`setTimeout`以及原生事件都会直接去更新state，因此可以立即得到最新state。而合成事件和React生命周期函数中，是受React控制的，其会将`isBatchingUpdates`设置为 `true`，从而走的是类似异步的那一套。



### 总结

此处总结是直接引用了：[juejin.im/post/5b45c5…](https://juejin.im/post/5b45c57c51882519790c7441#heading-7)

1. `setState` 只在合成事件和钩子函数中是“异步”的，在原生事件和 `setTimeout` 中都是同步的。
2. `setState`的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，
3. 当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
4. `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 `setState` ， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。

## 自己总结

当调用setState时，它并不会立即改变，而是会把要修改的状态放入一个任务队列，等到事件循环结束时，再合并指更新。

-->异步+批量更新

1.批量可以提高性能,减少真实dom操作次数

2.props不会同步



setState是一个异步方法.由队列实现.

它有Batch模式(批量更新模式),和普通模式.

普通模式下,setState能够即时更新state.

Batch模式下,setState会将队列中的state进行合并,然后就会出各种状况.

setTimeout就是一个强制使用普通模式的方法.



原生事件：setTimeOut(),click 事件监听

**setTimeout，setInterval，Promise等异步操作中，state会同步更新**



此处总结是直接引用了：[juejin.im/post/5b45c5…](https://juejin.im/post/5b45c57c51882519790c7441#heading-7)

1. `setState` 只在合成事件和钩子函数中是“异步”的，在原生事件和 `setTimeout` 中都是同步的。
2. `setState`的“异步”并不是说内部由异步代码实现，
3. 其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，
4. 导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
5. `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 `setState` ， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。



```js
setState只在合成事件比如onClick和生命周期钩子函数当中是异步的
原生add eventListener当中是异步的
本身是同步的，但是由于合成事件和钩子函数的执行顺序，才看起来是异步的
在React内部机制能检测到的地方， setState就是异步的；在React检测不到的地方，例如setInterval,setTimeout里，setState就是同步更新的。
在React内部机制能检测到的地方， setState就是异步的；在React检测不到的地方，例如setInterval,setTimeout里，setState就是同步更新的。
在React内部机制能检测到的地方， setState就是异步的；在React检测不到的地方，例如setInterval,setTimeout里，setState就是同步更新的。
在React内部机制能检测到的地方， setState就是异步的；在React检测不到的地方，例如setInterval,setTimeout里，setState就是同步更新的。
在React内部机制能检测到的地方， setState就是异步的；在React检测不到的地方，例如setInterval,setTimeout里，setState就是同步更新的。
原生事件不通过合成事件处理,也就不进入更新事务的流程
批量更新也是建立在异步之上
```

## SetState传递函数

```js
state = {
    count: 0
  }
  handleClick = () => {
    this.setState((prevState) => {
      console.log('prevState', prevState)
        //0
      return {
        count: prevState.count + 1
      }
    }, () => {
      console.log('state', this.state);
        //1
    })
  }

```

## 源码----------------------------------------



![image-20200627101229468](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200627101229468.png)

这一段是获取最新的state,然后下一张图是完全的,代表着把所有的pendingState里面的数据进行合并

![image-20200627102547743](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200627102547743.png)

![image-20200627102654088](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200627102654088.png)

如果是数组,那么直接替换之前的state

如果是回调函数,那么立即执行回调函数

否则的话,多个state进行批量的合并

为什么进行了合并?什么时候进行了合并



由于是根据这个数组进行操作的,所以  最后一次的state会覆盖掉之前的所有的state

```js
this.setState([{counter:100,msg:'omg'}])		会直接覆盖掉之前的
```

## 源码-------------------------------------

顺序:

```js
component里面的方法:
updateQueue,更新队列
updater
shouldUpdate

初始化:
定义一个更新器,把当前实例传递进入
constructor(props,context){
    this.$updater = new Updater(this)
    
    
}

class Updater{
    constructor(){
        this.instance = instance;
        this.pendingStates = [];
        this.pendingCallbacks = [];
        this.isPending = false;
        this.nextProps = this.nextConext = null;
        this.clearCallback = this.clearCallBacks.bind(this);
    }
     //如果是state
    addState(nextState){
       	if(nextState){
            this.pendingStates.push(nextState);
            if(!this.isPending){
                this.emitUpdate
            }
        }
    }
    如果正在批量更新,那么做的操作就是不断向队列里面添加任务
    
    一般改变state，都是从setState开始，这个函数被调用之后，会将我们传入的state放进pendingState的数组里存起来，然后判断当前流程是否处于批量更新，如果是，则将当前组件的instance放进dirtyComponent里，当这个更新流程中所有需要更新的组件收集完毕之后（这里面涉及到事务的概念，感兴趣的可以自己去了解一下）就会遍历dirtyComponent这个数组，调用他们的uptateComponent对组件进行更新。当然，如果当前不处于批量更新的状态，会直接去遍历dirtyComponent进行更新。
    
    
     //如果是函数
    addCallback(callback){
        if(_.isFn(callback)){
            this.pendingCallbacks.push(callback);
        }
    }
    //父组件触发的时候回带props和context
    emitUpdate(nextProps,nextConetxt){
        this.nextProps = nextProps;
        this.nextContext = nextConetxt;
        nextProps || !updateQueue.isPending?
            this.updateComponent():
        	updateQueue.add(this)
    }
    //更新组件
    updateComponent(){
        //调用
       shouldUpdate(
           //重点,调用
       	this.getState()
       )
    }
   
    getState(){ //这个时候已经把modal里面的数据更改完成了
        let {instance,pendingStates} = this;
        let {state,props} = instance;
        if(pendingStates.length){
            pendingStates.forEach(nextState=>{
                let isReplace = _.isArr(nextState);
                if(isReplace){
                    //数组直接替换
                    nextState = nextState[0]
                }
                if(_.isFn(nextState)){
                    nextState = nextState.call(instance,state,props);
                }
                if(isReplace){
                    state = {...nextState}
                }else{
                    state = {...state,...nextState}
                }
            })
            pendingStates.length = 0;
        }
        return state;
        //这个时候已经把modal里面的数据更改完成了
    }
}

let shouldUpdate(component,nextProps,nextState,nextContext,callBack){
    let shouldComponentUpdate = true;
    
    
    ..
    ..
    ..
    component.forceUpdate(callback)
}

let forceUpdate(){
    if($updater.isPending){
        $updater.addState(state);
        return
    }
    let node;
    let vnode;
    $updater.isPending = true;
    
    //如果用户写了的话,执行
    if(this.compoenetWillUpdate){
        this.componentWillUpdate(nextProps,nextState,nextContext);
    }
    let newVnode;
    //diff算法
    let newNode = compareTwoVnodes(vnode,newVnode,node,getChildContext(this,parentContext));
    
    if(newNode !==node){
        巴拉巴拉
        异步什么的
    }else{
       
        
    }
    
    //执行didMount
    if(component.componentDisMount){
        this.componentDisMount
    }
    
    if(callback){
        callback.call(this)
    }
    //最后,制成false
    $updater.isPending = false;
    $updater.emitUpdate()
    
}



let updateQueue = {
    
}

1.调用多个this.setState方法

2.setState(nextState,callback){
    //添加异步队列,不是每次都更新 		如果是异步的话,this.state = {...state,...nextState}
    this.$updater.addCallback(callback);
    this.$updater.addState(nextState);
}


3.增加进入队列当中,如果pending 开始更新组件,
    调用shouldUpdate方法
参数有一个比较重要是getState函数,批量合并多个state

4.然后shouldUpdate方法里面  如果可以更新,调用forceUpdate方法

5.forceUpdate进行diff算法,还有一些生命周期函数钩子的执行
最后再调用$updater  进行组件更新
```

## diff算法

![image-20200627112830797](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200627112830797.png)



## 为什么diff算法实现了o(n)

![image-20200627113542242](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200627113542242.png)

因为跨层级组件通信特别少





## fiber

![image-20200627113624231](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200627113624231.png)