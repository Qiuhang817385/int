## redux、mobx、concent 状态管理方案对比

`redux`、`mobx`本身是一个独立的状态管理框架，各自有自己的抽象api，以其他UI框架无关（react, vue...），本文主要说的和`react`搭配使用的对比效果，所以下文里提到的`redux`、`mobx`暗含了`react-redux`、`mobx-react`这些让它们能够在`react`中发挥功能的绑定库，而`concent`本身是为了`react`贴身打造的开发框架，数据流管理只是作为其中一项功能，附带的其他增强react开发体验的特性可以按需使用，后期会刨去`concent`里所有与`react`相关联的部分发布`concent-core`，它的定位才是与`redux`、`mobx` 相似的。

所以其实将在本文里登场的选手分别是

### redux & react-redux

- slogan
  JavaScript 状态容器，提供可预测化的状态管理
- 设计理念
  单一数据源，使用纯函数修改状态

![img](https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH461oR5ocCn5cXHiaSnmjmmBsr1wx05ZgNWgbpGCPQbficFjvX7YsxRC0Rw3xbpMoPhhhgzu48JbvbDw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### mobx & mobx-react

- slogan：

```
简单、可扩展的状态管理
```

- 设计理念

```
任何可以从应用程序状态派生的内容都应该派生
```

![img](https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH461oR5ocCn5cXHiaSnmjmmBsahn8pj3v4SlOyLc24icPoXbwnGMV3GmUG3IKQDZicYbQR9z16Zr4nicnA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

介绍完三者的背景，我们的舞台正式交给它们，开始一轮轮角逐，看谁到最后会是你最中意的范儿？

### 结果预览

以下5个较量回合实战演示代码较多，此处将对比结果提前告知，方便粗读看客可以快速了解。

| store配置                         | concent | mbox | redux |
| :-------------------------------- | :------ | :--- | :---- |
| 支持分离                          | Yes     | Yes  | No    |
| 无根Provider & 使用处无需显式导入 | Yes     | No   | No    |
| reducer无`this`                   | Yes     | No   | Yes   |
| store数据或方法无需人工映射到组件 | Yes     | Yes  | No    |

**「redux counter示例」**
**「mobx counter示例」**
**「concent counter示例」**

------

| 状态修改          | concent       | mbox                 | redux |
| :---------------- | :------------ | :------------------- | :---- |
| 基于不可变原则    | Yes           | No                   | Yes   |
| 最短链路          | Yes           | Yes                  | No    |
| ui源头可追踪      | Yes           | No                   | No    |
| 无this            | Yes           | No                   | Yes   |
| 原子拆分&合并提交 | Yes(基于lazy) | Yes(基于transaction) | No    |

------

| 依赖收集           | concent | mbox | redux |
| :----------------- | :------ | :--- | :---- |
| 支持运行时收集依赖 | Yes     | Yes  | No    |
| 精准渲染           | Yes     | Yes  | No    |
| 无this             | Yes     | No   | No    |
| 只需一个api介入    | Yes     | No   | No    |

**「mobx 示例」**
**「concent 示例」**

------

| 衍生数据                   | concent | mbox | redux(reselect) |
| :------------------------- | :------ | :--- | :-------------- |
| 自动维护计算结果之间的依赖 | Yes     | Yes  | No              |
| 触发读取计算结果时收集依赖 | Yes     | Yes  | No              |
| 计算函数无this             | Yes     | No   | Yes             |

**「redux computed示例」**
**「mobx computed示例」**
**「concent computed示例」**

------

todo-mvc实战
**「redux todo-mvc」**
**「mobx todo-mvc」**
**「concent todo-mvc」**

## round 1 - 代码风格初体验

counter作为demo界的靓仔被无数次推上舞台，这一次我们依然不例外，来个counter体验3个框架的开发套路是怎样的，以下3个版本都使用`create-react-app`创建，并以**「多模块的方式」**来组织代码，力求接近真实环境的代码场景。

### redux(action、reducer)

通过`models`把按模块把功能拆到不同的reducer里，目录结构如下

```
|____models             # business models
| |____index.js         # 暴露store
| |____counter          # counter模块相关的action、reducer
| | |____action.js
| | |____reducer.js
| |____ ...             # 其他模块
|____CounterCls         # 类组件
|____CounterFn          # 函数组件
|____index.js           # 应用入口文件
```

> 此处仅与redux的原始模板组织代码，实际情况可能不少开发者选择了`rematch`，`dva`等基于redux做二次封装并改进写法的框架，但是并不妨碍我们理解counter实例。

构造counter的`action`

```
// code in models/counter/action
export const INCREMENT = "INCREMENT";

export const DECREMENT = "DECREMENT";

export const increase = number => {
  return { type: INCREMENT, payload: number };
};

export const decrease = number => {
  return {  type: DECREMENT, payload: number };
};
```

构造counter的`reducer`

```
// code in models/counter/reducer
import { INCREMENT, DECREMENT } from "./action";

export default (state = { count: 0 }, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, count: state.count + payload };
    case DECREMENT:
      return { ...state, count: state.count - payload };
    default:
      return state;
  }
};
```

合并`reducer`构造`store`，并注入到根组件

```
mport { createStore, combineReducers } from "redux";
import  countReducer  from "./models/counter/reducer";

const store = createStore(combineReducers({counter:countReducer}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

使用connect连接ui与`store`

```
import React from "react";
import { connect } from "react-redux";
import { increase, decrease } from "./redux/action";

@connect(
  state => ({ count: state.counter.count }),// mapStateToProps
  dispatch => ({// mapDispatchToProps
    increase: () => dispatch(increase(1)),
    decrease: () => dispatch(decrease(1))
  }),
)
class Counter extends React.Component {
  render() {
    const { count, increase, decrease } = this.props;
    return (
      <div>
        <h1>Count : {count}</h1>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>decrease</button>
      </div>
    );
  }
}

export default Counter;
```

上面的示例书写了一个类组件，而针对现在火热的`hook`，`redux v7`也发布了相应的api`useSelector`、`useDispatch`

```
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as counterAction from "models/counter/action";

const Counter = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  const increase = () => dispatch(counterAction.increase(1));
  const decrease = () => dispatch(counterAction.decrease(1));

  return (
    <>
      <h1>Fn Count : {count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>decrease</button>
    </>
  );
};

export default Counter;
```

渲染这两个counter，**「查看redux示例」**

```
function App() {
  return (
      <div className="App">
        <CounterCls/>
        <CounterFn/>
      </div>
  );
}
```

### mobx(store, inject)

当应用存在多个store时(这里我们可以把一个store理解成redux里的一个reducer块，聚合了数据、衍生数据、修改行为)，mobx的store获取方式有多种，例如在需要用的地方直接引入放到成员变量上

```
import someStore from 'models/foo';// 是一个已经实例化的store实例

@observer
class Comp extends React.Component{
    foo = someStore;
    render(){
        this.foo.callFn();//调方法
        const text = this.foo.text;//取数据
    }
}
```

我们此处则按照公认的最佳实践来做，即把所有store合成一个根store挂到Provider上，并将Provider包裹整个应用根组件，在使用的地方标记`inject`装饰器即可，我们的目录结构最终如下，和`redux`版本并无区别

```
|____models             # business models
| |____index.js         # 暴露store
| |____counter          # counter模块相关的store
| | |____store.js
| |____ ...             # 其他模块
|____CounterCls         # 类组件
|____CounterFn          # 函数组件
|____index.js           # 应用入口文件
```

构造counter的`store`

```
import { observable, action, computed } from "mobx";

class CounterStore {
  @observable
  count = 0;

  @action.bound
  increment() {
    this.count++;
  }

  @action.bound
  decrement() {
    this.count--;
  }
}

export default new CounterStore();
```

合并所有`store`为`根store`，并注入到根组件

```
// code in models/index.js
import counter from './counter';
import login from './login';

export default {
  counter,
  login,
}

// code in index.js
import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import store from "./models";
import CounterCls from "./CounterCls";
import CounterFn from "./CounterFn";

render(    
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById("root")
);
```

创建一个类组件

```
import React, { Component } from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class CounterCls extends Component {
  render() {
    const counter = this.props.store.counter;
    return (
      <div>
        <div> class Counter {counter.count}</div>
        <button onClick={counter.increment}>+</button>
        <button onClick={counter.decrement}>-</button>
      </div>
    );
  }
}

export default CounterCls;
```

创建一个函数组件

```
import React from "react";
import { useObserver, observer } from "mobx-react";
import store from "./models";

const CounterFn = () => {
  const { counter } = store;
  return useObserver(() => (
      <div>
        <div> class Counter {counter.count}</div>
        <button onClick={counter.increment}>++</button>
        <button onClick={counter.decrement}>--</button>
      </div>
  ));
};

export default CounterFn;
```

渲染这两个counter，**「查看mobx示例」**

```
function App() {
  return (
      <div className="App">
        <CounterCls/>
        <CounterFn/>
      </div>
  );
}
```

### 回顾与总结

此回合里展示了3个框架对定义多模块状态时，不同的代码组织与结构

- `redux`通过`combineReducers`配合`Provider`包裹根组件，同时还收手写`mapStateToProps`和`mapActionToProps`来辅助组件获取store的数据和方法
- `mobx`通过合并多个`subStore`到一个`store`对象并配合`Provider`包裹根组件，store的数据和方法可直接获取
- `concent`通过`run`接口集中配置或者`configure`接口分离式的配置，store的数据和方法可直接获取

| store配置                         | concent | mbox | redux |
| :-------------------------------- | :------ | :--- | :---- |
| 支持分离                          | Yes     | Yes  | No    |
| 无根Provider & 使用处无需显式导入 | Yes     | No   | No    |
| reducer无`this`                   | Yes     | No   | Yes   |
| store数据或方法无需人工映射到组件 | Yes     | Yes  | No    |

## round 2 - 状态修改

3个框架对状态的修改风格差异较大。`redux`里严格限制状态修改途径，所以的修改状态行为都必须派发`action`，然后命中相应`reducer`合成新的状态。

`mobx`具有响应式的能力，直接修改即可，但因此也带来了数据修改途径不可追溯的烦恼从而产生了`mobx-state-tree`来配套约束修改数据行为。

`concent`的修改完完全全遵循`react`的修改入口`setState`风格，在此基础之上进而封装`dispatch`、`invoke`、`sync`系列api，且无论是调用哪一种api，都能够不只是追溯数据修改完整链路，还包括触发数据修改的源头。

### redux(dispatch)

同步的action

```
export const changeFirstName = firstName => {
  return {
    type: CHANGE_FIRST_NAME,
    payload: firstName
  };
};
```

异步的action，借助`redux-thunk`来完成

```
// code in models/index.js, 配置thunk中间件
import  thunk  from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
const store = createStore(combineReducers({...}), applyMiddleware(thunk));

// code in models/login/action.js
export const CHANGE_FIRST_NAME = "CHANGE_FIRST_NAME";

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));
// 工具函数，辅助写异步action
const asyncAction = asyncFn => {
  return dispatch => {
    asyncFn(dispatch).then(ret => {
      if(ret){
        const [type, payload] = ret;
        dispatch({ type, payload });
      }
    }).catch(err=>alert(err));
  };
};

