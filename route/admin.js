const express = require('express')
// 创建博客展示页面
const admin = express.Router();
admin.get('/login',require('./admin/loginPage'))
// 二级路由
admin.post('/login', require('./admin/login'));
// 创建用户列表路由
admin.get('/user', require('./admin/userPage'))
admin.get('/logout', require('./admin/logout'))
admin.get('/user-edit', require('./admin/user-edit'))
// 创建添加用户路由功能
admin.post('/user-edit', require('./admin/user-edit-fn'))
admin.post('/user-modify', require('./admin/user-modify'))
admin.post('/delete', require('./admin/user-delete'))
// 文章列表页路由
admin.get('/article', require('./admin/article'))
admin.get('/article-edit',require('./admin/article-edit'))
admin.post('/article-add',require('./admin/article-add'))
module.exports = admin;