import React, { useState } from "react";
import { Radio, Form, Button, Modal,Divider  } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Index() {
  const [authType, setAuthType] = useState("pwd");
  const [userType, setUserType] = useState("root");

  function onChange(e) {
    setAuthType(e.target.value);
    console.log(`radio checked:${e.target.value}`);
  }
  function onChange2(e) {
    setUserType(e.target.value);
    console.log(`radio checked:${e.target.value}`);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let handleLock1 = () => {
    Modal.confirm({
      title:'确定要',
      content:'内容',
      // icon:
      okText:'锁定',
      okButtonProps:{
        type:'danger',
        ghost:true
      },
      onOk: () => {
        console.log('OK');
      }
    })
  }
  let handleLock2 = () => {
  }
  let handleLock3 = () => {
  }
  let handleLock4 = () => {
  }
  
  

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="授权类型"
          name="authType"
          rules={[{ required: true, message: "Please input your 授权类型!" }]}
        >
          <Radio.Group onChange={onChange}>
            <Radio.Button value="pwd">用户名/密码</Radio.Button>
            <Radio.Button value="ssh">SSH密钥</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="用户类型"
          name="userType"
          rules={[{ required: true, message: "Please input your 用户类型!" }]}
        >
          <Radio.Group onChange={onChange2}>
            <Radio.Button value="root">root用户</Radio.Button>
            <Radio.Button value="normal">普通用户</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {authType === "pwd" && userType === "root" && (
          <Form.Item label="展示1" name="展示1">
            <Button
              onClick={() => {
                handleLock1();
              }}
            >
              展示1
            </Button>
          </Form.Item>
        )}
        {authType === "ssh" && userType === "root" && (
          <Form.Item label="展示2" name="展示2">
            <Button
              onClick={() => {
                handleLock2();
              }}
            >
              展示2
            </Button>
          </Form.Item>
        )}
        {authType === "pwd" && userType === "normal" && (
          <Form.Item label="展示3" name="展示3">
            <Button
              onClick={() => {
                handleLock3();
              }}
            >
              展示3
            </Button>
          </Form.Item>
        )}
        {authType === "ssh" && userType === "normal" && (
          <Form.Item label="展示4" name="展示4">
            <Button
              onClick={() => {
                handleLock4();
              }}
            >
              展示4
            </Button>
          </Form.Item>
        )}
      </Form>
      <Divider ></Divider>

    </div>
  );
}

export default Index;
