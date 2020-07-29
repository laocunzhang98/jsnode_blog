const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')
const config = require('config')
// 导入dateformat
const dateFormat = require('dateformat')
const template = require('art-template')
// 向模板中导入dateformat
template.defaults.imports.dateFormat = dateFormat
// 引入body-parser模块 处理post请求参数
const bodyParser = require('body-parser')
//导入express-session
const session = require('express-session')
// 数据库连接
require('./model/connect')

//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
// 配置session
app.use(session({ secret: 'secret key' }))
//配置模板路径
app.set('views', path.join(__dirname, 'views'));
//模板默认后缀
app.set('view engine', 'art');
//渲染art模板引擎
app.engine('art', require('express-art-template'));
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
// 拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

console.log(config.get('title'))
// 获取系统环境变量
// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境')
    // 在开发环境中 将客户端发送到服务器
    app.use(morgan('dev'))
} else {
    console.log('当前是开发环境')
}

// 为路由匹配路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    const result = JSON.parse(err)
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + "=" + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})
app.listen(80);
console.log('网站服务器启动成功，请访问localhost')
