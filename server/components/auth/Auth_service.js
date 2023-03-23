import Account from "../../model/Account_model.js";
import authRepository from "./Auth_repository.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const createAuth = catchError(async (req, res) => {
    const registerData = req.body;

    //檢查帳戶是否存在
    const accountData = await authRepository.checkId(registerData.account);
    if (accountData != null) {
        return res.status(404).json({ error: "Account existed" })
    }
    //將密碼Hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(registerData.password, salt);
    const newUser = {
        account: registerData.account,
        password: hash,
    }
    //創建資料後回傳
    const newUserData = await authRepository.createAuth(newUser);
    res.status(200).json(newUserData)
});

const getAuth = catchError(async (req, res) => {
    const loginData = req.body;
    //檢查帳戶是否存在
    const accountData = await authRepository.checkId(loginData.account);
    if (accountData == null) {
        return res.status(404).json({ error: "Account not found" })
    }
    //檢查密碼是否正確
    const isPasswordCorrect = await bcrypt.compare(loginData.password, accountData.password)
    if (!isPasswordCorrect) {
        return res.status(404).json({ error: "password Incorrect" })
    }
    //取得user資料
    const userData = await authRepository.getUserData(accountData.account);
    if (userData == null) {
        return res.status(404).json({ error: "Employee Data not found" })
    }
    //產生一個專屬於這個user的token並回傳到cookie中 (employee_id, isAdmin是要加密的資料)
    const token = jwt.sign({ employee_id: userData.employee_id, isAdmin: userData.isAdmin }, process.env.JWT)
    res.cookie('JWT_token', token, { httpOnly: true })
        .status(200).json(userData)
});

const deleteAccount = catchError(async (req, res) => {
    const id = req.params.id;
    await authRepository.deleteAccount(id);
    res.json("用戶成功刪除");
});
export default { getAuth, createAuth, deleteAccount };
