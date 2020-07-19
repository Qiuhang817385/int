import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
// const SubMenu = Menu.Item;
import { Menu } from 'antd';
export default function Home (props) {
  const [current, setCurrent] = useState('');
  const handleClick = e => {
    setCurrent(e.key);
  };
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
        <Menu.Item key="page1">
          <NavLink to="page1">Page1</NavLink>
        </Menu.Item>
        <Menu.Item key="page2">
          <NavLink to="page2">Page2</NavLink>
        </Menu.Item>
      </Menu>
      {props.children}
    </>
  )
}
