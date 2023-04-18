import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { ScheduleOverTimeProps } from '../interface/Components';

const Schedule = ({ workingDay, overTimeData, onClickDay }: ScheduleOverTimeProps & { onClickDay?: (date: Date) => void }) => {

    const isWorkDate = (content: string) => !['*', '+', '&'].includes(content);
    const isHolidayDate = (content: string) => ['+'].includes(content);

    const handleScheduleClick = (value: Date) => {
        if (onClickDay) {
            onClickDay(value);
        }
    };

    const approvalDataObj: Record<string, any> = {}, unApprovalDataObj: Record<string, any> = {};
    overTimeData.forEach((d: any) => {
        const date = new Date(d.start_time);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = (date.getDate()).toString().padStart(2, "0");
        const key = `${year}-${month}-${day}`;

        if (d.sv_permit)
            approvalDataObj[key] = { seq: d.seq, permit_time: d.permit_time };
        else {
            unApprovalDataObj[key] = { seq: d.seq, create_time: d.create_time, start_time: d.start_time };
        }
    });

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        const dateStr = dayjs(date).format('YYYY-MM-DD');
        const approval = approvalDataObj[dateStr];
        const unApproval = unApprovalDataObj[dateStr];
        const date1 = date.getDate().toString();
        const currentMonthWorkingDay = workingDay.find(
            (d: any) =>
                d.month === date.getMonth() + 1 &&
                d.year === date.getFullYear() &&
                d[date1] &&
                isWorkDate(d[date1])
        );
        const currentMonthHoliday = workingDay.find(
            (d: any) =>
                d.month === date.getMonth() + 1 &&
                d.year === date.getFullYear() &&
                d[date1] &&
                isHolidayDate(d[date1])
        );

        let content = <div style={{ position: 'relative', marginTop: '10px' }}><span /></div>;

        switch (view) {
            case 'month':
                if (currentMonthHoliday) {
                    content = (
                        <div
                            style={{ position: 'relative', marginTop: '10px' }}
                            onClick={() => alert('例休不可申請加班')}
                        >
                            <span className='holiday' />
                        </div>
                    );
                } else if (approval) {
                    content = (
                        <div style={{ position: 'relative', marginTop: '10px' }} onClick={() => { }}>
                            <span className={currentMonthWorkingDay ? 'approval-work' : 'approval'} />
                        </div>
                    );
                } else if (unApproval) {
                    content = (
                        <div style={{ position: 'relative', marginTop: '10px' }} onClick={() => { }}>
                            <span className={currentMonthWorkingDay ? 'un-approval-work' : 'un-approval'} />
                        </div>
                    );
                } else if (currentMonthWorkingDay) {
                    content = (
                        <div style={{ position: 'relative', marginTop: '10px' }}>
                            <span className='work circle' />
                        </div>
                    );
                }
                break;
            default:
                break;
        }
        return content;
    };
    return (
        <>
            <div>
                <Calendar tileContent={tileContent} onClickDay={handleScheduleClick} />
                {/* <UploadSchedule /> */}
            </div>
        </>
    );
};

export default Schedule;