export const asyncChangeFirstName = firstName => {
  return asyncAction(async (dispatch) => {//可用于中间过程多次dispatch
    await delay();
    return [CHANGE_FIRST_NAME, firstName];
  });
};
```

### mobx版本(this.XXX)

同步action与异步action

```
import { observable, action, computed } from "mobx";

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

class LoginStore {
  @observable firstName = "";

  @observable lastName = "";

  @action.bound
  changeFirstName(firstName) {
    this.firstName = firstName;
  }

  @action.bound
  async asyncChangeFirstName(firstName) {
    await delay();
    this.firstName = firstName;
  }

  @action.bound
  changeLastName(lastName) {
    this.lastName = lastName;
  }
}

export default new LoginStore();
```

直接修改

```
const LoginFn = () => {
  const { login } = store;
  const changeFirstName = e => login.firstName = e.target.value;
  // ...    
}
```

通过action修改

```
const LoginFn = () => {
  const { login } = store;
  const const changeFirstName = e => login.changeFirstName(e.target.value);
  // ...    
}
```

### 回顾与总结

这一个回合我们针对数据修改方式做了全面对比，从而让开发者了解到从`concent`的角度来说，为了开发者的编码体验做出的各方面巨大努力。

针对状态更新方式, 对比`redux`，当我们的所有动作流程压到最短，无action-->reducer这样一条链路，无所谓的存函数还是副作用函数的区分(`rematch`、`dva`等提取的概念)，把这些概念交给`js`语法本身，会显得更加方便和清晰，你需要纯函数，就写`export function`，需要副作用函数就写`export async function`。

对比`mobx`，一切都是可以任何拆开任意组合的基础函数，没有`this`，彻底得面向FP，给一个`input`预期`output`，这样的方式对测试容器也更加友好。

| 状态修改          | concent       | mbox                 | redux |
| :---------------- | :------------ | :------------------- | :---- |
| 基于不可变原则    | Yes           | No                   | Yes   |
| 最短链路          | Yes           | Yes                  | No    |
| ui源头可追踪      | Yes           | No                   | No    |
| 无this            | Yes           | No                   | Yes   |
| 原子拆分&合并提交 | Yes(基于lazy) | Yes(基于transaction) | No    |

## round 3 - 依赖收集

这个回合是非常重量级的一个环节，依赖收集让ui渲染可以保持最小范围更新，即精确更新，所以`vue`某些测试方面会胜出`react`，当我们为`react`插上依赖收集的翅膀后，看看会有什么更有趣的事情发生吧。

再开始聊`依赖收集`之前，我们复盘一下`react`原本的渲染机制吧，当某一个组件发生状态改变时，如果它的自定义组件没有人工维护`shouldcomponent`判断时，总是会从上往下全部渲染一遍，而`redux`的`cconnect`接口接管了`shouldcomponent`行为，当一个action触发了动作修改时，所有connect过的组件都会将上一刻`mapStateToProps`得到的状态和当前最新`mapStateToProps`得到的状态做浅比较，从而决定是否要刷新包裹的子组件。

到了hook时代，提供了`React.memo`来用户阻断这种"株连式"的更新，但是需要用户尽量传递`primitive`类型数据或者不变化的引用给`props`，否则`React.memo`的浅比较会返回false。

但是`redux`存在的一个问题是，如果视图里某一刻已经不再使用某个状态了，它不该被渲染却被渲染了，`mobx`携带得基于运行时获取到ui对数据的最小订阅子集理念优雅的解决了这个问题，但是`concent`更近一步将依赖收集行为隐藏的更优雅，用户不需要不知道`observable`等相关术语和概念，某一次渲染你取值有了点这个值的依赖，而下一次渲染没有了对某个`stateKey`的取值行为就应该移出依赖，这一点`vue`做得很好，为了让`react`拥有更优雅、更全面的依赖收集机制，`concent`同样做出了很多努力。

### redux版本(不支持)

解决依赖收集不是`redux`诞生的初衷，这里我们只能默默的将它请到候选区，参与下一轮的较量了。

### mobx版本(computed,useObserver)

利用装饰器或者`decorate`函数标记要观察的属性或者计算的属性

```
import { observable, action, computed } from "mobx";

