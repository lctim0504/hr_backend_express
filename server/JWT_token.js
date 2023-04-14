import jwt from "jsonwebtoken"

const JWT_token = (req, res, next, callBackFunction) => {
    const token = req.cookies.JWT_token;//在index.js 使用app.use(cookieParser()) 來抓取
    //console.log(token);
    if (!token) return res.status(401).json({ error: "please login first (no token)" })

    //cookie解碼
    jwt.verify(token, process.env.JWT, (err, payload) => {
        //解碼失敗
        if (err) return res.status(403).json({ error: "invalid token" })
        //解碼成功=>得到一開始sign的 employee_id 與 isAdmin
        req.userData = payload;
        //console.log(payload);
        //調用回調函數
        callBackFunction()
    })
}
export const isUser = (req, res, next) => {
    JWT_token(req, res, next, () => {
        next()
    })
}
export const isAdmin = (req, res, next) => {
    JWT_token(req, res, next, () => {
        //console.log(req.userData);
        if (req.userData.isAdmin) next()
        else res.status(403).json({ error: "you are not admin" })
    })
}
export const isSupervisor = (req, res, next) => {
    JWT_token(req, res, next, () => {
        //console.log(req.userData);
        if (req.userData.isSupervisor) next()
        else res.status(403).json({ error: "you are not supervisor" })
    })
}

