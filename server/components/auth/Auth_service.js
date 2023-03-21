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
    console.log(req.cookies);
    //確認帳號
    const checkId = await authRepository.checkId(body.account);
    if (checkId == null) {
        return res.status(404).json({ error: "Account not found" })
    }
    const response = await authRepository.checkPassword(body.account, body.password);
    if (response == null) {
        return res.status(404).json({ error: "Password Incorrect" })
    }
    const userData = await authRepository.getUserData(response.account);
    if (userData == null) {
        return res.status(404).json({ error: "Employee Data not found" })
    }
    return res.status(200).json(userData);
});

export default { getAuth, createAuth };
