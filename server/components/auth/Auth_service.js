import { catchError } from "../../common/catchError.js";
import { accountSchema } from "../../schema/Account_schema.js";
import authRepository from "./Auth_repository.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createAuth = catchError(async (req, res) => {
    const registerData = await accountSchema.validateAsync(req.body);

    //檢查帳戶是否存在
    const accountData = await authRepository.checkId(registerData.account);
    if (accountData != null) {
        return res.status(409).json({ error: "帳戶已存在" })
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
    res.status(200).json({ message: "註冊成功" })
});

const getAuth = catchError(async (req, res) => {
    const loginData = await accountSchema.validateAsync(req.body);

    //檢查帳戶是否存在
    const accountData = await authRepository.checkId(loginData.account);
    if (accountData == null) {
        return res.status(404).json({ error: "無此帳戶資料" })
    }
    //檢查密碼是否正確
    const isPasswordCorrect = await bcrypt.compare(loginData.password, accountData.password)
    if (!isPasswordCorrect) {
        return res.status(404).json({ error: "密碼不正確" })
    }
    //取得user資料
    const userData = await authRepository.getUserData(accountData.account);
    if (userData == null) {
        return res.status(404).json({ error: "無此員工資料" })
    }
    //console.log(userData.employee_id + '' + userData.isAdmin);
    //產生一個專屬於這個user的token並回傳到cookie中 (employee_id, isAdmin是要加密的資料)
    const token = jwt.sign({
        employee_id: userData.employee_id,
        isAdmin: userData.isAdmin,
        isSupervisor: userData.isSupervisor
    }, process.env.JWT)
    //console.log(token);
    res.cookie('JWT_token', token, { httpOnly: true })
        .status(200).json(userData)
});

const deleteAccount = catchError(async (req, res) => {
    const id = req.params.id;
    await authRepository.deleteAccount(id);
    res.status(200).json("用戶成功刪除");
});
const deleteBulkAccount = catchError(async (req, res) => {
    const ids = req.query.id;
    console.log(ids);
    await authRepository.deleteBulkAccount(ids);
    res.status(200).json("用戶成功刪除");
});
const getAllAccount = catchError(async (req, res) => {
    const result = await authRepository.getAllAccount();
    res.status(200).json(result);
});

export default { getAuth, createAuth, deleteAccount, getAllAccount, deleteBulkAccount };


