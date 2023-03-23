import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: 'smtp.hibox.biz',
    port: 25,
    secure: false,
    auth: {
        user: 'timlin@dli-memory.com.tw',
        pass: 'Timm0307'
    }
});