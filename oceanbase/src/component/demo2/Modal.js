import React from 'react'
import { Form, Modal, Input } from 'antd'

class ModalClone extends React.PureComponent {
  render () {
    const { cloneVisible,
      onCancel,
      onCreate,
      form: { getFieldDecorator }
    } = this.props;

    return (<Modal
      visible={cloneVisible}
      tittle='复制'
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form>
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title of collection!' }],
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>)
  }
}

export default Form.create()(ModalClone);
