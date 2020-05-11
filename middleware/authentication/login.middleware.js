const db = require('../../db.js')
module.exports.validateLogin = (req, res, next) => {

    if(!req.signedCookies.userId){
        res.redirect('/login');
        return
    }
    const user = db
                .get('users')
                .find({
                    id: req.signedCookies.userId
                })
                .value()
    if(!user){
        res.redirect('/login');
        return
    }
    if(user.isAdmin === false){
        res.locals.userMember = user;
        next();
        return;
    }
    if(user.isAdmin === true){
        res.locals.userAdmin = user;
        next()
    }

}

module.exports.UnauthMember = (req, res, next) => {
    const userMember = res.locals.userMember
    if(!userMember){
      next();
      return
    }
    if(user.isAdmin === false){
        res.send('Bạn không có quyền truy cập')
        return
    }
}


module.exports.authAdmin = (req, res) => {

}