import { Select } from 'antd';
import React from 'react';
import { ComponentDemoProps, OptionType } from '../interface/Components';

const ComponentDemo = ({ options, onChange }: ComponentDemoProps) => {
    const newdata = options.filter((obj, index, self) =>
        index === self.findIndex((t) => (
            t.value === obj.value
        ))
    );
    const option = newdata as OptionType[];

    return (
        <Select
            allowClear
            showSearch
            style={{
                width: 100,
            }}
            dropdownStyle={{ maxHeight: 200 }}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.value ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
            }
            options={option}
            onChange={(value: string | null) => { onChange(value) }}
        />
    );
}

export default ComponentDemo;