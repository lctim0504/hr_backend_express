import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const NewCalendar = ({ value, onChange }: { value: Dayjs, onChange: (newValue: Dayjs | null) => void }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    value={value}
                    onChange={onChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default NewCalendar;