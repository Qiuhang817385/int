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

function toTree (data, parent) {
  var tree = [];
  var temp;
  data.map((item, index) => {
    if (item.parentId == parent) {
      temp = toTree(data, item.id);
      if (temp.length > 0) {
        item.children = temp;
        let obj = {};
      } else {
        item.children = [];
      }
      if (dataObjById[item.parentId]) {
        let { id, name, parentId } = dataObjById[item.parentId]
        item.parent = { id, name, parentId };
      } else {
        item.parent = {};
      }
      tree.push(item);
    }
  })
  return tree;
}

buildTree(arr);