import React from 'react';
import { Select } from 'antd';



class SelectWithHiddenSelectedOptions extends React.Component {
    state = {
        selectedItems: [],
    };

    handleChange = selectedItems => {
        const { handleChangeParent } = this.props
        this.setState({ selectedItems });
        handleChangeParent(selectedItems)
    };

    render() {
        const { filteredOptions } = this.props
        const { selectedItems } = this.state;

        return (
            <Select
                placeholder="Inserted are removed"
                value={selectedItems}
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