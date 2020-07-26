import React, { Component } from "react";
import { Button, Form, Row, Switch, InputNumber, Input, Select } from "antd";
// import NumberOfMax from './NumberOfMax';
import NumberOfMax from './1'
const FormItem = Form.Item;
const { Option } = Select;

class New extends Component {
    state = {
        visible: false,
        AccessControlVisible: true,
        SelectVal: "minutes",
    };

    MAP_MAX_NUMBER = {
        seconds: 600,
        minutes: 6000,
        hours: 360000,
        days: 8640000,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('err', err);
            console.log('values', values);
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


render() {
    const { form: { getFieldDecorator } } = this.props
    return (
        <div>
            {/* 是否显示冒号 隐藏所有表单项的必选标记 */}
            <Form colon={false} hideRequiredMark={true} onSubmit={this.handleSubmit}>
                {this.state.AccessControlVisible && (
                    <>
                        <FormItem label="访问次数上限">
                            {getFieldDecorator("NumberOfMix", {
                                initialValue: {
                                    InputNumberValue: 1200,
                                    SelectVal: 'minutes'
                                }
                            })(<NumberOfMax />)}
                        </FormItem>
                        {/* ----------------------------------------------- */}
                        {/* <FormItem label="细粒度访问控制">
                                {getFieldDecorator("NumberOfMix", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "次数只能输入正整数且小于等于最大访问",
                                        },
                                    ],
                                })(<>{}</>)}
                            </FormItem> */}

                    </>
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Log in
                        </Button>
                </Form.Item>
            </Form>

        </div>
    );
}
}

export default Form.create()(New)