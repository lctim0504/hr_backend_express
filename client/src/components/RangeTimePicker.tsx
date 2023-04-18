import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { RangeValue } from 'rc-picker/lib/interface';

const { RangePicker } = DatePicker;

interface RangeTimePickerProps {
    start_time: Date;
    end_time: Date;
    onChange?: (values: RangeValue<Dayjs>, formatString: [string, string]) => void;
}

// const onRangeChange = (values: RangeValue<Dayjs>, dateStrings: [string, string]) => {
//     if (values) {
//         const start_time = values[0] ? values[0].toDate() : null;
//         const end_time = values[1] ? values[1].toDate() : null;
//         console.log('From: ', start_time, ', to: ', end_time);
//         console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
//     } else {
//         console.log('Clear');
//     }
// };

const RangeTimePicker: React.FC<RangeTimePickerProps> = ({ start_time, end_time, onChange }) => {
    const defaultStartTime = dayjs(start_time).subtract(8, 'hours');
    const defaultEndTime = dayjs(end_time).subtract(8, 'hours');

    return (
        <Space direction="vertical" size={4}>
            <RangePicker
                showTime
                format="YYYY/MM/DD HH:mm"
                onChange={onChange}
                defaultValue={[defaultStartTime, defaultEndTime]}
                defaultPickerValue={[defaultStartTime, defaultEndTime]}
            />
        </Space>
    );
};

export default RangeTimePicker;