import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { ScheduleProps } from '../interface/Components';



const Schedule = ({ workingDay, leaveData, onClickDay }: ScheduleProps & { onClickDay?: (date: Date) => void }) => {

    const isWorkDate = (content: string) => !['*', '+', '&'].includes(content);

    const handleScheduleClick = (value: Date) => {
        if (onClickDay) {
            onClickDay(value);
        }
    };

    const approvalDataObj: Record<string, any> = {}, unApprovalDataObj: Record<string, any> = {};
    leaveData.forEach((d: any) => {
        const startDate = new Date(d.start_time);
        const endDate = new Date(d.end_time);
        const startLocalTime = startDate.getTime() - (startDate.getTimezoneOffset() * 60 * 1000) - (16 * 60 * 60 * 1000);
        const endLocalTime = endDate.getTime() - (endDate.getTimezoneOffset() * 60 * 1000) - (16 * 60 * 60 * 1000);
        const startLocalDate = new Date(startLocalTime);
        const endLocalDate = new Date(endLocalTime);
        const startYear = startLocalDate.getFullYear().toString();
        const startMonth = (startLocalDate.getMonth() + 1).toString().padStart(2, "0");
        const startDay = (startLocalDate.getDate()).toString().padStart(2, "0");
        const endYear = endLocalDate.getFullYear().toString();
        const endMonth = (endLocalDate.getMonth() + 1).toString().padStart(2, "0");
        const endDay = (endLocalDate.getDate()).toString().padStart(2, "0");
        const startDateStr = `${startYear}-${startMonth}-${startDay}`;
        const endDateStr = `${endYear}-${endMonth}-${endDay}`;

        // If the start and end dates are the same, use a single key
        if (startDateStr === endDateStr) {
            const key = startDateStr;
            if (d.sv_permit) {
                if (!approvalDataObj[key]) {
                    approvalDataObj[key] = [];
                }
                approvalDataObj[key].push({ seq: d.seq, permit_time: d.permit_time });
            } else {
                if (!unApprovalDataObj[key]) {
                    unApprovalDataObj[key] = [];
                }
                unApprovalDataObj[key].push({ seq: d.seq, create_time: d.create_time, start_time: d.start_time });
            }
        } else {
            // If the start and end dates are different, loop through the dates and add each one to the object
            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const key = dayjs(currentDate).subtract(8, 'hour').format("YYYY-MM-DD");
                if (d.sv_permit) {
                    if (!approvalDataObj[key]) {
                        approvalDataObj[key] = [];
                    }
                    approvalDataObj[key].push({ seq: d.seq, permit_time: d.permit_time });
                } else {
                    if (!unApprovalDataObj[key]) {
                        unApprovalDataObj[key] = [];
                    }
                    unApprovalDataObj[key].push({ seq: d.seq, create_time: d.create_time, start_time: d.start_time });
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    });

    const tileContent = ({ date, view }: { date: Date; view: string }) => {

        const dateStr = dayjs(date).format("YYYY-MM-DD");
        const approval = approvalDataObj[dateStr];

        const unApproval = unApprovalDataObj[dateStr];

        //當下日曆天數
        const date1 = date.getDate().toString();

        //年月日都相同，用find找出，isWork篩掉非上班代號
        const currentMonthWorkingDay = workingDay.find(
            (d: any) => d.month === date.getMonth() + 1 && d.year === date.getFullYear() && d[date1] && isWorkDate(d[date1])
        );

        if (approval && currentMonthWorkingDay && view === "month") {
            return (
                <div
                    style={{ position: "relative", marginTop: "10px" }}
                // onClick={() => {
                //     var date = new Date(approval.permit_time);
                //     var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
                //     alert(formattedDate + " 已核准");
                // }}
                >
                    <span className="approval-work" />
                </div>
            );
        }
        else if (unApproval && currentMonthWorkingDay && view === "month") {
            return (
                <div
                    style={{ position: "relative", marginTop: "10px" }}
                // onClick={() => {
                //     var date = new Date(approval.permit_time);
                //     var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
                //     alert(formattedDate + " 已核准");
                // }}
                >
                    <span className="un-approval-work" />
                </div>
            );
        }
        else if (approval && view === "month") {
            return (
                <div
                    style={{ position: "relative", marginTop: "10px" }}
                // onClick={() => {
                //     var date = new Date(approval.permit_time);
                //     var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
                //     alert(formattedDate + " 已核准");
                // }}
                >
                    <span className="approval" />
                </div>
            );
        }
        else if (unApproval && view === "month") {

            return (
                <div
                    style={{ position: "relative", marginTop: "10px" }}
                // onClick={() => {
                //     var date = new Date(unApproval.create_time);
                //     var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
                //     alert("已於" + formattedDate + "申請，還未通過")
                // }}
                >
                    <span className="un-approval" />
                </div>
            );
        }
        else if (currentMonthWorkingDay && view === "month") {
            // const content = currentMonthWorkingDay[date1];
            return (
                <div style={{ position: "relative", marginTop: "10px" }}>
                    <span className="work circle" />
                </div>
            );
        }

        return (
            <div style={{ position: "relative", marginTop: "10px" }}>
                <span />
            </div>
        );
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
