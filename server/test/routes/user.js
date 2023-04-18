import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';
import jwt from "jsonwebtoken"

describe('\r\n-----------User function test-----------\r\n', function () {

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
                    //console.log(payload);
                })
            });
    });
    it('Get all dpms', function (done) {
        request(app)
            .get(`/item/departments`)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('Get all user ids', function (done) {
        request(app)
            .get(`/item/userIds`)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('Get all leave_type', function (done) {
        request(app)
            .get(`/item/leavetypes`)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('Get leave_type by Id', function (done) {
        let leave_type = '1-4';
        request(app)
            .get(`/item/leavetype/${leave_type}`)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('start_time');
                expect(res.body[0]).to.have.property('end_time');
                expect(res.body[0]).to.have.property('hours');
                done();
            });
    });
    it('Get supervisor by dpm_id', function (done) {
        let leave_type = 'ITS001';
        request(app)
            .get(`/item/supervisor/${leave_type}`)
            .set('Cookie', `JWT_token=${userToken}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.name).to.equal('張鈞傑');
                done();
            });
    });
});

describe('\r\n-----------Auth function test-----------\r\n', function () {

    //--------------------------------------------------------測試資料
    let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6InRlc3RVc2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlzU3VwZXJ2aXNvciI6ZmFsc2UsImlhdCI6MTY4MDg2Mjk5OX0.aoTqY2iwXlgzFs5h7lQAVRFn6W3zN6QH0Xnkv5dGKrU';
    const userAccount = {
        account: 'testUser',
        password: 'testUser'
    }
    //--------------------------------------------------------測試

    it('權限不足 ERROR_403', function (done) {
        request(app)
            .get('/user')
            .set('Cookie', `JWT_token=${userToken}`)
            .expect(403)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('沒登入 ERROR_401', function (done) {
        let userToken = ''
        request(app)
            .get('/user')
            .set('Cookie', `JWT_token=${userToken}`)
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
        process.exit();
    });
});
