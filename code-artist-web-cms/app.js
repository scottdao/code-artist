const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();

const user = require('./route/user');

app.use(session({
    secret: '123456',
    cookie: { maxAge: 60 * 1000 * 30 },
    resave: false,
    saveUninitialized: true
}));

// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
// 添加静态资源
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'img')));

//登录拦截器
app.use(function(req, res, next) {
    var url = req.originalUrl;
    if (url != "/toLogin" && url != "/" && !req.session.user) {
        return res.redirect("/");
    }
    next();
});
// 在拦截器后添加静态资源
app.use(express.static(path.join(__dirname, 'html')));

app.use('/', user);

app.listen(80);