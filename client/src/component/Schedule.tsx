import React from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Sample.css';
import UploadSchedule from './UploadSchedule';

const MySchedule = () => {
    const tileContent = ({ date, view }: { date: Date, view: string }) =>
        view === 'month' && date.getDate() === 10 ? (
            <><span style={{ color: 'white', backgroundColor: '#6ba5ff' }}></span></>
        ) : null;

    return (
        <>
            <div>
                <Calendar tileContent={tileContent} showWeekNumbers />
                <UploadSchedule />
            </div>
        </>

    );
};

export default MySchedule;