const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

class LoginStore {
  @observable firstName = "";

  @observable lastName = "";

  @computed
  get fullName(){
    return `${this.firstName}_${this.lastName}`
  }

  @computed
  get nickName(){
    return `${this.firstName}>>nicknick`
  }

  @computed
  get anotherNickName(){
    return `${this.nickName}_another`
  }
}

export default new LoginStore();
```

ui里使用了观察状态或者结算结果时，就产生了依赖

- 仅对计算结果有依赖，类组件写法

```
@inject("store")
@observer
class LoginCls extends Component {
  state = {show:true};
  toggle = ()=> this.setState({show:!this.state.show})
  render() {
    const login = this.props.store.login;
    return (
      <>
        <h1>Cls Small Comp</h1>
        <button onClick={this.toggle}>toggle</button>
        {this.state.show ? <div> fullName:{login.fullName}</div>: ""}
      </>
    )
  }
}
```

- 仅对计算结果有依赖，函数组件写法

```
import { useObserver } from "mobx-react";

// show为true时，当前组件读取了fullName，
// fullName由firstName和lastName计算而出
// 所以他的依赖是firstName、lastName
// 当show为false时，当前组件无任何依赖
export const LoginFnSmall = React.memo((props) => {
  const [show, setShow] = React.useState(true);
  const toggle = () => setShow(!show);
  const { login } = store;

  return useObserver(() => {
    return (
      <>
        <h1>Fn Small Comp</h1>
        <button onClick={toggle}>toggle</button>
        {show ? <div> fullName:{login.fullName}</div>: ""}
      </>
    )
  });
});
```

对状态有依赖和对计算结果有依赖无任何区别，都是在运行时从`this.props.login`上获取相关结果就产生了ui对数据的依赖关系。

**「查看mobx示例」**

### 回顾与总结

在依赖收集这一个回合，`concent`的依赖收集形式、和组件表达形式，和`mobx`区别都非常大，整个依赖收集过程没有任何其他多余的api介入, 而`mbox`需用`computed`修饰getter字段，在函数组件需要使用`useObserver`包状态返回UI，`concent`更注重一切皆函数，在组织计算代码的过程中消除的`this`这个关键字，利用`fnCtx`函数上下文传递已计算结果，同时显式的区分`state`和`computed`的盛放容器对象。

| 依赖收集           | concent | mbox | redux |
| :----------------- | :------ | :--- | :---- |
| 支持运行时收集依赖 | Yes     | Yes  | No    |
| 精准渲染           | Yes     | Yes  | No    |
| 无this             | Yes     | No   | No    |
| 只需一个api介入    | Yes     | No   | No    |

## round 4 - 衍生数据

还记得`mobx`的口号吗？任何可以从应用程序状态派生的内容都应该派生，揭示了一个的的确确存在且我们无法逃避的问题，大多数应用状态传递给ui使用前都会伴随着一个计算过程，其计算结果我们称之为衍生数据。

我们都知道在`vue`里已内置了这个概念，暴露了一个可选项`computed`用于处理计算过程并缓存衍生数据，`react`并无此概念，`redux`也并不提供此能力，但是`redux`开放的中间件机制让社区得以找到切入点支持此能力，所以此处我们针对`redux`说到的计算指的已成为事实上的流行标准库`reslect`.

`mobx`和`concent`都自带计算支持，我们在上面的**「依赖收集」**回合里已经演示了`mobx`和`concent`的衍生数据代码，所以此轮仅针对`redux`书写衍生数据示例

### redux(reselect)

redux最新发布`v7`版本，暴露了两个api，`useDispatch`和`useSelector`，用法以之前的`mapStateToState`和`mapDispatchToProps`完全对等，我们的示例里会用类组件和函数组件都演示出来。

定义selector

```
import { createSelector } from "reselect";

