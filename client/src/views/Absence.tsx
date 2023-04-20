import React, { useEffect, useState } from 'react';
import Header from './partials/header';
import Footer from './partials/footer';
import dayjs, { Dayjs } from 'dayjs';
import { LeaveGetOne, LeavePost, LeaveDelete } from '../app/LeaveApi';
import { ItemLeaveType, ItemLeaveHour } from '../app/ItemApi';
import { ScheduleGetOne } from '../app/ScheduleApi';
import { UserList } from '../app/UserApi';
import { QuotaGetOne } from '../app/QuotaApi';
import NewCalendar from '../components/Calendar';
import SlideDialog from '../components/DiaLog';
import DenseTable from '../components/DenseTable';
import NewNativeSelect from '../components/Select';
import SelectText from '../components/SelectText';
import Schedule from '../components/Schedule';
import MultilineTextFields from '../components/TextField';
import "../scss/Absence.scss";
import ConfigProps from '../interface/ConfigProps';
import { AbsenceOption } from '../interface/Absence';
import { message } from 'antd';
import Button from '@mui/material/Button';

const Absence: React.FC<ConfigProps> = () => {

  //將登入資訊存在本地端，重整後不會遺失
  const [config] = useState(() => {
    const storedConfig = localStorage.getItem('config');
    return storedConfig ? JSON.parse(storedConfig) : {};
  });

  //傳入的值可直接用
  const { employee_id, name, work_type, department_id, work_type_id } = config;
  //查看請假紀錄，控制table顯示
  const [isLook, setIsLook] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [workingDay, setWorkingDay] = useState([]);

  //文字
  const workText = "上班日", approvalText = "已審核", unapprovalText = "未審核", reasonTitle = "請假事由 :", subPreson = "代理人 :";
  const absenceTypeTitle = "假別 : ", remain = "剩餘", hour = "小時";
  const calendarTitle1 = "開始日期 :", calendarTitle2 = "結束日期 :";
  const systemTitle = "請假頁面", hello = name + "您好!", dialogTitle = "請假確認", record = "切換請假紀錄", dialogBtnName = "送出申請";
  const tableHead = ["請假開始日期", "請假結束日期", "申請日期", "請假時數", "主管確認", "刪除"];

  const hourOptions = Array.from({ length: 24 }, (_, i) => (i + 1).toString());
  const TimeOptions = [0, 30];

  const [absenceOptions, setAbsenceOptions] = useState<string[]>([]);
  const [absenceType, setAbsenceType] = useState<string>("事假");
  const [remainHour, setRemainHour] = useState<number>(0);
  const [quota, setQuota] = useState<{ leave_type_id: number, remaining_hours: number }[]>([]);
  const [idList, setIdList] = useState<{ value: string }[]>([]);
  const [reasonValue, setReasonValue] = useState<string>('');
  const [absenceOption, setAbsenceOption] = useState<AbsenceOption | null>({ id: 1, name: '' });
  const [subID, setSubID] = useState<string | null>(null);
  const [shouldDisable, setShouldDisable] = useState<boolean>(false);
  const [startWorkTime, setStartWorkTime] = useState([]);
  const [endWorkTime, setEndWorkTime] = useState([]);
  const [dayHour, setDayHour] = useState(0);

  //時間依班表替換
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [startHour, setStartHour] = useState<number>(9);
  const [startMinute, setStartMinute] = useState<number>(30);
  //時間依班表替換
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [endHour, setEndHour] = useState<number>(18);
  const [endMinute, setEndMinute] = useState<number>(30);
  //dialog根據選擇改變
  const dialogText = '請假日期為: ' + startDate?.format("YYYY/MM/DD ") + startHour + ":" + startMinute + ' 到 ' + endDate?.format("YYYY/MM/DD ") + endHour + ":" + endMinute + "\n 代理人 :" + (subID == null ? "無" : subID);

  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.open({
      type: 'success',
      content: '成功申請',
    });
  };
  //預先load的資料
  useEffect(() => {
    //日曆
    ScheduleGetOne(employee_id)
      .then((response) => {
        setWorkingDay(response);
      });
    //請假資料
    LeaveGetOne(employee_id)
      .then((response) => {
        setLeaveData(response);
      });
    //請假type
    ItemLeaveType()
      .then((response) => {
        const leaveTypes = response.map((item: { name: string }) => item.name);
        //obj用來對應ID(name => ID)
        setAbsenceOption(response);
        //array string
        setAbsenceOptions(leaveTypes);
      });
    //計算工作時間
    ItemLeaveHour(work_type_id)
      .then((res) => {
        const startTime = res.map((item: { start_time: string }) => {
          const start = dayjs(item.start_time).subtract(8, 'hour');
          return start.hour() * 60 + start.minute();
        })
        const endTime = res.map((item: { end_time: string }) => {
          const end = dayjs(item.end_time).subtract(8, 'hour');
          return end.hour() * 60 + end.minute();
        })
        const dayHour = res.map((item: { hours: number }) => item.hours)
          .reduce((acc: any, cur: any) => acc + cur, 0);

        setStartWorkTime(startTime);
        setEndWorkTime(endTime);
        setDayHour(dayHour);
      })
      .catch(error => console.error('Error fetching leaveData:', error)
      );
    //代理人List
    UserList()
      .then((response) => {
        const result = response.map((item: { name: any; }) => ({ value: item.name }))
        setIdList(result)
      })
      .catch(error => console.error('Error fetching SubNamedata:', error)
      );
    //根據班別改預設時間
    if (work_type.length >= 5) {
      setStartHour(parseInt(work_type.substring(2, 4)));
      setStartMinute(work_type.substring(5, 7));
      setEndHour(parseInt(work_type.substring(8, 10)));
      setEndMinute(work_type.substring(11, 13));
      //非1開頭都會跨日
      setEndDate(work_type_id.substring(0, 1) === "1" ? dayjs() : dayjs().add(1, 'day'));
    }
    //得到剩餘quota
    QuotaGetOne(employee_id)
      .then((response) => setQuota(response))
  }, []);

  //根據更換開始日期 or 提交申請後的leavedata判斷
  useEffect(() => {
    //日期轉換
    const formattedDay = dayjs(startDate).format("YYYY-MM-DD");
    const disableDate = leaveData.some((wd: any) => {
      return (
        dayjs(wd.start_time).subtract(8, 'hours').format("YYYY-MM-DD") === formattedDay
      );
    });

    if (disableDate)
      setShouldDisable(true);
    else
      setShouldDisable(false);
  }, [startDate, leaveData])

  //剩餘請假時數
  useEffect(() => {
    if (Array.isArray(absenceOption)) { // 確保absenceOption存在 
      const keys = Object.values(absenceOption.find((item: { name: string; }) => item.name === absenceType)) || 2;
      const res = quota.find(item => item.leave_type_id === keys[0]);
      setRemainHour(res?.remaining_hours || 0);
    }
  }, [absenceType, quota]);

  //查看請假紀錄
  const lookHandle = async () => {
    const leaveData = await LeaveGetOne(employee_id);
    setLeaveData(leaveData);
    setIsLook(!isLook);
  }
  //計算請假時數，轉成分鐘
  const CalculateHour = () => {
    let tempHour = 0;
    // const start_time = parseInt(((startHour) * 60).toString()) + parseInt((startMinute).toString());
    const start_time = parseInt(`${startHour * 60}`) + parseInt(`${startMinute}`);
    const end_time = (() => {
      if (endDate.diff(startDate, 'day') > 0 && (startHour > endHour || (startHour === endHour && startMinute > endMinute))) { // 夜班轉結束時間
        return parseInt((endHour).toString()) * 60 + parseInt((endMinute).toString()) + 24 * 60;
      }
      return parseInt((endHour).toString()) * 60 + parseInt((endMinute).toString());
    })();

    // 判斷開是否為夜班
    const isCrossDay = work_type_id.charAt(0) !== "1";

    for (let i = 0; i < startWorkTime.length; i++) {
      if (isCrossDay) {
        //轉成跨日分鐘計算
        const newEndWorkTime = endWorkTime.map((time) => {
          return time < startWorkTime[0] ? time + 24 * 60 : time;
        });
        const newStartWorkTime = startWorkTime.map((time) => {
          return time < startWorkTime[0] ? time + 24 * 60 : time;
        });

        if (start_time >= newStartWorkTime[i] && end_time >= newStartWorkTime[i])
          tempHour += (newEndWorkTime[i] - start_time);
        else if (start_time <= newStartWorkTime[i] && end_time >= newEndWorkTime[i])
          tempHour += newEndWorkTime[i] - newStartWorkTime[i];
        else if (start_time <= newStartWorkTime[i] && end_time <= newEndWorkTime[i] && end_time >= newStartWorkTime[i])
          tempHour += end_time - newStartWorkTime[i];
        else if (start_time >= newStartWorkTime[i] && end_time <= newEndWorkTime[i])
          tempHour += end_time - start_time;
      }
      //非跨日
      else {
        if (start_time >= startWorkTime[i] && end_time >= endWorkTime[i])
          tempHour += endWorkTime[i] - start_time;
        else if (start_time <= startWorkTime[i] && end_time >= endWorkTime[i])
          tempHour += endWorkTime[i] - startWorkTime[i];
        else if (start_time <= startWorkTime[i] && end_time <= endWorkTime[i] && end_time >= startWorkTime[i])
          tempHour += end_time - startWorkTime[i];
        else if (start_time >= startWorkTime[i] && end_time <= endWorkTime[i])
          tempHour += end_time - start_time;
      }
    }
    //跨日累加每天工時
    if (endDate.diff(startDate, 'day') > 0) {
      tempHour += startHour > endHour ? (endDate.diff(startDate, 'day') - 1) * dayHour * 60 : (endDate.diff(startDate, 'day')) * dayHour * 60;
    }
    return tempHour / 60;
  }
  //假別更改
  const handleAbsenceChange = (newValue: string | number) => setAbsenceType(`${newValue}`);
  //TextArea
  const handleReasonChange = (newValue: string) => setReasonValue(newValue);

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

  const handleSubIDChange = (newValue: string | null) => setSubID(newValue);
  const handleClickDay = (day: Date) => handleScheduleClick(day);
  //傳日期到select
  const handleScheduleClick = (value: Date) => {
    const newStartDate = dayjs(value);
    //結束日期
    const newEndDate = work_type_id.charAt(0) === "1" ? newStartDate : newStartDate.add(1, 'days');
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }
  //送出確認
  const handleDialogClick = async () => {
    //請多少小時計算(另外寫
    const start_time = startDate.set('hour', startHour).set('minute', startMinute);
    const end_time = endDate.set('hour', endHour).set('minute', endMinute);

    const absenceHour = CalculateHour();
    console.log("總共時間:" + absenceHour);

    //leave_type轉成leave_type_id
    const keys = absenceOption != null ? Object.values(absenceOption.find((item: { name: string; }) => item.name === absenceType)) : 2;
    const leaveTypeId = Array.isArray(keys) ? keys[0] as number : 2;
    const data = {
      employee_id: employee_id,
      start_time: start_time.add(8, 'hour').toISOString(),
      end_time: end_time.add(8, 'hour').toISOString(), //.add(8, 'hour')
      hours: absenceHour,
      leave_type_id: leaveTypeId,
      sub_name: subID,
      reason: reasonValue
    };
    // console.log(data);
    //Post請假資料
    LeavePost(data)
      .then(() => LeaveGetOne(employee_id))
      .then((data) => {
        setLeaveData(data);
        info();
      })
      .catch((err) => console.log(err.response.data));
  }
  //刪除請假資料
  const handleDelete = (id: any) => {
    LeaveDelete(id)
      .then(() => LeaveGetOne(employee_id))
      .then((data) => {
        setLeaveData(data)
      })
      .catch((err) => console.log(err));;
  }

  return (
    <>
      <Header />
      {contextHolder}
      <div className="container">
        <div className='one center'>
          <h2>{systemTitle}</h2>
        </div>
        <div className='two'>
          <h2 style={{ marginRight: '10px' }}>{hello}</h2>
          <div className='right'>
            <h3 ><Button onClick={lookHandle} variant="outlined" className="record-btn">{record}</Button></h3>
          </div>
        </div>
        <div className='five left'>
        </div>
      </div>

      {
        isLook ?
          <div className="table">
            <DenseTable tableHead={tableHead} data={leaveData} handleDialogClick={handleDelete} />
          </div>
          :
          <div className="container">

            <div className="one center">

              <div>
                <span className="work call-icon"></span>
                <h2>{workText}</h2>
              </div>

              <div>
                <span className="un-approval call-icon"></span>
                <h2>{unapprovalText}</h2>
              </div>

              <div>
                <span className="approval call-icon"></span>
                <h2>{approvalText}</h2>
              </div>
            </div>

            <div className="schedule">
              <Schedule workingDay={workingDay} leaveData={leaveData} onClickDay={handleClickDay} />
            </div>

            <div className="three black">
              <div className="label-inline">
                <div className="labelText center">
                  <h4>{absenceTypeTitle}</h4>
                </div>
                <div className="labelText">
                  <NewNativeSelect value={absenceType} Options={absenceOptions} onChange={handleAbsenceChange} Label={""} />
                </div>
                <div className="labelText">
                  <h4 className="approval">{remainHour > -1 ? remain + remainHour + hour : null}</h4>
                </div>
                <div className="labelText2">
                  <h4>{subPreson}</h4>
                  <h4><SelectText options={idList} onChange={handleSubIDChange} /></h4>
                </div>
              </div>

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

              <div className="calendar center">
                <div className="calendar-header">
                  <h4>{reasonTitle}</h4>
                </div>
                <div className="two">
                  <MultilineTextFields rows={4} value={reasonValue} onChange={handleReasonChange} />
                </div>
                <div className="two">

                </div>
              </div>

              <div className="button-end">
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

export default Absence;