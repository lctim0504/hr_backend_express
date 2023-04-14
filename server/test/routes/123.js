import request from 'supertest'
import app from '../../index.js' // 注意，需要使用相對路徑
import { expect } from 'chai';

describe('starting...', function () {
    it('preparing', function (done) {
        request(app)
            .get('/user')
            .set('Cookie', `JWT_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6InRlc3RBZG1pbiIsImlzQWRtaW4iOnRydWUsImlzU3VwZXJ2aXNvciI6dHJ1ZSwiaWF0IjoxNjgxNDM4MDQ1fQ.6bAx7_k6yNrs7ds3-7bHYD7VHO1WHplLjDLivre0VBI`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});
/*
  -----------Auth routes-----------

    POST /auth/register
      2) 創建帳號成功
      3) 帳戶已存在    
      4) 註冊資料不完整
    POST /auth/login   
      ✔ 登入成功 (208ms)
      5) 登入成功，但無員工資料
      ✔ 登入失敗，查無此帳號 
      6) 登入失敗，密碼不正確
      ✔ 登入資料不完整       
    DELETE /auth/:id
      7) 刪除帳戶

  -----------Item routes-----------

    GET /item/departments
      8) 取得全部部門Id, Name
    GET /item/userIds
      9) 取得全部用戶Id
    GET /item/leavetypes
      10) 取得全部假別Id, Name
    GET /item/supervisor/:dpm
      11) 正確部門id -- 取得對應部門主管
      12) 錯誤部門id -- 無法取得對應部門主管

  -----------Leave routes-----------

    GET /leave
      13) 取得所有請假資料
    GET /leave/:id
      14) 取得指定請假資料
    POST /leave
      15) 新增請假資料
    PUT /leave
      16) 更新假單成功
    DELETE /leave/:id
      17) 刪除假單成功
    GET /leave/filter
      18) 取得部門假單資料成功
      19) 取得員工假單資料成功
      20) 取得假別假單資料成功

  -----------User routes-----------

    GET /user
      21) 取得員工列表
    POST /user
      22) 創建員工資料
      23) 資料參數不完整
      24) 資料型態不符
    GET /user/:id
      25) ID取得員工資料
      26) 員工ID不存在
    PUT /user/:id
      27) ID更新員工資料
    Delete user/:id
      28) ID刪除員工資料

*/