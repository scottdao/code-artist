const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const request = require('request');
const app = express();

var token = {
    "username": "123",
    "password": "123"
}

/**
 * 登陆验证
 */
app.post('/toLogin', function(req, res) {
    var user = req.body;
    request.post({ url: 'http://localhost:8080/user/login', form: { username: user.username, password: user.password } }, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            if (body != null && body != '') {
                var respJson = JSON.parse(body);
                if (respJson.code == 0) {
                    req.session.user = respJson.data;
                    res.send("0");
                } else {
                    req.session.destroy();
                    res.send("用户名或密码错误！");
                }
            } else {
                req.session.destroy();
                res.send("用户名或密码错误！");
            }
        }
    });
});

/**
 * 退出
 */
app.get('/exit', function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = app;