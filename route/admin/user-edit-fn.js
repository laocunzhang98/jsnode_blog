const Joi = require('joi');
const { User, validateUser } = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res,next) => {
    
    try {
        await validateUser(req.body)
    }
    catch (e) {
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message}))
    }
    let user = await User.findOne({ email: req.body.email })
    // 判断用户是否存在
    if (user) {
        // return res.redirect('./user-edit' + '?message=邮箱地址被占用')
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址被占用'}))
    }
    // 对密码加密
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    await User.create(req.body);
    res.redirect('./user')
}