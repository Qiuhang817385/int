import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import { Divider } from 'antd';
// import Demo1 from './component/demo1';
// import Demo1 from './component/demo1/index2';
// import Demo2 from './component/demo2';
import HideOption2 from './component/HideOption2'
function App () {
  const [filteredOptions, setFilteredOptions] = useState(['Apples', 'Nails', 'Bananas', 'Helicopters'])

  const handleChange = (prevValue, params) => {
    // 如果为空,说明是第二次进来
    setFilteredOptions((pre) => {
      const newArr = JSON.parse(JSON.stringify(pre));
      prevValue.length && newArr.push(prevValue);
      return newArr.filter(o => !params.includes(o))
    })
  }

  // 如果点击删除, 那么需要获取当前的值,然后重新push回去到prevValue

  return (
    <div>
      {
        [1, 2, 3].map((key) => <HideOption2 key={key} filteredOptions={filteredOptions} onSelChange={handleChange} />)
      }
    </div>
  );
}

// 怎么回退呢
// 父 [2,3,4]

// 子1 [1]
// 子2 []
// 子3 []
// 子4 []

export default App;
