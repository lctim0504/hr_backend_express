import { catchError } from "../../common/catchError.js";
import itemRepository from "./Item_repository.js";

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

const getOvertimeTypes = catchError(async (req, res) => {
    const result = await itemRepository.getOvertimeTypes();
    res.json(result);
});

const getLeaveTypeDetail = catchError(async (req, res) => {
    const id = req.params.id;
    const result = await itemRepository.getLeaveTypeDetail(id);
    res.json(result);
});

const getDpmSupervisor = catchError(async (req, res) => {
    const department_id = req.params.department_id;
    const result = await itemRepository.getDpmSupervisor(department_id);
    res.json(result);
});

const updateDpmSupervisor = catchError(async (req, res) => {
    const department_id = req.params.department_id;
    const supervisor_id = req.body.employee_id;

    const result = await itemRepository.updateDpmSupervisor(department_id, supervisor_id);
    res.json(result);
});

export default { updateDpmSupervisor, getOvertimeTypes, getLeaveTypeDetail, getDepartments, getUserIds, getLeaveTypes, getDpmSupervisor };
