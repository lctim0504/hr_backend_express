import request from 'supertest';
import app from '../../index.js';
import { expect } from 'chai';

describe('-----------Item routes-----------\r\n', function () {
    describe('GET /item/departments', function () {
        it('取得全部部門Id, Name', function (done) {
            request(app)
                .get('/item/departments')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('id');
                    expect(res.body[0]).to.have.property('name');
                    done();
                });
        });
    });

    describe('GET /item/userIds', function () {
        it('取得全部用戶Id', function (done) {
            request(app)
                .get('/item/userIds')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('employee_id');
                    done();
                });
        });
    });

    describe('GET /item/leavetypes', function () {
        it('取得全部假別Id, Name', function (done) {
            request(app)
                .get('/item/leavetypes')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('id');
                    expect(res.body[0]).to.have.property('name');
                    done();
                });
        });
    });

    describe('GET /item/supervisor/:dpm', function () {
        it('正確部門id -- 取得對應部門主管', function (done) {
            request(app)
                .get('/item/supervisor/ITS001')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('name');
                    done();
                });
        });
        it('錯誤部門id -- 無法取得對應部門主管', function (done) {
            request(app)
                .get('/item/supervisor/991234')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('name', null);
                    done();
                });
        });
    });

});
