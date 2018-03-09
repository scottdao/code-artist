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
app.post('/login', (req, res) => {
    let user = req.body;
    request.post({ url: config.API_BASE_URL + '/user/login', form: { username: user.username, password: user.password } }, (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
            let respJson = JSON.parse(body);
            if (respJson.code == config.HTTP_SUCCESS) {
                req.session.user = respJson.data;
                res.send(config.HTTP_SUCCESS);
            } else {
                req.session.destroy();
                res.send("用户名或密码错误！");
            }
        } else {
            logger.error(__filename + ':29', resp.statusCode);
            res.send(config.HTTP_ERROR);
        }
    });
});

/**
 * 修改个人资料
 */
app.post('/toEdit', (req, res) => {
    let [user, loginUser] = [req.body, req.session.user];
    let [userJson, paramJson] = [JSON.stringify(loginUser), JSON.stringify(user)];
    if (user.password != '' && user.opassword != loginUser.password) {
        res.send("100");
    } else {
        request.post({ url: config.API_BASE_URL + '/user/editUser', form: { userJson: userJson, paramJson: paramJson } }, (err, resp, body) => {
            if (!err && resp.statusCode == 200) {
                let respJson = JSON.parse(body);
                if (respJson.code == config.HTTP_SUCCESS) {
                    if (user.password != '' || user.username != loginUser.username) {
                        res.send("200");
                    } else {
                        [loginUser.realname, loginUser.phone, loginUser.address] = [user.realname, user.phone, user.address];
                        res.send(respJson.data);
                    }
                } else {
                    res.send(config.HTTP_ERROR);
                }
            } else {
                logger.error(__filename + ':58', resp.statusCode);
                res.send(config.HTTP_ERROR);
            }
        });
    }
});

/**
 * 获取当前登陆管理员信息
 */
app.post('/showLogin', (req, res) => {
    res.send(req.session.user);
});

/**
 * 退出
 */
app.get('/exit', (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

/**
 * user接口中间件
 * 前端ajax的POST请求直接访问后端的接口
 */
app.route('/*')
    .all((req, res, next) => {
        logger.info(__filename + ':86', req.path);
        next();
    })
    .get((req, res) => {
        request.get({ url: config.API_BASE_URL + req.path }, (err, resp, body) => {
            if (!err && resp.statusCode == 200) {
                let respJson = JSON.parse(body);
                if (respJson.code == config.HTTP_SUCCESS) {
                    res.send(respJson.data);
                } else {
                    res.send(config.HTTP_ERROR);
                }
            } else {
                logger.error(__filename + ':99', resp.statusCode);
                res.send(resp.HTTP_ERROR);
            }
        });
    })
    .post((req, res) => {
        let [userJson, paramJson] = [JSON.stringify(req.session.user), JSON.stringify(req.body)];
        logger.info(__filename + ':106', paramJson);
        request.post({ url: config.API_BASE_URL + req.path, form: { userJson: userJson, paramJson: paramJson } }, (err, resp, body) => {
            if (!err && resp.statusCode == 200) {
                let respJson = JSON.parse(body);
                if (respJson.code == config.HTTP_SUCCESS) {
                    res.send(respJson.data);
                } else {
                    res.send(config.HTTP_ERROR);
                }
            } else {
                logger.error(__filename + ':116', resp.statusCode);
                res.send(resp.HTTP_ERROR);
            }
        });
    });

module.exports = app;