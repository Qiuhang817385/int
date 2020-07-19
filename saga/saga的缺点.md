### 缺点

- redux-saga 不强迫我们捕获异常，这往往会造成异常发生时难以发现原因。因此，一个良好的习惯是，相信任何一个过程都有可能发生异常。如果出现异常但没有被捕获，redux-saga 的错误栈会给你一种一脸懵逼的感觉。
- generator 的调试环境比较糟糕，babel 的 source-map 经常错位，经常要手动加 debugger 来调试。
- 你团队中使用的其它异步中间件，或许难以和 redux-saga 搭配良好。或许需要花费一些代价，用 redux-saga 来重构一部分中间件。

### 优点

- 保持 action 的简单纯粹，aciton 不再像原来那样五花八门，让人眼花缭乱。task 的模式使代码更加清晰。
- redux-saga 提供了丰富的 Effects，以及 sagas 的机制（所有的 saga 都可以被中断），在处理复杂的异步问题上十分趁手。如果你的应用属于写操作密集型或者业务逻辑复杂，快让 redux-saga 来拯救你。
- 扩展性强。
- 声明式的 Effects，使代码更易测试，[查看详情](http://leonshi.com/redux-saga-in-chinese/docs/basics/DeclarativeEffects.html)。