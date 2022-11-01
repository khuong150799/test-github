const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxlength: 255 },
        description: { type: String, maxlength: 600 },
        image: { type: String, maxlength: 255 },
        videoId: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    { _id: false, timestamps: true },
);

//plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Course', Course);
