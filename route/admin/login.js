const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email })
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).send('邮件地址或者密码不能为空')
    }
    // console.log(req)
    if (user) {
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            req.session.username = user.username
            req.session.role = user.role
            req.app.locals.userInfo = user;
            if (user.role == 'admin') {
                res.redirect('/admin/user')
            } else{
                res.redirect('/home/')
            }
            
        } else {
            res.status(400).render('admin/err', { msg: '密码错误' })
        }
    } else {
        // 没有查询到该用户
        res.status(400).render('admin/err', { msg: '没有查询到该用户！' })
    }
}
module.exports = login