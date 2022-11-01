const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education', () => {
            console.log('connect seccessfully');
        });
    } catch (error) {
        console.log('connect fail');
    }
}

module.exports = { connect };
