const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req, res, next) => {
    const { username, password, email, role, state } = req.body;
    const id = req.query.id;
    let user = await User.findOne({ _id: id })
    if (await bcrypt.compare(password, user.password)) {
        // 更新到数据库
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        res.redirect('/admin/user')
    } else {
        let obj = {
            path: '/admin/user-edit',
            message: '密码比对失败不能进行修改',
            id: id
        }
        next(JSON.stringify(obj));
    }
}