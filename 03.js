// 入参格式参考：
const arr = [
  { id: 1, name: 'i1' },
  { id: 2, name: 'i2', parentId: 1 },
  { id: 4, name: 'i4', parentId: 3 },
  { id: 3, name: 'i3', parentId: 2 },
  { id: 5, name: 'i5', parentId: 3 },
  { id: 8, name: 'i8', parentId: 7 }
];

/* 
未完成
未完成
未完成
*/

/* 可以将数组转化为树状数据结构，要求程序具有侦测错误输入的能力*/
function buildTree (arr) {
  /**
   * 此处写代码逻辑
   */

  let Tree = {};
  arr.forEach(element => {
    console.log('element', element);
    if (!element.parentId) {
      //根节点
      Tree = element;
      Tree.children = []
    }
  });
  toTree(Tree, arr);
}

function toTree (Tree, arr) {

  arr.forEach(item => {
    if (item.parentId) {
      if (item.parentId === Tree.id) {
        Tree.children.push(item)
        // item.children = [] 
      } else {
        Tree.children.push(item)
      }
    }
    // 思路  : 进行递归操作  每次判断有没有parentID  如果有  那么判断是否和 单上一级的 父元素相等  如果相等   push进去Children,否则 新建节点树
  })

  console.log('Tree', Tree);
}

buildTree(arr);