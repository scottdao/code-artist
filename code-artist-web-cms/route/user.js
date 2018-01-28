const express = require('express');
const session = require('express-session');
const request = require('request');
const log4js = require('log4js');
const app = express();

const config = require('../config/global');
const log4j = require('../config/log4j');

log4js.configure(log4j);
const logger = log4js.getLogger('user');

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
 * 修改个人资料
 */
app.post('/toEdit', function(req, res) {
    var loginUser = req.session.user;
    var user = req.body;
    var userJson = JSON.stringify(loginUser);
    var paramJson = JSON.stringify(user);
    if (user.password != '' && user.opassword != loginUser.password) {
        res.send("100");
    } else {
        request.post({ url: config.API_BASE_URL + '/user/editUser', form: { userJson: userJson, paramJson: paramJson } }, function(err, resp, body) {
            if (!err && resp.statusCode == 200) {
                var respJson = JSON.parse(body);
                if (respJson.code == config.HTTP_SUCCESS) {
                    if (user.password != '' || user.username != loginUser.username) {
                        res.send("200");
                    } else {
                        loginUser.realname = user.realname;
                        loginUser.phone = user.phone;
                        loginUser.address = user.address;
                        res.send(respJson.data);
                    }
                } else {
                    res.send(config.HTTP_ERROR);
                }
            } else {
                console.error(resp.statusCode);
                res.send(config.HTTP_ERROR);
            }
        });
    }
});

/**
 * 获取当前登陆管理员信息
 */
app.post('/showLogin', function(req, res) {
    res.send(req.session.user);
});

/**
 * 退出
 */
app.get('/exit', function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

/**
 * user接口中间件
 * 前端ajax的POST请求直接访问后端的接口
 */
app.post('/user/*', function(req, res) {
    var userJson = JSON.stringify(req.session.user);
    var paramJson = JSON.stringify(req.body);
    logger.info(paramJson);
    request.post({ url: config.API_BASE_URL + req.path, form: { userJson: userJson, paramJson: paramJson } }, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var respJson = JSON.parse(body);
            if (respJson.code == config.HTTP_SUCCESS) {
                res.send(respJson.data);
            } else {
                res.send(config.HTTP_ERROR);
            }
        } else {
            logger.error(resp.statusCode);
            res.send(resp.HTTP_ERROR);
        }
    });
});

module.exports = app;