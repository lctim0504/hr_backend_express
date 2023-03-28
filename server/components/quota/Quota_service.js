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

const updateQuota = catchError(async (req, res) => {
    // const body = req.body;
    // body.permit_time = Sequelize.literal(`Cast('${body.permit_time}' as datetime)`);

    // const updatedQuota = await quotaRepository.updateQuota(body.seq, body);
    // res.json(updatedQuota);
});

const createQuota = catchError(async (req, res) => {
    const body = req.body;

    const initQuota = await quotaRepository.getLeaveQuota();//抓取初始額度
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

    const newUserQuota = await quotaRepository.createQuota(newQuota);
    res.json(newUserQuota);
});

const getQuota = catchError(async (req, res) => {
    const id = req.params.id;
    //取得初始扣打
    const leavequota = await quotaRepository.getIdLeaveQuota(id);
    const date1 = Sequelize.literal(`Cast('${'2022-01-01'}' as datetime)`);
    const date2 = Sequelize.literal(`Cast('${'2022-12-31'}' as datetime)`);
    //計算請假時數
    const leaveUsed = await quotaRepository.getLeaveUsed(id, date1, date2);
    // console.log(leavequota);
    // console.log('--------------------------------------');
    // console.log(leaveUsed);
    const result = leaveUsed.map(item => {
        const diff = leavequota[item.leave_type_id.toString()] - item.total_hours;
        // console.log(leavequota[item.leave_type_id.toString()]);
        // console.log('--------------------------------------');
        // console.log(item.total_hours);
        return { leave_type_id: item.leave_type_id, diff };
    });
    return res.status(200).json(result);
});

const deleteQuota = catchError(async (req, res) => {
    //     const id = req.params.id;
    //     await quotaRepository.deleteQuota(id);
    //     res.json("用戶成功刪除");
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

export default { updateQuota, deleteQuota, getAllQuotas, getQuota, createQuota, getFilterQuota };
