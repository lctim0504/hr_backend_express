import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import { loginData, registerData, test_registered_id } from '../datas/auth.js';

describe('Auth routes', function () {
    // 定義測試用例
    // POST /auth/register
    it('should create a new account', function (done) {

        request(app)
            .post('/auth/register')
            .send(registerData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // 驗證回傳的數據是否為新增的帳號對象
                expect(res.body.account).to.equal(registerData.account);
                done();
            });
    });
    // POST /auth/login
    it('should login with correct credentials', function (done) {
        request(app)
            .post('/auth/login')
            .send(loginData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // 驗證回傳的數據是否為用戶資料對象
                expect(res.body.account).to.equal(loginData.account);
                // 驗證回傳的 Cookie 中是否包含 JWT_token
                expect(res.header['set-cookie'][0]).to.include('JWT_token');
                done();
            });
    });
    // DELETE /auth/:id
    it('should delete an account by ID', function (done) {
        request(app)
            .delete(`/auth/${test_registered_id}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // 驗證回傳的數據是否為空對象
                expect(res.body).to.equal('用戶成功刪除');
                done();
            });
    });
});
