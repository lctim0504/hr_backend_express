import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import jwt from "jsonwebtoken"

describe('-----------User function test-----------\r\n', function () {

    //--------------------------------------------------------測試資料
    let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlzU3VwZXJ2aXNvciI6ZmFsc2UsImlhdCI6MTY4MDg2Mjk5OX0.aoTqY2iwXlgzFs5h7lQAVRFn6W3zN6QH0Xnkv5dGKrU';
    const userAccount = {
        account: 'testUser',
        password: 'testUser'
    }
    const userData = {
        employee_id: 'testUser',
        name: 'testUser',
        department_id: 'ITS001',
        work_type_id: '1-1',
        isSupervisor: false,
        isAdmin: false
    }
    //--------------------------------------------------------測試

    it('delete帳戶資料 403', function (done) {
        request(app)
            .delete(`/auth/${userAccount.account}`)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect(403)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('delete員工資料 403', function (done) {
        request(app)
            .delete(`/user/${userAccount.account}`)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect(403)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('create帳戶資料 403', function (done) {
        request(app)
            .post('/auth/register')
            .set('Cookie', `JWT_token=${userToken}`)
            .send(userAccount)
            .expect('Content-Type', /json/)
            .expect(403)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('create員工資料 403', function (done) {
        request(app)
            .post('/user')
            .send(userData)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect('Content-Type', /json/)
            .expect(403)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('User 登入', function (done) {
        request(app)
            .post('/auth/login')
            .send(userAccount)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // 驗證回傳的 Cookie 中是否包含 JWT_token
                expect(res.header['set-cookie'][0]).to.include('JWT_token');
                done();
                const userToken = res.header['set-cookie'][0];
                const JWT_token = userToken.split(';')[0].split('=')[1];
                // 驗證回傳的數據是否為空對象
                jwt.verify(JWT_token, process.env.JWT, (err, payload) => {
                    //解碼成功=>得到一開始sign的 employee_id 與 isAdmin
                    console.log(payload);
                })
            });
    });
});
