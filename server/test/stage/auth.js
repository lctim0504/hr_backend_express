import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import { incorrect_account, incorrect_password, loginData, login_missing_data, registerData, register_missing_data, registered_test_id, wrong_data_type } from '../datas/auth.js';

describe('-----------Auth2 routes-----------\r\n', function () {
    // Admin
    // POST /auth/register
    describe('POST /auth/register', function () {
        it('創建帳號成功', function (done) {
            request(app)
                .post('/auth/register')
                .send(registerData)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.message).to.equal('註冊成功');
                    done();
                });
        });
        it('帳戶已存在', function (done) {
            request(app)
                .post('/auth/register')
                .send(registerData)
                .expect('Content-Type', /json/)
                .expect(409)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為用戶資料對象
                    expect(res.body.error).to.equal("帳戶已存在");
                    done();
                });
        });
        it('註冊資料不完整', function (done) {
            request(app)
                .post('/auth/register')
                .send(register_missing_data)
                .expect(400, done);
        });
    });

    // POST /auth/login

    describe('POST /auth/login', function () {
        it('登入成功', function (done) {
            request(app)
                .post('/auth/login')
                .send(loginData)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為用戶資料對象
                    expect(res.body).to.have.property('employee_id', loginData.account);
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('work_type');
                    expect(res.body).to.have.property('department_id');

                    // 驗證回傳的 Cookie 中是否包含 JWT_token
                    expect(res.header['set-cookie'][0]).to.include('JWT_token');
                    done();
                });
        });
        it('登入成功，但無員工資料', function (done) {
            request(app)
                .post('/auth/login')
                .send(registerData)
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為用戶資料對象
                    expect(res.body.error).to.equal("無此員工資料");
                    done();
                });
        });
        it('登入失敗，查無此帳號', function (done) {
            request(app)
                .post('/auth/login')
                .send(incorrect_account)
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為用戶資料對象
                    expect(res.body.error).to.equal("無此帳戶資料");
                    done();
                });
        });
        it('登入失敗，密碼不正確', function (done) {
            request(app)
                .post('/auth/login')
                .send(incorrect_password)
                .expect('Content-Type', /json/)
                .expect(404)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為用戶資料對象
                    expect(res.body.error).to.equal("密碼不正確");
                    done();
                });
        });
        it('登入資料不完整', function (done) {
            request(app)
                .post('/auth/login')
                .send(login_missing_data)
                .expect(400, done);
        });
    });
    // DELETE /auth/:id
    describe('DELETE /auth/:id', function () {
        it('刪除帳戶', function (done) {
            request(app)
                .delete(`/auth/${registered_test_id}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為空對象
                    expect(res.body).to.equal('用戶成功刪除');
                    done();
                });
        });
    });
    // POST /user 請求參數缺失
});
