const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户的登录状态
    // 如果不是登录用户 请求重定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('./login')
    } else {
        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }
        next();
    }
}
module.exports = guard