
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },

  description: {
    type: String,
    required:true
  },

  price: {
    type: Number,
    required:true
  },

  stock: {
    type: Number,
    required:true,
    default: 1
  },

  rating: {
    type: Number,
    required:true,
    default: 0,
  },

  images: [   
    {
      public_id: {
        type: String,
        // required: true,

      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

}, { timestamps: true });


const productModel = mongoose.model('products', productSchema);
module.exports = productModel;