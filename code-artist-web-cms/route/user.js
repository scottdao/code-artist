const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();

/**
 * GET：登陆页面
 * POST：提交登陆
 */
app.route('/login')
    .get(function(req, res) {
        res.redirect("/");
    }).post(function(req, res) {
        var user = req.body;
        req.session.user = user;
        res.redirect("/toMain");
    });

/**
 * 主页面
 */
app.get('/toMain', function(req, res) {
    res.redirect("/main.html");
});

/**
 * 退出
 */
app.get('/exit', function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = app;