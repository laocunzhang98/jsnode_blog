const { User } = require('../../model/user')

module.exports = async (req, res) => {
    req.app.locals.currentLink = 'user'

    let page = req.query.page || 1;
    // 每一页数据条数
    let pagesize = 1
    let count = await User.countDocuments({})

    let total = Math.ceil(count / pagesize);
    let start = (page - 1) * pagesize;

    let users = await User.find({}).limit(pagesize).skip(start)
    res.render('./admin/user', {
        users: users,
        page: page,
        total: total
    })
}