const db = require('../db')
module.exports.validateUser = (req, res, next) => {
    let error = []
    const users = db.get('users').value();
    let duplicated = users.find(item => {
      return item.email === req.body.email;
    })
    console.log(duplicated)
    if(!req.body.name){
        error.push('bạn chưa nhập tên khách hàng')
    }
    if(!req.body.phone){
        error.push('bạn chưa nhập số điện thoại')
    }
    if(!req.body.email){
        error.push('bạn chưa nhập email')
    }
    if(!req.body.password){
        error.push('bạn chưa nhập password')
    }
    if(req.body.name.length > 30){
        error.push('Tền người dùng không có thật, bạn vui lòng nhập lại')
    }
    if(duplicated){
      error.push('Emai đã tồn tại')
    }
    if(error.length){
        res.render("users/post",{
            error,
            value: req.body
        });
        return;
    }
    next()
}