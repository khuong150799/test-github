module.exports = {
    multiplMongooseToObject: (mongooses) => mongooses.map((mongoose) => mongoose.toObject()), //toObject chuyển từ document của mongoose sang 1 object như bình thường
    mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
