import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';

describe('starting...', function () {
    it('', function (done) {
        request(app)
            .get('/user')
            .expect(200)
            .timeout(1000)
            .end(function (err, res) {
                if (err) return done(err);

                done();
            });
    });
});