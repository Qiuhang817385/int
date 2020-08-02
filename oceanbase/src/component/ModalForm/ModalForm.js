import React, { useState } from 'react';
import { Modal, Select, message } from 'antd';

const { Option } = Select;

const AuthorizeForm = ({ visible, onCancel, onOk }) => {
  const [roleIds, setRoleIds] = useState([]);

  const roles = [
    {
      id: 1,
      name: '张三'
    },
    {
      id: 2,
      name: '李四'
    },
    {
      id: 3,
      name: '王五'
    },
    {
      id: 4,
      name: '细胞'
    },
  ]
  return <Modal
    title='授权'
    visible={visible}
    onOk={() => onOk(roleIds)}
    onCancel={onCancel}
    // 关闭时销毁 Modal 里的子元素
    destroyOnClose
  >
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="请选择"
      loading={false}
      // defaultValue={}
      onChange={(values) => {
        setRoleIds(values)
      }}
    >
      {
        roles.length && roles.map((item) =>
          <Option key={item?.id} value={item?.id} label={item?.name}>
            {item?.name}
          </Option>
        )
      }
    </Select>
  </Modal>
}

export default AuthorizeForm;