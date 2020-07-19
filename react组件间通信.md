## 父子通信,缺点,每个组件维护自己的数据状态,太多的时候杂乱

维护性不高

### 一/子组件向父组件传值、父组件拿子组件当中的值

```js
 父组件
const [value, setValue] = useState('');
方式1
<InputChild value={value} changeVal={(res) => {setValue(res);}}></InputChild>
方式2
<InputChild value={value} onSubmit={this.onSubmit}>

子组件
handleChange = (e) => {
    let val = e.target.value;
    this.props.changeVal(val)
  }
 <input type="text" value={this.props.value} onChange={this.handleChange} />
 
 如果是表单
子组件是类组件，通过ref(Ref的使用)
子组件是函数组件，通过方法

```

### 二/父组件向子组件传值

```js
props.data
```

### 三/子组件调用父组件方法

```js
props.方法名
```

### 四/父组件调用子组件方法（useRef/React.createRef())

```js
getDS: function(){
        // 调用组件进行通信
        this.refs.getSwordButton.childMethod();
    },
```



### 五/useContext/隔代通信



### 六/Context



## 兄弟通信

### 一/共用父组件的prop



### 二/redux，A组件调用（dispatch）其他模块的 action

```js
违反了低耦合高内聚的原则
而且书写 redux 的一个原则就是 不要调用（dispatch）其他模块的 action
```



### 三/事件订阅，pubsub-js





## Redux数据管理

### 一/redux+react-redux



### 二/redux+react-redux+redux-thunk+async/await



### 三/redux+react-redux+redux-saga



### 四/useReducer



