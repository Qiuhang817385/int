https://github.com/aspirantzhang/umi3-grud



https://www.bilibili.com/video/BV1qz411z7s3?p=1



## dva特点

saga是核心,数据管理方案



## umi特点

二次启动快

约定式路由,路由核心



## 知识点

![image-20200525123338396](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525123338396.png)



## 没有用umi ui

![image-20200525123415805](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525123415805.png)







![image-20200525123458338](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525123539212.png)

![image-20200525123539212](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525124413657.png)





![image-20200525123736207](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525125128922.png)

## 异步相关

![image-20200525124413657](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525123736207.png)







## dva是数据流管理的解决方案

## umi以路由为基础的,配置式和约定式路由(默认

![image-20200525125128922](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525125342475.png)

![image-20200525125342475](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525140326339.png)

## 思路??

想实现的功能----->根据想实现的功能创建对应的目录结构





## P4

dva公共数据-->model

私有数据 state



规则,异步的数据返回之后,要通过同步的方法返回到页面

同步 是返回到页面数据的唯一方式

![image-20200525140326339](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525123458338.png)

![image-20200525140340558](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525140340558.png)



订阅:页面比较常用的业务,无关于同步和异步,只是一个快捷的方法

订阅不用和页面进行沟通,逻辑直接写在订阅里面就可以了

订阅可以调异步也可以调同步

这块儿不是特别懂

上面的解释这么说不是特别恰当

具体还需要看用法



![image-20200525141657183](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525142756617.png)

文件夹

,一般是复数名词

![image-20200525142059354](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525142059354.png)



## P5 路由配置

```js
tree -f
```

![image-20200525142756617](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525142816789.png)

![image-20200525142816789](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525141657183.png)

![image-20200525143544767](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525195524898.png)



### 官网文档 

