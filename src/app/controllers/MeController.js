const { multiplMongooseToObject } = require('../../until/mongoose');
const Course = require('../models/Course');

class MeController {
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery.sort({ [req.query.column]: req.query.type });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()]) //đếm số lượng courses đã xóa mềm rồi
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multiplMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multiplMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
