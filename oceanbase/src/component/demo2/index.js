import React, { useState, useRef } from 'react'
import { Button, Form, message } from 'antd';
import ModalClone from './Modal';
const Index = (props) => {
  const ModalCloneRef = useRef(null);
  const [cloneVisible, setCloneVisible] = useState(false);
  const handleCloneVisible = () => {
    setCloneVisible(true)
  }
  const data = [
    '1', '2', '3', '4', '5'
  ]
  const handleCreate = () => {
    const { form } = ModalCloneRef.current.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      setCloneVisible(false)
      form.resetFields();
      if (data.includes(values.title)) {
        message.info({ content: '重名字拉' })
        return
      }
    });
  }
  return (
    <div>
      <Button onClick={handleCloneVisible}>
        点击
      </Button>
      <ModalClone
        cloneVisible={cloneVisible}
        onCancel={() => { setCloneVisible(false) }}
        onCreate={handleCreate}
        wrappedComponentRef={ModalCloneRef}
        data={data}
      />
    </div>
  )
}
export default Form.create()(Index);