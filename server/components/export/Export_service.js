import { LeaveRecords } from "../../excel/LeaveRecords.js";
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
    // res.json(leaveRecords)
    LeaveRecords(leaveRecords, res)
});


export default { getLeaveRecords, };
