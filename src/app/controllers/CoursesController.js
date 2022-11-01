const { mongooseToObject } = require('../../until/mongoose');
const Course = require('../models/Course');

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/stored
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBwYwrOaKarfa87-f5y6U_UtM0Cfg`;

        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
    }

    //[GET] /courses/:slug/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id xóa mềm
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id/force xóa vĩnh viễn
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /courses/handle-form-action
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                if (typeof req.body.coursesIds === 'string') {
                    Course.delete({ _id: req.body.coursesIds })
                        .then(() => res.redirect('back'))
                        .catch(next);
                } else {
                    Course.delete({ _id: { $in: req.body.coursesIds } })
                        .then(() => res.redirect('back'))
                        .catch(next);
                }
                break;
            case 'restore':
                if (typeof req.body.coursesIds === 'string') {
                    Course.restore({ _id: req.body.coursesIds })
                        .then(() => res.redirect('back'))
                        .catch(next);
                } else {
                    Course.restore({ _id: { $in: req.body.coursesIds } })
                        .then(() => res.redirect('back'))
                        .catch(next);
                }
                break;
            case 'delete_forever':
                if (typeof req.body.coursesIds === 'string') {
                    Course.deleteOne({ _id: req.body.coursesIds })
                        .then(() => res.redirect('back'))
                        .catch(next);
                } else {
                    Course.deleteMany({ _id: { $in: req.body.coursesIds } })
                        .then(() => res.redirect('back'))
                        .catch(next);
                }
                break;
            default:
                res.json({ message: 'action is invalid' });
                break;
        }
    }
}

module.exports = new CourseController();
