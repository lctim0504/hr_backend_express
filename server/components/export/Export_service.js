import { LeaveRecords } from "../../excel/Leave.js";
import { OvertimeRecords } from "../../excel/Overtime.js";
import exportRepository from "./Export_repository.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getLeaveRecords = catchError(async (req, res) => {
    const leaveRecords = await exportRepository.getLeaveRecords();
    LeaveRecords(leaveRecords, res)
});
const getOvertimeRecords = catchError(async (req, res) => {
    const overtimeRecords = await exportRepository.getOvertimeRecords();
    console.log(overtimeRecords);
    OvertimeRecords(overtimeRecords, res)
});

export default { getOvertimeRecords, getLeaveRecords, };
