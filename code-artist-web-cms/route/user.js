const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
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
    if (user.username == token.username && user.password == token.password) {
        req.session.user = user;
        res.send("0");
    } else {
        req.session.destroy();
        res.send("用户名或密码错误！");
    }
})

/**
 * 退出
 */
app.get('/exit', function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = app;