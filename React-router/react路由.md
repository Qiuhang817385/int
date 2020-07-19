component的话只可以包裹一个组件,不可以传递一个匿名行内函数



```jsx
 <Router>
    <Route path="/user/:username" component={User} />
  </Router>
```





render的话,修改成匿名行内函数形式

```jsx
<Router>
    <Route path="/home" render={() => <div>Home</div>} />
  </Router>
```



或者高阶组件的形式

```jsx
function FadingRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps => (
        <FadeIn>
          <Component {...routeProps} />
        </FadeIn>
      )}
    />
  );
}

ReactDOM.render(
  <Router>
    <FadingRoute path="/cool" component={Something} />
  </Router>,
```









render是一个函数，语法：render={()=>{return <div></div>}}，只要你的路由匹配了，这个函数才会执行 -children也是一个函数，不管匹配不匹配，这个函数都会执行

```jsx
<Route
  children={({ match, ...rest }) => (
    {/* Animate will always render, so you can use lifecycles
        to animate its child in and out */}
    <Animate>
      {match && <Something {...rest}/>}
    </Animate>
  )}
/>

无论是否匹配,这个动画一直在这里

Animate将始终呈现，因此您可以使用lifecycles

让它的孩子进出动画

一般自带一个match参数
```



component>render>children



**1、React-router与React-router-dom的API对比**

**React-router：**提供了router的核心api。如Router、Route、Switch等，但没有提供有关dom操作进行路由跳转的ap；

**React-router-dom：**提供了BrowserRouter、Route、Link等api，可以通过dom操作触发事件控制路由。

 

 **2、****React-router与React-router-dom的功能对比**

**React-router：**实现了路由的核心功能

**React-router-dom：**基于React-router，加入了一些在浏览器运行下的一些功能，

　　例如：`Link`组件会渲染一个a标签，

　　　　  BrowserRouter使用 HTML5 提供的 history API可以保证你的 UI 界面和 URL 保持同步，

　　　　  HashRouter使用 URL 的 `hash` 部分保证你的 UI 界面和 URL 保持同步

 

 **3、****React-router与React-router-dom的写法对比**

**React-router**不能通过操作dom控制路由，此时还需引入React-router-dom

```
import {Switch, Route, Router} from 'react-router';
import {HashHistory, Link} from 'react-router-dom';
```

**React-router-dom**在React-router的基础上扩展了可操作dom的api

```
import {Swtich, Route, Router, HashHistory, Link} from 'react-router-dom';
```

 

 **4、****React-router与React-router-dom的路由跳转对比**

**React-router：**router4.0以上版本用**this.props.history.push('/path')**实现跳转；

　　　　　　　router3.0以上版本用**this.props.router.push('/path')**实现跳转

**React-router-dom：**直接用**this.props.history.push('/path')**就可以实现跳转

 

**总结：**

　　在使用React的大多数情况下，我们会想要通过操作dom来控制路由，例如点击一个按钮完成跳转，这种时候使用React-router-dom就比较方便。

　　安装也很简单：npm install  react-router-dom --save 

　　从`react-router-dom`中`package.json的`依赖就可以看出：`react-router-dom是`依赖`react-router的`，所以我们使用`npm`安装react-router-dom的时候，不需要npm安装react-router。





路由对象的三个参数

1. history 用来前进和后退或者增加路由选项
2. match 用来获取参数列表
3. location 当前url信息

react-router路由守卫