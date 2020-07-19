## 父子组件之间传值

### 一/父给子传值

```js
父类
<TodoItem content={this.state.name}/>
    
子类
<div>{this.props.content}</div>
```



### 二/子类调用父类的方法,修改父类的数据

```js
父类
this.state={
         username:"父级名称"
 }
let changeName = (event) => {
    this.setState({username:event.target.value})
}

<Name changeUsername={this.changeName}/>

子类

this.childMethod(){
    //调用父类方法
    this.props.changeUsername(如需参数)
}
```



### 三/父调子方法(适合类组件

```js
父类
<Child ref={this.onChild} />
<button onClick={this.click} >click</button>

constructor(props) {
    super(props);
    this.onChild = React.createRef();
}

click = (e) => {
    this.onChild.myName()
}


子类

myName = () => alert('xiaohesong')

     
```

### 四/父拿子数据(适合函数组件)

```js
父类

state = {
    item: []
}

hanleClick = () => {
    console.log(this.state.item)
}

 <ETable
    hanleGetItems={func/data => {
     //获取数据
      this.setState({
        item: data
      })
      // 调用方法
      // this.handleClick = func 
}}

函数子组件

const [selectedItemCheck, setSelectedItemCheck] = useState([]);

useEffect(() => {
    props.hanleGetItems(getItem(selectedItemCheck))
}, [selectedItemCheck])
```





### 四/这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。

















vue可以做到,修改父类传递过来的数据,但是react做不到啊

这里修改成调用父类的方法修改父类的值,这里应该只是一个单纯的函数组件



### 五/修改类的方法(切换激活状态)

```js
let toggleMaskActive = this.state.isCardNumberMasked ? '-active' : '';

className={"card-input__eye " + toggleMaskActive}
```



### 六,把值从对象当中结构出来







### 七/动态引入图片

在src目录下创建的assets--->用相对路径



怎么引入public?

https://www.jianshu.com/p/83d540245b07





```js

{this.state.sex==1?image = require('../images/boy'):image = require('../images/girl')}

currentCardBackground () {
    // 自定义图片
    if (true) { // TODO will be optimized
      let random = Math.floor(Math.random() * 25 + 1)
      return require(`../../assets/images/${random}.jpeg`);
    } else {
      return null
    }
  }

  this.itemBg = React.createRef()

 <img alt="card-item__bg" className="card-item__bg" ref={this.itemBg} />
     
     
调用
didMount{
     this.itemBg.current.src = this.currentCardBackground();
}
　
 <img alt="card-item__bg" className="card-item__bg" ref={this.itemBg} />
     
     
   <img  src={require('../../assets/images/visa.png')} />

         
              或者
const ticks = Object.keys(maths).map(item => require("../../../images/homeImg/" + item + ".png"));
              
或者
              
<img  src={path} />
```



### 八/if条件判断

```js
{
                  labels.cardName.length > 0 ?
                    <div className="card-item__name">
                      {labels.cardName.replace(/\s\s+/g, ' ').split('').map((item, index) 										=> {
                        return (
                          <span className="card-item__nameItem">{item}</span>
                        )
                      })}
                     </div> 
                      {/* <transition-group name="slide-fade-right"> */}
                    : <div className="card-item__name">Full Name</div>
                }
```

### 九/动画

```js
http://reactcommunity.org/react-transition-group/transition
```



![image-20200412215215848](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200412215215848.png)





![image-20200412215303480](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200412215303480.png)

![image-20200412215537270](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200412215537270.png)

in属性没用了



### 十/Refs

```js
this.myRef = React.createRef();

<div ref={this.myRef} />;
```



### 十一/hook

```
setCount(count + 1)
```



### 十二/动态类

```js
  let hideClass = this.state.Num > 0 ? " " : "hide";

className={'num ' + hideClass}

className={[
          'list-mvc',
          list.completed ? 'competed' : '',
          editInput ? 'editing' : '',
        ].join(' ')}
```



### 十三/控制输入字符串长度

```js
input最大长度限制问题


<input type="text"  maxlength="5" />   //可以

<input type="number"  maxlength="5" />  //没有效果

<input type="number" οninput="if(value.length>5) value=value.slice(0,5)" /> //js控制，可以

<input type="tel"  maxlength="5" />  //tel类型，可以

 

此外，tel类型的input在ios上会调出全数字键盘，而number类型的input则会调出带有标点符号的键盘。

```



### 十四/怎么在12个span里面动态添加span

删除的时候span还在，内容被删除

```js

const { val, flag } = this.state;
    let newArr = '123456'
    return (
      <div>
        {/* <TransitionGroup> */}
        {
          newArr.split('').map((item, index) => {
            return (
              <span>
                {
                  val[index] ?{val[index]}: '#'
                }
              </span>
            )
          })
        }
   
        可以实现的特效
        
        现在* * * * * *
        当删除或者添加的时候   
		变成1 2 * * * *
        
     
```



```js
动画放弃
这个动画做不出来

原因
在input-数值的时候
如果直接删除，不加元素替换，那么这个元素会直接消失没用动画效果
```



## 一次Bug

```js
An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function
```

问题出在你在用`this.setState`的callback的方式，但是在callback里你由调用了`setState`, 比如：

```javascript
this.setState((prevState) => {
  // ...
  this.setState({ a: aaa })
})
```

所以应该返回新的state:

```javascript
this.setState((prevState) => {
  // ...
  return { a: aaa }
})
```