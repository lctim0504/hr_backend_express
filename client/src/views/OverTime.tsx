import React, { useState, useEffect } from 'react';
import Header from './partials/header';
import Footer from './partials/footer';
import NewCalendar from '../components/Calendar';
import SlideDialog from '../components/DiaLog';
import { OvertimeGetOne, OvertimePost, OvertimeDelete } from '../app/OvertimeApi';
import { ScheduleGetOne } from '../app/ScheduleApi';
import dayjs, { Dayjs } from 'dayjs';
import DenseTable from '../components/DenseTable';
import NewNativeSelect from '../components/Select';
import { message } from 'antd';
import { Button } from '@mui/material';
import ScheduleOverTime from '../components/ScheduleOverTime';
import MultilineTextFields from '../components/TextField';
import ConfigProps from '../interface/ConfigProps';
import "../scss/Overtime.scss";

const OverTime: React.FC<ConfigProps> = () => {

    //將登入資訊存在本地端，重整後不會遺失
    const [config, setConfig] = useState(() => {
        const storedConfig = localStorage.getItem('config');
        return storedConfig ? JSON.parse(storedConfig) : {};
    });

    const { employee_id, work_type } = config;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    //查看請假紀錄，控制table顯示
    const [isLook, setIsLook] = useState(false);
    const [overTimeData, setOverTimeData] = useState([]);
    const [overtimeOptions, setOvertimeOptions] = useState<string[]>([]);

    //時間依班表替換
    const [startDate, setStartDate] = useState<Dayjs>(dayjs());
    const [startHour, setStartHour] = useState<number>(9);
    const [startMinute, setStartMinute] = useState<number>(30);
    const [shouldDisable, setShouldDisable] = useState<boolean>(false);
    //時間依班表替換
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [endHour, setEndHour] = useState<number>(18);
    const [endMinute, setEndMinute] = useState<number>(30);
    //文字
    const workText = "上班日", approvalText = "已審核", unapprovalText = "未審核", reasonTitle = "加班事由 :", holidayText = "例休";
    const calendarTitle1 = "開始日期 :", calendarTitle2 = "結束日期 :", overtimeTypeTitle = "加班類別 :";
    const hourOptions = Array.from({ length: 24 }, (_, i) => (i + 1).toString());
    const TimeOptions = [0, 30];
    const systemTitle = "加班頁面", dialogTitle = "加班確認", record = "查看" + "加班紀錄", dialogBtnName = "送出申請";
    const dialogText = '加班日期為: ' + startDate?.format("YYYY/MM/DD ") + startHour + ":" + startMinute + ' 到 ' + endDate?.format("YYYY/MM/DD ") + endHour + ":" + endMinute;
    const tableHead = ["開始日期", "結束日期", "申請日期", "實際開始", "實際結束", "時數", "主管確認", "刪除", "更新時間"];
    const [workingDay, setWorkingDay] = useState([]);
    const [reasonValue, setReasonValue] = useState<string>('');
    const [overtimeType, setOvertimeType] = useState<string>("國定假");


    useEffect(() => {
        localStorage.setItem('config', JSON.stringify(config));
    }, [config]);

    useEffect(() => {
        ScheduleGetOne(employee_id)
            .then((response: any) => {
                setWorkingDay(response);
            })
            .catch((error: any) => console.error('Error fetching scheduleData:', error));

        OvertimeGetOne(employee_id)
            .then((response) => {
                setOverTimeData(response);
            });
        const a = ["國定假", "排休"];
        setOvertimeOptions(a);
        // ItemOvertimeType()
        //     .then((response) => {
        //         const types = response.map((item: { name: string }) => item.name);
        //         //obj用來對應ID(name => ID)
        //         setOvertimeOption(response);
        //         //array string
        //         setOvertimeOptions(types);
        //     });
    }, [])

    //根據加班開始日期判斷是否能申請，例休不可申請
    useEffect(() => {

        //日期轉換
        const formattedMonth = dayjs(startDate).format("MM");
        const formattedDay = dayjs(startDate).format("DD");
        const disableDate = workingDay.some((wd: any) => {
            return (
                wd.year.toString() === dayjs(startDate).format("YYYY").toString() &&
                wd.month.toString().padStart(2, '0') === formattedMonth &&
                wd[parseInt(formattedDay, 10)] === "+"
            );
        });

        if (disableDate)
            setShouldDisable(true);
        else
            setShouldDisable(false);

    }, [startDate, overTimeData])

    //改時間state
    const handleStartDateChange = (date: Dayjs | null) => {
        if (date === null) setStartDate(dayjs());
        else setStartDate(date)
    };
    const handleStartHourChange = (newValue: string | number) => {
        const parsedValue = typeof newValue === "string" ? parseInt(newValue) : newValue;
        setStartHour(parsedValue);
    };
    const handleStartMinuteChange = (newValue: string | number) => {
        const parsedValue = typeof newValue === "string" ? parseInt(newValue) : newValue;
        setStartMinute(parsedValue);
    };
    const handleEndDateChange = (date: Dayjs | null) => {
        if (date === null) setEndDate(dayjs());
        else setEndDate(date)
    };
    const handleEndHourChange = (newValue: string | number) => {
        const parsedValue = typeof newValue === "string" ? parseInt(newValue) : newValue;
        setEndHour(parsedValue);
    };
    const handleEndMinuteChange = (newValue: string | number) => {
        const parsedValue = typeof newValue === "string" ? parseInt(newValue) : newValue;
        setEndMinute(parsedValue);
    };

    const handleClickDay = (day: Date) => {
        handleScheduleClick(day);
    }

    const handleScheduleClick = (value: Date) => {
        const newStartDate = dayjs(value);
        //結束日期
        const newEndDate = work_type !== undefined ? newStartDate : newStartDate.add(1, 'days');
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    }

    //假別更改
    const handleOvertimeChange = (newValue: string | number) => setOvertimeType(`${newValue}`);

    //TextArea
    const handleReasonChange = (newValue: string) => {
        setReasonValue(newValue);
    };

    //送出確認
    const handleDialogClick = async () => {
        //請多少小時計算(另外寫
        const start_time = startDate.set('hour', startHour).set('minute', startMinute);
        const end_time = endDate.set('hour', endHour).set('minute', endMinute);

        const overtimeHour = endDate
            .set('hour', endHour)
            .set('minute', endMinute)
            .diff(startDate.set('hour', startHour).set('minute', startMinute)) / 1000 / 60 / 60;
        //請多少小時計算(另外寫
        const data = {
            employee_id: employee_id,
            start_time: start_time.add(8, 'hour').toISOString(),
            end_time: end_time.add(8, 'hour').toISOString(), //.add(8, 'hour')
            hours: overtimeHour,
            reason: reasonValue,
            overtime_type_id: 1
        };
        OvertimePost(data)
            .then(() => OvertimeGetOne(employee_id))
            .then((data) => {
                setOverTimeData(data);
                message.success("成功申請");
            })

    }


    //刪除請假資料
    const handleDelete = (id: any) => {

        OvertimeDelete(id).then(() => OvertimeGetOne(employee_id))
            .then((data: any) => setOverTimeData(data))
            .catch((err: any) => console.log(err));;
    }

    //查看請假紀錄
    const lookHandle = async () => {
        const overTimeData = await OvertimeGetOne(employee_id);
        setOverTimeData(overTimeData);
        setIsLook(!isLook);
    }

    return (
        <>
            <Header />
            <div className="container">
                <h2>{systemTitle}</h2>
                <h3 ><Button onClick={lookHandle} variant="outlined" className="record-btn">{record}</Button></h3>
                <div className='five'>
                </div>
            </div>
            {
                isLook ?
                    <div className="table">
                        <DenseTable tableHead={tableHead} data={overTimeData} handleDialogClick={handleDelete} />
                    </div>
                    :
                    <div className="container">

                        <div className="one center">

                            <div className="wrap">
                                <span className="holiday call-icon"></span>
                                <h2>{holidayText}</h2>
                            </div>

                            <div className="wrap">
                                <span className="work call-icon"></span>
                                <h2>{workText}</h2>
                            </div>

                            <div className="wrap">
                                <span className="un-approval call-icon"></span>
                                <h2>{unapprovalText}</h2>
                            </div>

                            <div className="wrap">
                                <span className="approval call-icon"></span>
                                <h2>{approvalText}</h2>
                            </div>
                        </div>

                        <div className="schedule">
                            <ScheduleOverTime workingDay={workingDay} overTimeData={overTimeData} onClickDay={handleClickDay} />
                        </div>

                        <div className="three black">

                            <div className="calendar center">
                                <div className="calendar-header">
                                    <h4>{calendarTitle1}</h4>
                                </div>
                                <div className="calendar-day">
                                    <NewCalendar value={startDate} onChange={handleStartDateChange} />
                                </div>
                                <div className="calendar-time">
                                    <NewNativeSelect Label="時" value={startHour} Options={hourOptions} onChange={handleStartHourChange} />
                                    <NewNativeSelect Label="分" value={startMinute} Options={TimeOptions} onChange={handleStartMinuteChange} />
                                </div>
                            </div>

                            <div className="calendar center">
                                <div className="calendar-header">
                                    <h4>{calendarTitle2}</h4>
                                </div>

                                <div className="calendar-day">
                                    <NewCalendar value={endDate} onChange={handleEndDateChange} />
                                </div>
                                <div className="calendar-time">
                                    <NewNativeSelect Label="時" value={endHour} Options={hourOptions} onChange={handleEndHourChange} />
                                    <NewNativeSelect Label="分" value={endMinute} Options={TimeOptions} onChange={handleEndMinuteChange} />
                                </div>
                            </div>

                            <div className="label-inline">
                                <div className="labelText center">
                                    <h4>{overtimeTypeTitle}</h4>
                                </div>
                                <div className="two">
                                    {/* <NewNativeSelect value={absenceType} Options={absenceOptions} onChange={handleAbsenceChange} Label={""} /> */}
                                    <NewNativeSelect Label="" value={overtimeType} Options={overtimeOptions} onChange={handleOvertimeChange} />

                                    <div className="one right">
                                        <h4>{reasonTitle}</h4>
                                    </div>
                                </div>
                                <div className="two">
                                    <MultilineTextFields rows={5} value={reasonValue} onChange={handleReasonChange} />
                                </div>
                            </div>

                            <div className="calendar center">

                                <SlideDialog dialogTitle={dialogTitle} dialogText={dialogText} btn_name={dialogBtnName}
                                    onClick={handleDialogClick} disabled={shouldDisable ? true : false} />
                            </div>
                        </div>
                    </div>
            }

            <Footer />
        </>
    );
};

export default OverTime;
