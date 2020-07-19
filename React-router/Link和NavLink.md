Link
现在，我们应用需要在各个页面间切换，如果使用锚点元素实现，在每次点击时，页面被重新加载，React Router提供了<Link>组件用来避免这种状况发生。当 你点击<Link>时，url会更新，组件会被重新渲染，但是页面不会重新加载

嗯、先看个例子

```js
// to为string
<Link to="/about">关于</Link>

// to为obj
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>

// replace 
<Link to="/courses" replace />
<Link>使用to参数来描述需要定位的页面。它的值既可是字符串，也可以是location对象（包含pathname、search、hash、与state属性）如果其值为字符串，将会被转换为location对象

replace(bool)：为 true 时，点击链接后将使用新地址替换掉访问历史记录里面的原地址；为 false 时，点击链接后将在原有访问历史记录的基础上添加一个新的纪录。默认为 false；
```



点击Link后，路由系统发生了什么？

Link 组件最终会渲染为 HTML 标签 <a>，它的 to、query、hash 属性会被组合在一起并渲染为 href 属性。虽然 Link 被渲染为超链接，但在内部实现上使用脚本拦截了浏览器的默认行为，然后调用了history.pushState 方法（注意，文中出现的 history 指的是通过 history 包里面的 create*History 方法创建的对象，window.history 则指定浏览器原生的 history 对象，由于有些 API 相同，不要弄混）。history 包中底层的 pushState 方法支持传入两个参数 state 和 path，在函数体内有将这两个参数传输到 createLocation 方法中，返回 location 的结构如下：

```js
location = {
  pathname, // 当前路径，即 Link 中的 to 属性
  search, // search
  hash, // hash
  state, // state 对象
  action, // location 类型，在点击 Link 时为 PUSH，浏览器前进后退时为 POP，调用 replaceState 方法时为 REPLACE
  key, // 用于操作 sessionStorage 存取 state 对象
};
```

系统会将上述 location 对象作为参数传入到 TransitionTo 方法中，然后调用 window.location.hash 或者window.history.pushState() 修改了应用的 URL，这取决于你创建 history 对象的方式。同时会触发history.listen 中注册的事件监听器。
NavLink
<NavLink>是<Link>的一个特定版本，会在匹配上当前的url的时候给已经渲染的元素添加参数，组件的属性有

activeClassName(string)：设置选中样式，默认值为active
activeStyle(object)：当元素被选中时，为此元素添加样式
exact(bool)：为true时，只有当导致和完全匹配class和style才会应用
strict(bool)：为true时，在确定为位置是否与当前URL匹配时，将考虑位置pathname后的斜线
isActive(func)判断链接是否激活的额外逻辑的功能
嗯、看例子就懂了

```js
// activeClassName选中时样式为selected
<NavLink
  to="/faq"
  activeClassName="selected"

>FAQs</NavLink>

// 选中时样式为activeStyle的样式设置
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}

>FAQs</NavLink>

// 当event id为奇数的时候，激活链接
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}>Event 123</NavLink>
```

