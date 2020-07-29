const formidable = require('formidable');
const path = require('path')
const { Article } = require('../../model/article')
module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置上传文件存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件后缀
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async (err, fiedls, files) => {
        // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
        // 2.fields 对象类型 保存普通表单数据
        // 3.files 对象类型 保存了和上传文件相关的数据
        // console.log(files.cover.path.split('public')[1])
        // res.send(fiedls)
        await Article.create({
            title: fiedls.title,
            author: fiedls.author,
            publishDate: fiedls.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fiedls.content
        })
        res.redirect('/admin/article');
    })
    // res.send('ok')
}