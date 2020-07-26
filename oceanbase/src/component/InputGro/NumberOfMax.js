import React, { useState, useEffect } from 'react'
import { AutoComplete, Button, Card, Col, Checkbox, Form, Row, Switch, InputNumber, Input, Select } from 'antd';

const { Option } = Select;

const NumberOfMix = (props) => {
    const { value } = props
    const MAP_MAX_NUMBER = {
        'seconds': 600,
        'minutes': 6000,
        'hours': 360000,
        'days': 8640000,
    }
    const [max, setMax] = useState();

    const handleInputChange = (InputNumberValue) => {
        console.log('value', value)
        triggerChange({ InputNumberValue });
    }

    const handleChangeSelect = (SelectVal) => {
        triggerChange({ SelectVal });
    }

    useEffect(() => {
        setMax(MAP_MAX_NUMBER[value.SelectVal])
        let InputNumberValue = MAP_MAX_NUMBER[value.SelectVal];
        triggerChange({ InputNumberValue });
    }, [value.SelectVal])

    const triggerChange = changedValue => {
        const { onChange, value } = props;
        if (onChange) {
            onChange({
                ...value,
                ...changedValue,
            });
        }
    };

    return (<Input.Group compact>
        <InputNumber value={value.InputNumberValue} max={max} onChange={handleInputChange} />
        <Select style={{ width: 100 }} value={value.SelectVal} onChange={handleChangeSelect}>
            <Option value="seconds">次/10秒</Option>
            <Option value="minutes">次/分钟</Option>
            <Option value="hours">次/小时</Option>
            <Option value="days">次/天</Option>
        </Select>
    </Input.Group>)
}

export default NumberOfMix