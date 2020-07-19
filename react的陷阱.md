## 1.pureComponent只适用于传入值类型

如果父组件改变对象当中具体的值,再传入到子组件,那么不会触发重新渲染



原因:pureComponent提供的componentShouldUpdate发现对象本身句柄(地址没有变化)拒绝重新渲染



```js
<button onClick={
    ()=>{
        person.age++;
        this.setState({
            person
        })
    }
}></button>

不会重新渲染
只有props的第一级发生变化,才会重新渲染
```



## 2.传入内敛函数,和传入this.callback

```
如果传入内敛函数,相当于每次传递进入新的句柄,pureComponent那么每次都会更新
解决方式,修改成this的形式,使用箭头函数

<button onClick={() => {// 处理回调 }} > test_button</button>

<button onClick={this.onClick}> test_button </button>
```





## 2.不要直接修改原有状态值

```js
const person = this.state.person;
```



## setState传入null值,不会触发渲染

```jsx
mocktail是要传递给子组件的值
这种方式,是在父组件的层次对性能进行优化
而不是子组件的生命周期的方式

updateMocktail = mocktail => {
  const newMocktail = mocktail;  
  this.setState(state => {
    if (state.mocktail === newMocktail) {
      return null;
    } else {
      return { mocktail };
    }  
  })  
}
```