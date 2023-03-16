import scheduleRepository from "./Schedule_repository.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const createSchedule = catchError(async (req, res) => {
    const body = req.body;
    const month = body[0].month;

    await scheduleRepository.deleteSchedule(month);

    const newSchedule = await Promise.all(
        body.map(async (schedule) => {
            return await scheduleRepository.createSchedule(schedule);
        })
    );
    //console.log(newSchedule);
    res.json(newSchedule);
});


const getSchedule = catchError(async (req, res) => {
    const id = req.params.id;
    const getSchedule = await scheduleRepository.getScheduleById(id);
    res.json(getSchedule);
});

const getAllSchedules = catchError(async (req, res) => {
    const getSchedules = await scheduleRepository.getAllSchedules();
    res.json(getSchedules);
});

export default { createSchedule, getSchedule, getAllSchedules };