// getter，仅用于取值，不参与计算
const getFirstName = state => state.login.firstName;
const getLastName = state => state.login.lastName;

// selector，等同于computed，手动传入计算依赖关系
export const selectFullName = createSelector(
  [getFirstName, getLastName],
  (firstName, lastName) => `${firstName}_${lastName}`
);

export const selectNickName = createSelector(
  [getFirstName],
  (firstName) => `${firstName}>>nicknick`
);

export const selectAnotherNickName = createSelector(
  [selectNickName],
  (nickname) => `${nickname}_another`
);
```

类组件获取selector

```
import React from "react";
import { connect } from "react-redux";
import * as loginAction from "models/login/action";
import {
  selectFullName,
  selectNickName,
  selectAnotherNickName
} from "models/login/selector";

@connect(
  state => ({
    firstName: state.login.firstName,
    lastName: state.login.lastName,
    fullName: selectFullName(state),
    nickName: selectNickName(state),
    anotherNickName: selectAnotherNickName(state),
  }), // mapStateToProps
  dispatch => ({
    // mapDispatchToProps
    changeFirstName: e =>
      dispatch(loginAction.changeFirstName(e.target.value)),
    asyncChangeFirstName: e =>
      dispatch(loginAction.asyncChangeFirstName(e.target.value)),
    changeLastName: e => dispatch(loginAction.changeLastName(e.target.value))
  })
)
class Counter extends React.Component {
  render() {
    const {
      firstName,
      lastName,
      fullName,
      nickName,
      anotherNickName,
      changeFirstName,
      asyncChangeFirstName,
      changeLastName
    } = this.props;
    return 'ui ...'
  }
}

