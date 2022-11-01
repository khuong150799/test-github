//dùng để chứa các trang như home, search, contact...

const { multiplMongooseToObject } = require('../../until/mongoose');
const Course = require('../models/Course');

class SiteController {
    //get /
    home(req, res, next) {
        Course.find({})
            // .then((course) => res.json(course))
            .then((courses) => res.render('home', { courses: multiplMongooseToObject(courses) }))
            .catch(next); //next là 1 function xử lý báo lỗi
    }
}

module.exports = new SiteController();
