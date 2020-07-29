const { User } = require('../../model/user')

module.exports = async (req, res) => {
    let id = req.body.id

    await User.findOneAndDelete({ _id: id })
    res.redirect('/admin/user');
}