const Joi = require('joi');

// 定义验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证！'))
    

};


async function run() {
    try{
        await Joi.validate({username:11},schema)
    } catch(e){
        console.log(e)
        return;
    }
    console.log('通过')
}
run();