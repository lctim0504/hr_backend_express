import authRepository from "./Auth_repository.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const createAuth = catchError(async (req, res) => {
    //
});

const getAuth = catchError(async (req, res) => {
    const body = req.body;
    //確認帳號
    const checkId = await authRepository.checkId(body.employee_id);
    if (checkId == null) {
        return res.status(404).json({ error: "Account not found" })
    }
    const checkPassword = await authRepository.checkPassword(body.employee_id, body.password);
    if (checkPassword == null) {
        return res.status(404).json({ error: "Password Incorrect" })
    }
    return res.status(200).json(checkPassword);
});

export default { getAuth, createAuth };