export default Counter;
```

函数组件获取selector

```
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as loginAction from "models/login/action";
import {
  selectFullName,
  selectNickName,
  selectAnotherNickName
} from "models/login/selector";

const Counter = () => {
  const { firstName, lastName } = useSelector(state => state.login);
  const fullName = useSelector(selectFullName);
  const nickName = useSelector(selectNickName);
  const anotherNickName = useSelector(selectAnotherNickName);
  const dispatch = useDispatch();
  const changeFirstName = (e) => dispatch(loginAction.changeFirstName(e.target.value));
  const asyncChangeFirstName = (e) => dispatch(loginAction.asyncChangeFirstName(e.target.value));
  const changeLastName = (e) => dispatch(loginAction.changeLastName(e.target.value));

  return 'ui...'
  );
};

export default Counter;
```

**「redux衍生数据在线示例」**

### mobx(computed装饰器)

见上面依赖收集的实例代码，此处不再重叙。

### 回顾与总结

相比`mobx`可以直接从`this.pops.someStore`获取，`concent`可以直接从`ctx.moduleComputed`上获取，多了一个手动维护计算依赖的过程或映射挑选结果的过程，相信哪种方式是开发者更愿意使用的这个结果已经一目了然了。

| 衍生数据                   | concent | mbox | redux(reselect) |
| :------------------------- | :------ | :--- | :-------------- |
| 自动维护计算结果之间的依赖 | Yes     | Yes  | No              |
| 触发读取计算结果时收集依赖 | Yes     | Yes  | No              |
| 计算函数无this             | Yes     | No   | Yes             |

## round 5 - 实战TodoMvc

上面4个回合结合了一个个鲜活的代码示例，综述了3个框架的特点与编码风格，相信读者期望能有更加接近生产环境的代码示例来看出其差异性吧，那么最后让我们以`TodoMvc`来收尾这次特性大比拼，期待你能够更多的了解并体验`concent`，开启 **「不可变」** & **「依赖收集」** 的react编程之旅吧。

### redux-todo-mvc

**「查看redux-todo-mvc演示」**

action 相关

![img](https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH461oR5ocCn5cXHiaSnmjmmBsT0801oicceCyyddnevnEBiaO61PsPwZDnSDLicRQg98vqU3nFgTUbGvZg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

reducer 相关

![img](https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH461oR5ocCn5cXHiaSnmjmmBsSIoTxTXKbPoMXThyUiat8ueAuUAOW4CCEyibQQ7178e5BJYDKibqzJfibg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

computed 相关

![img](https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH461oR5ocCn5cXHiaSnmjmmBsEs0nLsTicplyrZmKKPT6HK5mOVRKp5HiaJG4wLz17EU1vJWgKVPiadC8Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### mobx-todo-mvc

**「查看mobx-todo-mvc演示」**

action 相关

![img](https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH461oR5ocCn5cXHiaSnmjmmBsEfgLuLgrZribP7Yxd5bmro6rLFskK8LlYNBlCP49pXgsCr73b99BYrg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

computed 相关

![img](https://mmbiz.qpic.cn/mmbiz_png/j3vcKBBdH461oR5ocCn5cXHiaSnmjmmBsbbzyiam5cXFdcgnQSsX9FHoboyiajv3am1WzbAqzyE7Dibjfypw5Uv9cQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)