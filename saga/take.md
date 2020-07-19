# 关于redux-saga中take使用方法详解

 

本篇文章主要介绍了关于redux-saga中take使用方法详解，小编觉得挺不错的，现在分享给大家，也给大家做个参考。一起跟随小编过来看看吧

本文介绍了关于redux-saga中take使用方法详解，分享给大家，具体如下：

带来一个自己研究好久的API使用方法.

redux-saga中effect中take这个API使用方式,用的多的是call,put,select,但take这个平常还真没什么机会用上,也不清楚在哪里使用才好,不管怎么样,既然是redux-saga写出来的,肯定是有他的用法的,不管37 21,先学会使用方法再说.

先看看介绍:

take

take的表现同takeEvery一样，都是监听某个action，但与takeEvery不同的是，他不是每次action触发的时候都相应，而只是在执行顺序执行到take语句时才会相应action。

当在genetator中使用take语句等待action时，generator被阻塞，等待action被分发，然后继续往下执行。

takeEvery只是监听每个action，然后执行处理函数。对于何时相应action和 如何相应action，takeEvery并没有控制权。

而take则不一样，我们可以在generator函数中决定何时相应一个action，以及一个action被触发后做什么操作。

最大区别：take只有在执行流达到时才会响应对应的action，而takeEvery则一经注册，都会响应action。

上代码:

```
effects: {
 * takeDemo1({payload}, {put, call, take}) {

 },
 * takeInputChange({payload}, {put, call, take,takeEvery,takeLatest}) {
  // yield call(delay,1000);
  console.log(takeEvery);
  // for (let i = 0; i < 3; i++) {
   const action = yield take('takeBlur'});
   console.log(action, 'action');
   console.log(payload.value);
  // }

 },
 * takeBlur() {
  console.log(323)
 },
}

changeHandle(e){
 this.props.dispatch({type:'takeInputChange',payload:{value:e.target.value}})
}
blur(){
 this.props.dispatch({type:'takeBlur'})
}
render() {
 
 return (
  <div style={{position: 'relative'}}>
   <Input onChange={this.changeHandle.bind(this)} onBlur={this.blur.bind(this)}/> 
  </div>
  )
}
```

页面上有一个input,绑定了两个方法,第一个是onchange方法,一个是onBlur方法,

当input值改变 的时候,通过 this.props.dispatch({type:'takeInputChange'}),调用此函数,但是因为遇到了take的方法,不能往下继续执行了(暂停了),如果这里的take换成了takeEvery则大有不同,函数会继续执行,就是下面的两个console会执行,

而takeEvery执行的方法则放在它的回调里了,看下面代码

```
yield takeEvery(``'takeBlur'``,()=>{console.log(payload.value)});
```

需要强调的是每次input改变的时候都会触发这个函数,所以每次改变的时候,会看到控制台都会打印一次console里的值.

接下来,如果input失去焦点后,则会执行onBlur方法,此时调用this.props.dispatch({type:'takeBlur'});

在takeInputChange里的take因为监听到了takeBlur这个action,那么就会继续执行需要执行的内容.

这个take反正是研究了还算长的时间,不知道这个东西在哪些时候能够派的上用场

做防抖的时候用,可以delay函数+while+take

但是,takeLast好像就算防抖啊.....