import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import jwt from "jsonwebtoken"
import { leave_test_data, permit_test_data, test_department_id, test_employee_id, test_leave_type_id } from '../datas/leave.js';
import { overtime_permit_data, overtime_test_data } from '../datas/overtime.js';

describe('\r\n-----------Admin function test-----------\r\n', function () {

    //--------------------------------------------------------測試資料
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6InRlc3RBZG1pbiIsImlzQWRtaW4iOnRydWUsImlzU3VwZXJ2aXNvciI6dHJ1ZSwiaWF0IjoxNjgxNDM4MDQ1fQ.6bAx7_k6yNrs7ds3-7bHYD7VHO1WHplLjDLivre0VBI';
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
    const newSvId = {
        employee_id: "1110010"
    }
    describe('', function () {
        it('prepared !', function (done) {
            request(app)
                .get('/')
                .end(function (err, res) {
                    if (err) return done(err);
                    jwt.verify(adminToken, process.env.JWT, (err, payload) => {
                        //解碼失敗
                        if (err) return res.status(403).json({ error: "invalid token" })
                        //解碼成功=>得到一開始sign的 employee_id 與 isAdmin
                        //console.log(payload);
                    })
                    done();
                });
        });
    });
    //--------------------------------------------------------測試
    describe('\r\n-----------Account-----------', function () {

        it('delete帳戶資料', function (done) {
            request(app)
                .delete(`/auth/${adminAccount.account}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否為空對象
                    expect(res.body).to.equal('用戶成功刪除');
                    done();
                });
        });

        it('delete員工資料', function (done) {
            request(app)
                .delete(`/user/${adminAccount.account}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('create帳戶資料', function (done) {
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

        it('create員工資料', function (done) {
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

        it('登入', function (done) {
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
    describe('\r\n-----------Leave-----------', function () {
        let test_seq = '';
        it('Get all data', function (done) {
            request(app)
                .get('/leave')
                .expect('Content-Type', /json/)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
        it('Get data by Id', function (done) {
            request(app)
                .get(`/leave/${test_employee_id}`)
                .expect('Content-Type', /json/)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
        it('Create data ', function (done) {
            request(app)
                .post('/leave')
                .send(leave_test_data)
                .expect('Content-Type', /json/)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('seq');
                    test_seq = res.body.seq;
                    done();
                });
        });
        it('Update data by seq', function (done) {
            request(app)
                .put(`/leave/${test_seq}`)
                .send(permit_test_data)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('seq');
                    done();
                });
        });
        it('Delete data by seq', function (done) {
            request(app)
                .delete(`/leave/${test_seq}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.equal('資料成功刪除');
                    done();
                });
        });
        it('Get By Dpm', function (done) {
            request(app)
                .get(`/leave/filter?department_id=${test_department_id}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
        it('Get By Type', function (done) {
            request(app)
                .get(`/leave/filter?leave_type_id=${test_leave_type_id}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否符合預期格式
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
        it('Get By Type & Id', function (done) {
            request(app)
                .get(`/leave/filter?leave_type_id=${test_leave_type_id}&employee_id=${test_employee_id}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    // 驗證回傳的數據是否符合預期格式
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
    describe('\r\n-----------Overtime-----------', function () {
        let test_seq = '';
        it('Get all', function (done) {
            request(app)
                .get('/overtime')
                .expect('Content-Type', /json/)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('Get By Id', function (done) {
            request(app)
                .get(`/overtime/${test_employee_id}`)
                .expect('Content-Type', /json/)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('Post', function (done) {
            request(app)
                .post('/overtime')
                .send(overtime_test_data)
                .expect('Content-Type', /json/)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('seq');
                    test_seq = res.body.seq;
                    done();
                });
        });

        it('Put', function (done) {
            request(app)
                .put(`/overtime/${test_seq}`)
                .send(overtime_permit_data)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('seq');
                    done();
                });
        });

        it('Delete', function (done) {
            request(app)
                .delete(`/overtime/${test_seq}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.equal('資料成功刪除');
                    done();
                });
        });

        it('Get By Dpm', function (done) {
            request(app)
                .get(`/overtime/filter?department_id=${test_department_id}`)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
    describe('\r\n-----------Item-----------', function () {
        it('Update sv by dpm_id', function (done) {
            let dpm_id = 'TEST001';
            request(app)
                .put(`/item/department/${dpm_id}`)
                .send(newSvId)
                .set('Cookie', `JWT_token=${adminToken}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.id).to.equal(dpm_id);
                    done();
                });
        });
    });
});
