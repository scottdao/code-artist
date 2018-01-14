const express = require('express');
const session = require('express-session');
const request = require('request');
const app = express();

/**
 * 登陆验证
 */
app.post('/toLogin', function(req, res) {
    var user = req.body;
    request.post({ url: 'http://localhost:8080/user/login', form: { username: user.username, password: user.password } }, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var respJson = JSON.parse(body);
            console.log(respJson);
            if (respJson.code == 0) {
                req.session.user = respJson.data;
                res.send("0");
            } else {
                req.session.destroy();
                res.send("用户名或密码错误！");
            }
        }
    });
});

/**
 * 在主页面显示当前登陆管理员
 */
app.post('/showLogin', function(req, res) {
    res.send(req.session.user.realname);
});

/**
 * 退出
 */
app.get('/exit', function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = app;