// 入参格式参考：
const url = 'http://sample.com/?a=1&b=2&c=xx&d#hash';
// 出参格式参考：
const result = { a: '1', b: '2', c: 'xx', d: '' };

/*拆解URL参数中queryString，返回一个 key - value 形式的 object*/
function querySearch (url) {
  // your code are here...
  let str = url.split('?')[1].split('&');
  let obj = {};
  // 循环赋值
  str.forEach((item) => {
    if (item.includes('#')) {
      obj[item.split('#')[0]] = ''
    } else {
      obj[item.split('=')[0]] = item.split('=')[1]
    }
  })
  console.log('str', str);
  return obj;
}
let res = querySearch(url);

console.log('res', res);
