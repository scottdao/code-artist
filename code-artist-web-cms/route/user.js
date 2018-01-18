const express = require('express');
const session = require('express-session');
const request = require('request');
const app = express();

const config = require('../config/global');

/**
 * 登陆验证
 */
app.post('/toLogin', function(req, res) {
    var user = req.body;
    request.post({ url: config.API_BASE_URL + '/user/login', form: { username: user.username, password: user.password } }, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var respJson = JSON.parse(body);
            if (respJson.code == config.HTTP_SUCCESS) {
                req.session.user = respJson.data;
                res.send(config.HTTP_SUCCESS);
            } else {
                req.session.destroy();
                res.send("用户名或密码错误！");
            }
        } else {
            console.error(resp.statusCode);
            res.send(config.HTTP_ERROR);
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
 * 显示菜单
 */
app.post('/showMenu', function(req, res) {
    request.post({ url: config.API_BASE_URL + '/user/showMenu', form: { userId: req.session.user.id } }, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var respJson = JSON.parse(body);
            if (respJson.code == config.HTTP_SUCCESS) {
                res.send(respJson.data);
            } else {
                res.send(config.HTTP_ERROR);
            }
        } else {
            console.error(resp.statusCode);
            res.send(config.HTTP_ERROR);
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

/**
 * 显示管理员用户
 */
app.post('/showAdmins', function(req, res) {
    request.post({ url: config.API_BASE_URL + "/user/showUserList", form: req.session.user }, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var respJson = JSON.parse(body);
            if (respJson.code == config.HTTP_SUCCESS) {
                res.send(respJson.data);
            } else {
                res.send(config.HTTP_ERROR);
            }
        } else {
            console.error(resp.statusCode);
            res.send(resp.HTTP_ERROR);
        }
    });
});

/**
 * user接口中间件
 * 前端ajax的POST请求直接访问后端的接口
 */
app.post('/user/*', function(req, res) {
    request.post({ url: config.API_BASE_URL + req.path, form: req.body }, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var respJson = JSON.parse(body);
            if (respJson.code == config.HTTP_SUCCESS) {
                res.send(respJson.data);
            } else {
                res.send(config.HTTP_ERROR);
            }
        } else {
            console.error(resp.statusCode);
            res.send(resp.HTTP_ERROR);
        }
    });
});

module.exports = app;