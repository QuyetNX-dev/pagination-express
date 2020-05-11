
const db = require('../../db')
const shortid = require('shortid')

module.exports.index = (req, res) => {
    db.get("todo")
        .forEach((item, index) => {
        item.stt = index + 1;
        })
        .write();
    res.render("book/index", {
        todos: db.get("todo").value(),
        titleHeader: 'Sách hay của tôi',
        activeBook: 'text-primary'
    })
}

module.exports.delete = (req, res) => {
    let id = req.params.id;
    res.render("book/delete", {
        id
    });
};

module.exports.deleteOk = (req, res) => {
    var id = req.params.id;
    db.get("todo")
        .remove({ id: id })
        .write();
    db.get("transection")
        .remove({ bookId: id })
        .write();
    res.redirect("/book");
};

module.exports.post = (req, res) => {
    res.render("book/post", {});
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.stt = db.get("todo").value().length + 1;
    db.get("todo")
        .push(req.body)
        .write();
    res.redirect("/book");
}

module.exports.update = (req, res) => {
    let id = req.params.id;
    let isBook = db
        .get("todo")
        .find({ id: id })
        .value();
    res.render("book/update", {
        id,
        title: isBook.title,
        description: isBook.description
    });
}

module.exports.updateDone = (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    db.get("todo")
        .find({ id: id })
        .assign({ title, description })
        .write();
    res.redirect("/book");
}