import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import jwt from "jsonwebtoken"

describe('-----------Admin function test-----------\r\n', function () {

    //--------------------------------------------------------測試資料
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6IjExMTAwMTAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODA3NzMxOTR9.oujh8rg4WHPnJmh8Rfyf_UGjVfv_6m0-OTikEto1IXk';
    const adminAccount = {
        account: 'testAdmin',
        password: 'testAdmin'
    }
    const adminData = {
        employee_id: 'testAdmin',
        name: 'testAdmin',
        department_id: 'ITS001',
        work_type_id: '1-1',
        isSupervisor: true,
        isAdmin: true
    }
    //--------------------------------------------------------測試

    it('Admin delete帳戶資料', function (done) {
        request(app)
            .delete(`/auth/${adminAccount.account}`)
            .set('Cookie', `JWT_token=${adminToken}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                jwt.verify(adminToken, process.env.JWT, (err, payload) => {
                    //解碼失敗
                    if (err) return res.status(403).json({ error: "invalid token" })
                    //解碼成功=>得到一開始sign的 employee_id 與 isAdmin
                    console.log(payload);
                })
                // 驗證回傳的數據是否為空對象
                expect(res.body).to.equal('用戶成功刪除');
                done();
            });
    });

    it('Admin delete員工資料', function (done) {
        request(app)
            .delete(`/user/${adminAccount.account}`)
            .set('Cookie', `JWT_token=${adminToken}`)
            .expect(204)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Admin create帳戶資料', function (done) {
        request(app)
            .post('/auth/register')
            .set('Cookie', `JWT_token=${adminToken}`)
            .send(adminAccount)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.message).to.equal('註冊成功');
                done();
            });
    });

    it('Admin create員工資料', function (done) {
        request(app)
            .post('/user')
            .send(adminData)
            .set('Cookie', `JWT_token=${adminToken}`)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.name).to.equal(adminData.name);// 驗證回傳的數據是否為新增的用戶對象
                done();
            });
    });

    it('Admin 登入', function (done) {
        request(app)
            .post('/auth/login')
            .send(adminAccount)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // 驗證回傳的 Cookie 中是否包含 JWT_token
                expect(res.header['set-cookie'][0]).to.include('JWT_token');
                // adminToken = res.header['set-cookie'][0]
                // console.log(adminToken);
                done();
            });
    });
});