路由--->约定式路由-/**如果没有 routes 配置，Umi 会进入约定式路由模式**，-->配置--->Umi 在 `.umirc.ts` 或 `config/config.ts` 中配置项目和插件



```js
// 如果没有 routes 配置，Umi 会进入约定式路由模式，
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],

有这个配置就无法进入约定式路由
```



## P6@umijs/plugin-dva 开启dva



直接使用两个解构赋值

![image-20200525195524898](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525195942507.png)

![image-20200525195544407](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525143544767.png)



## P7

基本的model结构

![image-20200525195942507](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525195544407.png)



查看三个处理的参数

### reducers

```js
(state, action) => newState 或 [(state, action) => newState, enhancer]。

 getList(state, {	type, payload }) {
      return payload;
    },
```

### effects

```js
*(action, effects) => void 或 [*(action, effects) => void, { type }]

*getRemote({ type , payload: { page, per_page } }, { put, call ,select }) {
    // select用于获取state当中的数据
    let counter = yield select(({counter})=>counter);
    
    let counter = yield select(_=>_.counter)
}
```

### subscriptions

https://github.com/ReactTraining/history/blob/master/docs/GettingStarted.md

```js
({ dispatch, history }, done) => unlistenFunction。
```

![image-20200525200541919](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525200541919.png)





```js
history的API

history.listen((location, action) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  );
  console.log(`The last navigation action was ${action}`);
});
```



![image-20200525215331813](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525233850782.png)





## P8

第一步  现在的流程

页面--->订阅--->effect--->reducer



异步函数的两种写法

```js
const fn = async ( ) =>{
    
}

async function fn(){
    
}

const foo = async ()=>{}
async function foo(){}
```



### @umijs/plugin-request



### proxy,配置里面配置跨域

```js
export default {
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
}
```



![image-20200525233850782](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526092457384.png)

配置完代理的话

要是访问远程的接口

可以通过localHost的方式来访问





## husky必须手动add和commit



## P11

传入表单的值动态改变

const [form] = Form.useForm();

form.setFieldsValue

form={form}



forceRender



解决key的另一种方式

![image-20200526092457384](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200525215331813.png)



点击modal -OK按钮的时候 表单进行自动提交





这种解决方式不错,不在页面上面显示ID

```js
const onFinish = values => {
    console.log('Success:', values);
    let id;
    if (records) {
      id = records.id;
    }
    props.dispatch({
      type: 'users/edit',
      payload: values,
      // 第二种写法
      //  payload: {values,id},
    });
  };
```



![image-20200526102052884](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526102052884.png)





## P12没有做删除逻辑

自己完成



## p13 添加



同时做添加和删除,区别在哪里

修改需要id  

添加不需要id



做到这一块儿  其实就不应该让id那个框显示了

这样可以提高通用性



## 清除之前字段



```js
 useEffect(() => {
    form.setFieldsValue(records);
    return () => {
      form.resetFields();
    };
  }, [modalVisibal, records]);
```





## P14 错误提示

200

201

204



503



在Request当中,处理返回的header 状态码字段



https://github.com/umijs/umi-request



## Error handling

```js
const errorHandler = function(error) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMap[error.data.status]);
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    console.log(error.message);
  }

  throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};
```



后端支持的请求方法

![image-20200526122616311](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526122616311.png)

## 发送两次请求

umi请求的流程

第一次  看服务器支持不支持  支持哪些请求

第二次,真正发送





![image-20200526123021168](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526123113341.png)

![image-20200526123113341](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526124202938.png)

```js
请求网址:http://public-api-v1.aspirantzhang.com/users/249
请求方法:OPTIONS
远程地址:124.238.243.16:80
状态码:
204:服务器成功处理了请求,但不需要返回任何实体内容
版本:HTTP/1.1
Referrer 政策:no-referrer-when-downgrade
	
响应头 (834 字节)	
原始头
Access-Control-Allow-Credentials	
true
Access-Control-Allow-Headers	
Authorization, Content-Type, I…-CSRF-TOKEN, X-Requested-With
Access-Control-Allow-Methods	
GET, POST, PATCH, PUT, DELETE
Access-Control-Allow-Origin	
*
Ali-Swift-Global-Savetime	
1590467403
Connection	
keep-alive
Content-Length	
0
Content-Type	
application/octet-stream
Date	
Tue, 26 May 2020 04:30:03 GMT
EagleId	
7cec149815904674025665186e
Server	
Timing-Allow-Origin	
*
Vary	
User-Agent
Via	
cache28.l2cn2179[396,204-0,M],…4-0,M], kunlun4.cn1550[471,0]
X-Cache	
MISS TCP_MISS dirn:-2:-2
X-Powered-By	
PHP/7.3.15
X-Swift-CacheTime	
1
X-Swift-SaveTime	
Tue, 26 May 2020 04:30:03 GMT
请求头 (460 字节)	
原始头
Accept	
*/*
Accept-Encoding	
gzip, deflate
Accept-Language	
zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Access-Control-Request-Headers	
content-type
Access-Control-Request-Method	
PUT
Connection	
keep-alive
Host	
public-api-v1.aspirantzhang.com
Origin	
http://localhost:8000
Referer	
http://localhost:8000/users
User-Agent	
Mozilla/5.0 (Windows NT 10.0; …) Gecko/20100101 Firefox/75.0
```



## 错误判断的优化

![image-20200526123833048](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526125605323.png)

## 一般就直接在仓库里面进行loading和成功失败的提示判断

Modal里面做



### umi里面的loading

![image-20200526124202938](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526123833048.png)



![image-20200526124217260](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526123021168.png)



## P15 类型定义

前端做的工作,根据后端接口文档返回来的数据,然后写类型定义,这样其实做太浪费时间了有点



![image-20200526125605323](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526124217260.png)

![image-20200526125614956](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526125614956.png)



### 在接口定义的类型,也就是modal文件里面导出的接口 

可以直接在umi里面导出

![image-20200526125732802](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526125732802.png)

UserState类型



### data.d.ts  引入的时候可以全称,可以省略ts

![image-20200526130051451](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526130051451.png)



### 定义useState

![image-20200526130231183](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526130721100.png)



![image-20200526130721100](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526130231183.png)

定义antd的form的onFinish的value类型

FormValues



## 输出和umi 的antd一样的错误提示 必填?什么的

![image-20200526131138951](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200526131138951.png)



## P16

使用pro-table

https://protable.ant.design/

```bash
npm install @ant-design/pro-table
# or
yarn add @ant-design/pro-table
```



![image-20200527104209343](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527104849482.png)

分页功能



### select API



![image-20200527104532371](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527104209343.png)



reload 按钮

![image-20200527104849482](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527104532371.png)





## P17 定制化分页

![image-20200527110238644](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527110238644.png)





![image-20200527110406218](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527110406218.png)



解决问题  添加current属性

![image-20200527110600078](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527110600078.png)



应该保留![image-20200527111023400](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527112055235.png)







## P18

怎么修改成

完善,如果修改失败,那么窗口不关闭,提交的时候ok显示成loading,如果成功再关闭



现在有两种方式   实现方式的基础就是数据+模态框视图

1.直接在页面当中 使用调用service调取接口  不走仓库,这样在index页面就有异步数据获取+控制模态框显隐  

2.走仓库,每一步添加返回值来进行判断



onFinish修改成async的形式

![image-20200527112055235](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527111023400.png)



优化

![image-20200527112410091](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527123844455.png)

完整的看代码





添加完整的loading

![image-20200527112612538](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527112612538.png)



### form下面的switch怎么做

![image-20200527123844455](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527112410091.png)



![image-20200527124102402](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527124102402.png)

![image-20200527124121468](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527124121468.png)





使用useRef实现鼠标划入的效果

![image-20200527125447233](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527125505464.png)

![image-20200527125505464](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527125706185.png)





### partial的作用

![image-20200527125706185](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527125728116.png)

![image-20200527125728116](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527125813549.png)



## useEffect

![image-20200527125813549](https://qiuhangmarkdown.oss-cn-hangzhou.aliyuncs.com/markdowm/image-20200527125447233.png)