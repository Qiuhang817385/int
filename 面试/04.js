const arr = [1, 5, 9, 15, 28, 33, 55, 78, 99];

/**
 * 返回最接近输入值的数字，如果有多个，返回最大的那个
 * @param {number} n
 * @return {number}
 */
function findNext (n, arr) {
  /**
  * 此处写代码逻辑
  */
  //  存储插值value

  let tar_num = arr[0];
  arr.forEach(item => {
    if (Math.abs(n - item) <= Math.abs(n - tar_num)) {
      tar_num = item;
    }
  })
  return tar_num
}

console.log(findNext(44, arr)); // 55
// 边界条件可以有误