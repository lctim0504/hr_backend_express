import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import { leave_test_data, permit_test_data, test_department_id, test_employee_id, test_leave_type_id } from '../datas/leave.js';

let test_seq = '';
describe('-----------Leave routes-----------\r\n', function () {
    // GET / 
    describe('GET /leave', function () {
        it('取得所有請假資料', function (done) {
            request(app)
                .get('/leave')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // GET /:id 
    describe('GET /leave/:id ', function () {
        it('取得指定請假資料', function (done) {
            request(app)
                .get(`/leave/${test_employee_id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('seq');
                    done();
                });
        });
    });

    // POST / 
    describe('POST /leave  ', function () {
        it('新增請假資料', function (done) {
            request(app)
                .post('/leave')
                .send(leave_test_data)
                .expect('Content-Type', /json/)
                .expect(200)
                .timeout(5000)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('seq');
                    test_seq = res.body.seq;
                    done();
                });
        });
    });

    // PUT /leave
    describe('PUT /leave', function () {
        it('更新假單成功', function (done) {
            const temp_data = permit_test_data;
            temp_data.seq = test_seq;
            request(app)
                .put('/leave/')
                .send(temp_data)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為更新後的假單對象
                    expect(res.body.sv_permit).to.equal(true);
                    expect(res.body.hr_permit).to.equal(true);
                    done();
                });
        });
    });

    // DELETE /leave/:id
    describe('DELETE /leave/:id', function () {
        it('刪除假單成功', function (done) {
            request(app)
                .delete(`/leave/${test_seq}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.equal('用戶成功刪除');
                    done();
                });
        });
    });

    // GET /leave/filter
    describe('GET /leave/filter', function () {
        it('取得部門假單資料成功', function (done) {
            request(app)
                .get(`/leave/filter?department_id=${test_department_id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否符合預期格式
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
        it('取得員工假單資料成功', function (done) {
            request(app)
                .get(`/leave/filter?employee_id=${test_employee_id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否符合預期格式
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('employee_id', test_employee_id.toString());
                    done();
                });
        });
        it('取得假別假單資料成功', function (done) {
            request(app)
                .get(`/leave/filter?leave_type_id=${test_leave_type_id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否符合預期格式
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('leave_type_id', test_leave_type_id);
                    done();
                });
        });
    });
});


