// 创建用户集合
const monsoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')
// 
const userSchema = new monsoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength:10
    },
    email: {
        type: String,
        // 保证不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        // 0 启用 1 禁用
        default:0
    }
})
// 创建集合
const User = monsoose.model('User', userSchema);
async function createUser () {
	const salt = await bcrypt.genSalt(10);
	const pass = await bcrypt.hash('www7581501', salt);
	const user = await User.create({
		username: '王伟',
		email: '782984630@qq.com',
		password: pass,
		role: 'admin',
		state: 0
	});
}
// createUser();


//验证用户信息
const validateUser = (user)=>{
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名长度在2-12位之间')),
        email: Joi.string().email().required().error(new Error('邮箱格式不正确！')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,20}$/).required().error(new Error('密码长度在6-20位之间')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    }
    return Joi.validate(user, schema)
}

// 导出用户集合
module.exports = {
    User: User,
    validateUser:validateUser
}