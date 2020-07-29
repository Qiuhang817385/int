import React from 'react';
import { Form, Input, Icon, Button, message, Table } from 'antd';
import Comp1 from './../hideOption';
import Comp2 from './../InputGro/Index'
let id = 0;
let fillComponentData = {
  key: Date.now(),
  name: <Comp2 />,
  age: <div>123</div>,
  // del: <>{
  //   // keys.length > 1 ? 
  //   (
  //     <Icon
  //       className="dynamic-delete-button"
  //       type="minus-circle-o"
  //       onClick={() => this.remove()}
  //     />
  //   )
  //   // : null
  // }
  // </>
}

let dataSource = [
  fillComponentData
];

class DynamicFieldSet extends React.Component {
  remove = ({ key }) => {
    let index = dataSource.findIndex((item) => item.key === key);
    dataSource = dataSource.filter(item => {
      return item.key !== key
    })
    // 怎么找到索引值
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== index),
    });
  };



  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // 默认就是一个空数组

    const nextKeys = keys.concat(id++);
    dataSource.push(fillComponentData)
    // if (nextKeys.length > 5) {
    //   message.info({
    //     content: '条数超过5条了'
    //   })
    //   return
    // }
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
        console.log('names', names);
      }
    });
  };

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 4
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    console.log('keys', keys);


    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '删除',
        dataIndex: 'del',
        key: 'del',
        render: (text, record) => {
          console.log(text, record)
          return <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(record)}
          />
        }
      },
    ];
    return (<>
      <Form onSubmit={this.handleSubmit}>
        <Table pagination={false} showHeader={false} dataSource={dataSource} columns={columns} />
        {/* {formItems} */}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form></>
    );
  }
}
//name 设置表单域内字段 id 的前缀

export default Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet)