module.exports.validateBook = (req, res, next) => {
    let errors = [];

    if(!req.body.title){
        errors.push('Bạn chưa nhập tên cho cuốn sách')
    }
    
    if(!req.body.description){
        errors.push('Bạn chưa nhập mô tả cho cuốn sách')
    }

    if(errors.length){
        console.log(req.body.title === "")
        res.render("book/post", {
            errors: errors,
            values: req.body
        });
        return;
    }
    next()
}