import itemRepository from "./Item_repository.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getDepartments = catchError(async (req, res) => {
    const result = await itemRepository.getDepartments();
    res.json(result);
});

const getUserIds = catchError(async (req, res) => {
    const result = await itemRepository.getUserIds();
    res.json(result);
});

const getLeaveTypes = catchError(async (req, res) => {
    const result = await itemRepository.getLeaveTypes();
    res.json(result);
});

const getLeaveTypeDetail = catchError(async (req, res) => {
    const id = req.params.id;
    const result = await itemRepository.getLeaveTypeDetail(id);
    res.json(result);
});

const getDpmSupervisor = catchError(async (req, res) => {
    const dpm = req.params.dpm;
    const result = await itemRepository.getDpmSupervisor(dpm);
    res.json(result);
});

export default { getLeaveTypeDetail, getDepartments, getUserIds, getLeaveTypes, getDpmSupervisor };
