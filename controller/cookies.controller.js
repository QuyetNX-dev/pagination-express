module.exports.count = (req, res, next) => {
    res.cookie('demo', 123);
    const count = Object.keys(req.cookies).length;
    console.log(`cookies: ${count}`)
    next()
}