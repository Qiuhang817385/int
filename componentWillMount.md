里面是可以调用setState的

但是缺点就是,由于fiber架构的原因

ComponentWillMount不进行ajax请求原因
ComponentWillMount设置setState是有效的，也不会阻塞组件渲染

## Fiber原因
1、React16之后采用了Fiber架构，只有componentDidMount声明周期函数是确定被执行一次的，ComponentWillMount的生命周期钩子都有可能执行多次
所以不加以在这些生命周期中做有副作用的操作，比如请求数据之类

2、服务端渲染，ComponentWillMount会执行两次

>  componentWillMount，componentWillReceiveProps，shouldComponentUpdate，componentWillUpdate都可能执行多次


## setState理解
ComponentWillMount里面setState会生效
不存在，ajax请求数据在组件挂载之前回来导致setState无效情况

因为，setState 是将更新的状态放进了组件的__pendingStateQueue队列中
react并不会立即响应更新，会等到组件挂载完成后，再统一更新脏组件，见下图


constructor里面有好处的，请求不用等到组件树挂载就发出了，如果放在挂载后请求，万一某个组件树渲染耗时较多，那等于过了好久才发出请求


所以ajax是可以放在ComponentWillMount和constructor里面，区别于componentDidMount，只有两个原因：
#### 1 发送请求的时间不一样
#### 2 关于Fiber中期执行次数不一样

## 废弃componentWillUpdate原因
### 1:
可以通过props改变触发回调
但是fiber以后出了componentDidUpdate componentDidMount只会调用一次
componentWillUpdate会被调用多次，这样回调函数也会调用多次不合理

### 2:
Fiber中render可以被打断，componentWillUpdatekennel获取到的DOM和实际需要的不一样

 getSnapshotBeforeUpdate会在最终确定的render执行之前执行，也就是能保证其获取到的元素状态与didUpdate中获取到的元素状态相同



## 废弃componentWillReceiveProps

```js
componentWillReceiveProps(nextProps){
    if(nextProps !== this.props){
        this.setState({
            age: 1
        })
    }
}
```



缺点：
1 破坏state数据单一来源，组件不可测
2 可以setState，增加组件重绘制，甚至无限重绘（判断失效，不断setState)

