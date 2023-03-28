import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import { create_user_data, errorformat_user_data, impossible_id, missing_user_data, test_user_id, update_user_data } from '../datas/users.js';

// 定義測試案例
describe('-----------User routes-----------\r\n', function () {
    // 定義測試用例
    // GET /user
    describe('GET /user', function () {
        it('取得員工列表', function (done) {
            // 使用 supertest 發送 HTTP GET 請求到 /user 路由
            request(app)
                .get('/user')
                .expect('Content-Type', /json/)// 驗證回傳的內容類型是否為 JSON 格式
                .expect(200)// 驗證回傳的 HTTP 狀態碼是否為 200
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');// 驗證回傳的數據是否為陣列
                    done();
                });
        });
    });
    // POST /user
    describe('POST /user', function () {
        it('創建員工資料', function (done) {
            request(app)
                .post('/user')
                .send(create_user_data)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.name).to.equal(create_user_data.name);// 驗證回傳的數據是否為新增的用戶對象
                    done();
                });
        });
        it('資料參數不完整', function (done) {
            request(app)
                .post('/user')
                .send(missing_user_data)
                .expect(400, done);
        });
        it('資料型態不符', function (done) {
            request(app)
                .post('/user')
                .send(errorformat_user_data)
                .expect(400, done);
        });
    });
    // GET /user/:id
    describe('GET /user/:id', function () {
        it('ID取得員工資料', function (done) {
            request(app)
                .get(`/user/${test_user_id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為指定的用戶對象
                    expect(res.body.employee_id).to.equal(test_user_id);
                    done();
                });
        });
        it('員工ID不存在', function (done) {
            request(app)
                .get(`/user/${impossible_id}`)
                .expect(404, done);
        });
    });
    //PUT /user/:id
    describe('PUT /user/:id', function () {
        it('ID更新員工資料', function (done) {
            request(app)
                .put(`/user/${test_user_id}`)
                .send(update_user_data)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為更新後的用戶對象
                    expect(res.body.employee_id).to.equal(test_user_id);
                    expect(res.body.name).to.equal(update_user_data.name);
                    done();
                });
        });
    });
    // Delete user/:id
    describe('Delete user/:id', function () {
        it('ID刪除員工資料', function (done) {
            request(app)
                .delete(`/user/${test_user_id}`)
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });
});