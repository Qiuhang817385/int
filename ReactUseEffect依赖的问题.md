## 函数在外部

```js
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 这样不安全（它调用的 `doSomething` 函数使用了 `someProp`）
}
```

### 解决

要记住 effect 外部的函数使用了哪些 props 和 state 很难。这也是为什么 **通常你会想要在 effect \*内部\* 去声明它所需要的函数。** 这样就能容易的看出那个 effect 依赖了组件作用域中的哪些值：

```
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);    }

    doSomething();
  }, [someProp]); // ✅ 安全（我们的 effect 仅用到了 `someProp`）}
```





```
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // 使用了 productId prop    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 这样是无效的，因为 `fetchProduct` 使用了 `productId`  // ...
}
```

**推荐的修复方案是把那个函数移动到你的 effect \*内部\***。这样就能很容易的看出来你的 effect 使用了哪些 props 和 state，并确保它们都被声明了：

```
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 把这个函数移动到 effect 内部后，我们可以清楚地看到它用到的值。    
    async function fetchProduct() {      
        const response = await fetch('http://myapi/product/' + productId);      
        const json = await response.json();      
        setProduct(json);    
 	}
    fetchProduct();
  }, [productId]); // ✅ 有效，因为我们的 effect 只用到了 productId  // ...
}
```

这同时也允许你通过 effect 内部的局部变量来处理无序的响应：

```
  useEffect(() => {
    let ignore = false;    
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) 
      setProduct(json);    
  	}

    fetchProduct();
    return () => { ignore = true };  
 }, [productId]);
```



## **如果处于某些原因你 \*无法\* 把一个函数移动到 effect 内部，还有一些其他办法：**

- **你可以尝试把那个函数移动到你的组件之外**。那样一来，这个函数就肯定不会依赖任何 props 或 state，并且也不用出现在依赖列表中了。
- 如果你所调用的方法是一个纯计算，并且可以在渲染时调用，你可以 **转而在 effect 之外调用它，** 并让 effect 依赖于它的返回值。
- 万不得已的情况下，你可以 **把函数加入 effect 的依赖但 \*把它的定义包裹\*** 进 [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback) Hook。这就确保了它不随渲染而改变，除非 *它自身* 的依赖发生了改变：

```
function ProductPage({ productId }) {
  // ✅ 用 useCallback 包裹以避免随渲染发生改变  const fetchProduct = useCallback(() => {    // ... Does something with productId ...  }, [productId]); // ✅ useCallback 的所有依赖都被指定了
  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ useEffect 的所有依赖都被指定了
  // ...
}
```

注意在上面的案例中，我们 **需要** 让函数出现在依赖列表中。这确保了 `ProductPage` 的 `productId` prop 的变化会自动触发 `ProductDetails` 的重新获取。

### 





## 如果我的 effect 的依赖频繁变化，我该怎么办？

你的 effect 可能会使用一些频繁变化的值。你可能会忽略依赖列表中 state，但这通常会引起 Bug

解决方式,使用函数的方式进行更新

 setCount(c => c + 1);在这不依赖于外部的 `count` 变量

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不适用组件作用域中的任何变量

  return <h1>{count}</h1>;
}
```

