const shortid = require('shortid')
const db = require('../../db');

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.index = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const users = db.get("users").value();
    const perPage = 3;
    const perPagination = 3;

    if((users.length) % perPage !== 0){
        var totalPages = Math.floor((users.length) / perPage) + 1;
    }else{
        var totalPages = users.length / perPage
    }

    function spreadOut(x){
        var arr=[];
        for(let i = 1; i <= x; i++ ){
            arr.push(i)
        }
        return arr
    }

    function indexPagination(x,arr,index){
        let slicePagination = [];

        if(arr.length % x !== 0){
            var n = Math.floor((arr.length) / x) + 1;
        }else{
            var n = arr.length / x
        }

        for(let i = 1; i <= n; i++){
            var start = (i-1) * x;
            var end = (i-1) * x + x;
            slicePagination.push([start,end]) 
        }

        let itemSlicePagination = slicePagination.find(item => {
            return item[0] <= index && item[1] >= index
        })

        return arr.slice(itemSlicePagination[0], itemSlicePagination[1])
    }

    const collectionPages = spreadOut(totalPages);

    const pagination = indexPagination(perPagination, collectionPages, page);

    const start = (page - 1) * perPage;
    const end = page * perPage;
    
    db.get("users")
        .forEach((item, index) => {
        item.stt = index + 1;
        })
        .write();

    res.render("users/index", {
        users: users.slice(start, end),
        titleHeader: 'Danh sách khách hàng',
        activeUsers: 'text-primary',
        page,
        totalPages,
        pagination
    });
}

module.exports.delete = (req, res) => {
    let id = req.params.id;
    res.render("users/delete", {
        id
    });
}

module.exports.deleteOk = (req, res) => {
    var id = req.params.id;
    db.get("users")
        .remove({ id: id })
        .write();
    db.get("transection")
        .remove({ userId: id })
        .write();
    res.redirect("/users");
}

module.exports.create =  (req, res) => {
    res.render("users/post", {});
}

module.exports.postCreate = (req, res) => {
    req.body.stt = db.get("users").value().length + 1;
    req.body.id = shortid.generate();
    req.body.isAdmin = false;
    req.body. wrongLoginCount = 0;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash;
        db.get("users")
            .push(req.body)
            .write();
        res.redirect("/users");
    });
}

module.exports.update = (req, res) => {
    let id = req.params.id;
    let isUser = db
        .get("users")
        .find({ id: id })
        .value();
    res.render("users/update", {
        id, isUser
    });
}

module.exports.updateDone = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        db.get("users")
            .find({ id: id })
            .assign({ 
              name: name,
              phone: req.body.phone,
              email: req.body.email,
              password: hash
            })
            .write();
        res.redirect("/users");
    });
}