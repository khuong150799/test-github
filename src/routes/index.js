const newsRouter = require('./news');
const meRouter = require('./me');
const courseRouter = require('./course');
const siteRouter = require('./site');

function route(app) {
    app.use('/course', courseRouter);
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
