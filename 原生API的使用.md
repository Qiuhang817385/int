在使用dva的时候，我们在处理effects（副作用）的时候用的api都是封装的redux-saga，call、put、select之类的0学习成本直接用，但是takeLatest、takeEvery怎么试都没找到用法，最后跑到了dva官方的[ ](https://github.com/dvajs/dva)Issues中找到了作者写的用法：

```
const effects = {
  // default: takeEvery
  ['setQuery']: function*() {},
  // takeLatest
  ['setQuery']: [function*() {}, { type: 'takeLatest'}],
  // you don't need to set type for takeEvery, it's by default.
  ['setQuery']: [function*() {}, { type: 'takeEvery'}],
}
```