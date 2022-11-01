const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const db = require('../src/config/db');
const route = require('./routes');

//connect to DB
db.connect();

const app = express();
const port = 3000;

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static(path.join(__dirname, 'public'))); //cấu hình cho file tĩnh như img front ...

//http logger
app.use(morgan('combined'));

//middleware custom
const sortMiddleware = require('./app/middleware/SortMiddleware');
app.use(sortMiddleware);

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (files, sort) => {
                const sortType = sort.column === files ? sort.type : 'default'; //chọn trường nào sẽ thực hiện trường đó

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return ` <a href='?_sort&column=${files}&type=${type}'>
                 <i style='color: blue; font-size: 18px;' class='${icon}'></i>
             </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //do cấu hình file views khác, nên phải có đường dẩn vào file views

app.use(bodyParser.urlencoded({ extended: false })); //sử dụng cho method post, dùng để hiển thị dữ liệu người dùng nhập

//ghi đè phương thức post của form bằng phương thức put
app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
