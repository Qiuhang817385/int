import React, { Component } from 'react'
import { AutoComplete, Button, Card, Col, Checkbox, Form, Row, Switch, InputNumber, Input, Select } from 'antd';

const { Option } = Select;

// export interface NumberOfMixObj {
//     SelectVal: string;
//     InputNumberValue: number
// }

// export interface Props {
//     value: NumberOfMixObj
// }
// export interface State {
//     max:number
// }

// export default class NumberOfMix extends Component<Props, State> {
export default class NumberOfMix extends Component {
    state = {
        max: 6000
    }

    MAP_MAX_NUMBER = {
        'seconds': 600,
        'minutes': 6000,
        'hours': 360000,
        'days': 8640000,
    }
    /**
     * 数字输入框
     */
    handleInputChange = (InputNumberValue) => {
        this.triggerChange({ InputNumberValue });
    }
    /**
     * 下拉选择框
     */
    handleChangeSelect = (SelectVal) => {
        let InputNumberValue = this.MAP_MAX_NUMBER[SelectVal];
        this.triggerChange({ SelectVal, InputNumberValue });
        this.setState({
            max:InputNumberValue
        })
    }
    /**
     * 触发表单回调事件,修改两个表单的值
     */
    triggerChange = changedValue => {
        const { onChange, value } = this.props;
        if (onChange) {
            onChange({
                ...value,
                ...changedValue,
            });
        }
    };

    render() {
        const { value } = this.props;
        const { max } = this.state;
        return (
            <Input.Group compact>
                <InputNumber value={value.InputNumberValue} max={max} onChange={this.handleInputChange} />
                <Select style={{ width: 100 }} value={value.SelectVal} onChange={this.handleChangeSelect}>
                    <Option value="seconds">次/10秒</Option>
                    <Option value="minutes">次/分钟</Option>
                    <Option value="hours">次/小时</Option>
                    <Option value="days">次/天</Option>
                </Select>
            </Input.Group>
        )
    }
}
