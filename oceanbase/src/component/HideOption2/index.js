import React from 'react';
import { Select } from 'antd';

class SelectWithHiddenSelectedOptions extends React.Component {
  state = {
    selectedItems: '',
  };

  handleChange = selectedItems => {
    const { onSelChange } = this.props
    this.setState((pre) => {
      // console.log(pre.selectedItems)
      onSelChange(pre.selectedItems, selectedItems);
      return { selectedItems }
    });
  };

  render () {
    const { filteredOptions } = this.props;
    const { selectedItems } = this.state;
    return (
      <Select
        placeholder="请输入"
        // 有没有这个value好像一样啊
        // value={selectedItems}
        onChange={this.handleChange}
        style={{ width: '100%' }}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default SelectWithHiddenSelectedOptions;