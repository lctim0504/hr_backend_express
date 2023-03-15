import leaveRepository from "./Leave_repository.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const updateLeave = catchError(async (req, res) => {
    console.log(13);

    const id = req.params.id;
    const body = req.body;
    const updatedLeave = await leaveRepository.updateLeave(id, body);
    res.json(updatedLeave);
});

const createLeave = catchError(async (req, res) => {
    const body = req.body;
    const newLeave = await leaveRepository.createLeave(body);
    res.json(newLeave);
});

const deleteLeave = catchError(async (req, res) => {
    const id = req.params.id;
    await leaveRepository.deleteLeave(id);
    res.json("用戶成功刪除");
});

const getLeave = catchError(async (req, res) => {
    const id = req.params.id;
    const getLeave = await leaveRepository.getLeaveById(id);
    res.json(getLeave);
});

const getAllLeaves = catchError(async (req, res) => {
    const getLeaves = await leaveRepository.getAllLeaves();
    res.json(getLeaves);
});

const getDpmLeave = catchError(async (req, res) => {
    const dpm = req.query.dpm;
    const getDpmLeave = await leaveRepository.getDpmLeave(dpm);
    console.log(getDpmLeave);
    res.json(getDpmLeave)
});

export default { updateLeave, deleteLeave, getAllLeaves, getLeave, createLeave, getDpmLeave };
