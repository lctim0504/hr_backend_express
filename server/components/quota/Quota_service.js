import { Sequelize } from "sequelize";
import quotaRepository from "./Quota_repository.js";
import { transporter } from "../../nodemailer.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const updateUserQuota = catchError(async (req, res) => {
    // const body = req.body;

    // const updatedQuota = await quotaRepository.updateQuota(body.seq, body);
    // res.json(updatedQuota);
});

const createUserQuota = catchError(async (req, res) => {
    const body = req.body;

    //抓取初始額度
    const initQuota = await quotaRepository.getLeaveQuota();
    const newQuota = {};
    initQuota.forEach(db => {
        if (body.female !== false) {
            newQuota[db.id] = db.gender != 'male' ? db.quota : 0;
        } else if (body.female !== true) {
            newQuota[db.id] = db.gender != 'female' ? db.quota : 0;
        }
    });
    newQuota.employee_id = body.employee_id;
    newQuota.on_board_date = Sequelize.literal(`Cast('${body.on_board_date}' as datetime)`);
    //創建使用者額度資料
    const newUserQuota = await quotaRepository.createQuota(newQuota);
    res.json(newUserQuota);
});

const getUserRemainQuota = catchError(async (req, res) => {
    const id = req.params.id;
    //計算id用戶請假剩餘時數
    const result = await getUserUsedLeave(id);
    return res.status(200).json(result);
});

const getUserUsedLeave = async (id) => {
    //取得請假額度
    const leavequota = await quotaRepository.getIdLeaveQuota(id);
    //計算今年已請假時數
    const today = new Date();
    const yearStart = new Date(today.getFullYear(), 0, 1).toISOString().slice(0, 19).replace('T', ' ');;
    const yearEnd = new Date(today.getFullYear(), 11, 31).toISOString().slice(0, 19).replace('T', ' ');;
    const startOfYear = Sequelize.literal(`Cast('${yearStart}' as datetime)`);
    const endOfYear = Sequelize.literal(`Cast('${yearEnd}' as datetime)`);
    const leaveUsed = await quotaRepository.getLeaveUsed(id, startOfYear, endOfYear);
    //計算今年剩餘時數
    const result = leaveUsed.map(item => {
        const remain_hours = leavequota[item.leave_type_id.toString()] - item.total_hours;
        // console.log(leavequota[item.leave_type_id.toString()]);
        // console.log('--------------------------------------');
        // console.log(item.total_hours);
        return { leave_type_id: item.leave_type_id, remain_hours };
    });
    //console.log(result);
    return result;
}
const deleteUserQuota = catchError(async (req, res) => {
    const id = req.params.id;
    await quotaRepository.deleteQuota(id);
    res.json("用戶成功刪除");
});

// const getQuota = catchError(async (req, res) => {
//     //     const id = req.params.id;
//     //     const getQuota = await quotaRepository.getQuotaById(id);
//     //     res.json(getQuota);
// });

const getAllQuotas = catchError(async (req, res) => {
    //     const getQuotas = await quotaRepository.getAllQuotas();
    //     res.json(getQuotas);
});

const getFilterQuota = catchError(async (req, res) => {
    //     const params = {
    //         department_id: req.query.department_id,
    //         employee_id: req.query.employee_id,
    //         quota_type_id: req.query.quota_type_id,
    //     };
    //     console.log(params);
    //     const getFilterQuota = await quotaRepository.getFilterQuota(params);
    //     res.json(getFilterQuota)
});

export default { updateUserQuota, deleteUserQuota, getAllQuotas, getUserRemainQuota, createUserQuota, getFilterQuota };
