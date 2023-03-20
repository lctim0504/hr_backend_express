import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Sample.css';
import UploadSchedule from './UploadSchedule';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MySchedule = () => {

    const [workingDay, setWorkingDay] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/schedule/1080001');
                console.log(response.data);
                setWorkingDay(response.data);
            } catch (error) {
                console.log("error getting schedule");
            }
        };
        fetchData();
    }, []);

    const isWorkDate = (content: string) => !['*', '+', '&'].includes(content);

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        const date1 = date.getDate().toString();
        const currentMonthWorkingDay = workingDay.find(
            (d: any) => d.month === date.getMonth() + 1 && d[date1] && isWorkDate(d[date1])
        );

        if (currentMonthWorkingDay && view === "month") {
            const content = currentMonthWorkingDay[date1];
            return (
                <div
                    style={{ position: "relative", marginTop: "10px" }}
                    onClick={() => alert(content)}
                >
                    <span
                        style={{
                            color: "white",
                            backgroundColor: "#6ba5ff",
                            borderRadius: "50%",
                            padding: "10% 30%",
                        }}
                    />
                </div>
            );
        }
        return (
            <div style={{ position: "relative", marginTop: "10px" }}>
                <span
                    style={{
                        backgroundColor: "transparent",
                        borderRadius: "50%",
                        padding: "10% 30%",
                    }}
                />
            </div>
        );;
    };

    return (
        <>
            <div>
                <Calendar tileContent={tileContent} />
                <UploadSchedule />
            </div>
        </>
    );
};

export default MySchedule;
