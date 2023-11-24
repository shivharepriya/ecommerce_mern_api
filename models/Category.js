const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    cname: {
        type: String,
        require: true,
    },


    image: {
        public_id: {
            type: String,
            require: true,
        },

        url: {
            type: String,
            require: true,
        },
    },
},
    { timestamps: true }
)
const CategoryModel = mongoose.model('Category', CategorySchema)
module.exports = CategoryModel