const db = require("../db");

module.exports.server = (req, res) => {
    res.render("myFibrary",{
        titleHeader: 'Thư viện của tôi'
    });
}