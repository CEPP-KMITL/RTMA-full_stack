"use strict";
exports.__esModule = true;
var authProtect = function (req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.status(400).json({
            message: 'Fail to perform this action ' + ' : ' + 'Unauthorised access'
        });
    }
    next();
};
module.exports = authProtect;
