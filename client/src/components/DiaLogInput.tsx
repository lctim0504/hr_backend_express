import * as React from 'react';
import Button from '@mui/material/Button';
import RangeTimePicker from './RangeTimePicker';
import { OvertimeUpdateActTime } from '../app/OvertimeApi';

export default function SlideDialog2({
    disabled,
    btn_name,
    seq,
    start_time,
    end_time,
}: {
    dialogTitle: string;
    dialogText: string;
    disabled: boolean;
    btn_name: string;
    seq: React.Key | null | undefined;
    start_time?: string | number | null | undefined;
    end_time?: string | number | null | undefined;
}) {
    const [open, setOpen] = React.useState(false);
    const [startTime, setStartTime] = React.useState(start_time ? new Date(start_time) : new Date());
    const [endTime, setEndTime] = React.useState(end_time ? new Date(end_time) : new Date());

    const handleClickOpen = () => {
        if (open) {
            const updatedRecord =
                { act_start_time: startTime, act_end_time: endTime }

            // OvertimeUpdateActTime(seq, updatedRecord);
        }
        setOpen(!open);
    };

    const handleChange = (dates: any) => {
        if (dates) {
            setStartTime(dates[0]?.add(8, 'hours').toDate());
            setEndTime(dates[1]?.add(8, 'hours').toDate());
        }
    }

    return (
        <div className="container center">
            {open ? <RangeTimePicker start_time={startTime} end_time={endTime}
                onChange={handleChange} /> : null}

            <Button variant="contained" className="btn-update" disabled={disabled || false} onClick={handleClickOpen}>
                {btn_name}
            </Button>
        </div>
    );
}