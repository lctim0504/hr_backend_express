import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑

describe('GET /user', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

