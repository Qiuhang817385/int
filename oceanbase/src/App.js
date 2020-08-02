import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import _ from 'lodash';
import { Divider } from 'antd';
// import Demo1 from './component/demo1';
// import Demo1 from './component/demo1/index2';
// import Demo2 from './component/demo2';
// import HideOption2 from './component/HideOption2'

import ModalForm from './component/ModalForm/ModalForm';
import useAsync from './hooks/useAsync';
const myFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 10;
      rnd <= 5
        ? resolve('Submitted successfully 🙌')
        : reject('Oh no there was an error 😞');
    }, 2000);
  });
};

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

  const object = { 'a': [{ 'b': { 'c': 3 } }] };
  const object2 = { 'a': 1, 'b': '2', 'c': 3 };
  // 如果点击删除, 那么需要获取当前的值,然后重新push回去到prevValue

  // 进行筛选
  // console.log(_.omitBy(object2, _.isNumber));
  // 对象不是一个函数???
  const { execute, pending, value, error } = useAsync(myFunction, false);


  const [visible, setVisible] = useState(false);

  return (
    <div>
      {/* {
        [1, 2, 3].map((key) => <HideOption2 key={key} filteredOptions={filteredOptions} onSelChange={handleChange} />)
      } */}
      {/* {_.get(object, 'a[0].b.c')} */}
      <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}
      >
        {value && <div>{value}</div>}
        {error && <div>{error}</div>}
        <button onClick={execute} disabled={pending}>
          {!pending ? 'Click me' : 'Loading...'}
        </button>
      </div>
      <Divider />
      <ModalForm
        visible={visible}
        onCancel={() => { setVisible(false) }}
        onOk={(value) => {
          console.log(value);
          setVisible(false)
        }}
      />
      <button
        onClick={() => setVisible(true)}>点击</button>
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
