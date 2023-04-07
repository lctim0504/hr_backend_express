import { Sequelize } from "sequelize";
import quotaRepository from "./Quota_repository.js";
import { transporter } from "../../nodemailer.js";
import { now } from "../../common/timeParser.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const createUserQuota = catchError(async (req, res) => {
    const body = req.body;
    const gender = body.female ? 1 : 2;
    const year = new Date().getFullYear()

    //避免重複新增
    const ifQuotaExists = await quotaRepository.getIdLeaveQuota(body.employee_id, year);
    if (ifQuotaExists.length != 0) return res.status(400).json({ error: "今年額度已存在" });

    //抓取初始額度
    const initQuota = await quotaRepository.getLeaveQuota(gender);
    const newQuota = {};
    initQuota.forEach(db => { newQuota[db.id] = db.quota; });
    console.log(newQuota);
    const startDate = body.on_board_date
    const endDate = `${(new Date(body.on_board_date).getFullYear() + 1)}-${new Date(body.on_board_date).getMonth() + 1}-${new Date(body.on_board_date).getDate()}`;

    {//創建每個假別的額度資料
        /*
        id    eId       year     leave_type    remaining_leave    total_leave   ....
        1	1110010	    2023	    2	            14	                9	
        1	1110010	    2023	    9	            9	                5
                                    .
                                    .
                                    .	
        */
    }
    for (const type in newQuota) {
        const remaining_hours = newQuota[type];
        const total_hours = newQuota[type];
        await quotaRepository.createQuota({
            employee_id: body.employee_id,
            year: year,
            leave_type_id: type,
            remaining_hours,
            total_hours,
            leave_start_date: startDate,
            leave_end_date: endDate,
            last_update_time: now,
            create_time: now
        });
    }
    const userQuota = await quotaRepository.getIdLeaveQuota(body.employee_id, new Date().getFullYear());
    res.status(200).json(userQuota);
});

const getUserRemainQuota = catchError(async (req, res) => {
    const id = req.params.id;
    //計算id用戶請假剩餘時數
    const userUsed = await getUserUsedLeave(id, new Date().getFullYear());
    return res.status(200).json(userUsed);
});

const getUserUsedLeave = async (id, year) => {
    //請假額度
    const leavequota = await quotaRepository.getIdLeaveTypeQuota(id, year);
    //console.log(leavequota.map(leave => leave.dataValues));
    //已請時數
    const leaveUsed = await quotaRepository.getLeaveUsed(id, year);
    //console.log(leaveUsed);
    //剩餘時數
    const remainingLeave = leavequota.map(leave => {
        const used = leaveUsed.find(usedLeave => usedLeave.leave_type_id === leave.leave_type_id);
        const total = used ? leave.total_hours - used.total_hours : leave.total_hours;
        return { leave_type_id: leave.leave_type_id, remaining_hours: total };
    });
    //console.log(remainingLeave);
    return remainingLeave;
}

const deleteUserQuota = catchError(async (req, res) => {
    const id = req.params.id;
    await quotaRepository.deleteQuota(id);
    res.json("用戶成功刪除");
});


export default { deleteUserQuota, getUserRemainQuota, createUserQuota, };
