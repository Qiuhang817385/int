# TransitionGroup

## [Props](http://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-props)

### [`component`](http://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-component)

`<TransitionGroup>` renders a `<div>` by default. You can change this behavior by providing a `component` prop. If you use React v16+ and would like to avoid a wrapping `<div>` element you can pass in `component={null}`. This is useful if the wrapping div borks your css styles.

type: `any`

default: `'div'`

```js
意思就是,TransitionGroup默认会自己包裹一层div
如果这层div破坏了样式
那么使用`component={null}`.
```

### [`children`](http://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-children)

### [`appear`](http://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-appear)

### [`enter`](http://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-enter)

### [`exit`](http://reactcommunity.org/react-transition-group/transition-group#TransitionGroup-prop-exit)

enter,是否开启子元素enter时候的属性



# CSSTransition

## 1/[`appear`](http://reactcommunity.org/react-transition-group/transition#Transition-prop-appear) prop, make sure to define styles for `.appear-*` classes as well.

如果设置了appear属性,那么同时需要设置appear类



## 2必须设置active

## 3当in从false变成true的时候,会激发enter类



## 4If the transition component mounts with `in={false}`, no classes are applied yet. You might be expecting `*-exit-done`, but if you think about it, a component cannot finish exiting if it hasn't entered yet.

当in设置成false的时候,加上的类不是exit-done





## 5`fade-appear-done` and `fade-enter-done` will *both* be applied.

剩下的都是回调函数的方式





# SwitchTransition

针对的是哪一个类型 

 `'out-in'|'in-out'`

先出后进和先进后出

这个应用的场景暂时想不到



ie 即

e.g. 例如

etc 等等

