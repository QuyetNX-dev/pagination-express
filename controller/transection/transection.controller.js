const db = require('../../db')
const shortid = require('shortid')

module.exports.index = (req, res) => {
    const userMember = res.locals.user;
    db.get("transection").forEach(item => {  // update lại số thứ tự
        item.stt = db.get("transection").value().length + 1;
    });
    var collectionTransection = db   //chuyển đổi transection
        .get("transection")
        .value()
        .map((item, index) => {
            let bookTransection = db
                .get("todo")
                .value()
                .find(itemBook => {
                    return itemBook.id === item.bookId;
                });
            let userTransection = db
                .get("users")
                .value()
                .find(itemUser => {
                    return itemUser.id === item.userId;
                });

            let obj = {
                stt: index + 1,
                id: item.id,
                userId: item.userId,
                bookId: item.bookId,
                isComplete: item.isComplete,
                title: [bookTransection.title],
                name: userTransection.name
            };
            return obj;
        });
    if(userMember){
        collectionTransection = collectionTransection.filter(item => {
            return item.userId === userMember.id
        })
    }
    res.render("transection/index", {
        collectionTransection,
        titleHeader:'Kê khai giao dịch',
        activeTransection: 'text-primary'
    });
}

module.exports.delete = (req, res) => {
    var id = req.params.id;
    db.get("transection")
        .remove({ id: id })
        .write();
    res.redirect("back");
}

module.exports.create = (req, res) => {
    let users = db.get("users").value()
    const books = db.get("todo").value()
    const userMember = res.locals.user;
    if(userMember){
      users = users.filter(item => {
        return item.id === userMember.id  
      })
    }
    res.render("transection/create", {
        users,
        books
    });
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.stt = db.get("transection").value().length + 1;
    req.body.isComplete = false;
    db.get("transection")
        .push(req.body)
        .write();
    res.redirect("/transection");
}

module.exports.isComplete = (req, res) => {
    res.render('transection/isComplete/isComplete',{
        id: req.params.id 
    })
}

module.exports.updateComplete = (req, res) => {
    const id = req.params.id
    db.get("transection")
        .find({id: id})
        .assign({isComplete : true})
        .write()
    res.redirect('/transection')
}