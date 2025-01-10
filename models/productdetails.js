const mongoose = require('mongoose');

//Product details schema and model

const productDetailSchema = new mongoose.Schema({
  tags: {
    type: String,
    required: false, // Optional field
  },
  image: {
    type: String,
    required: true, // URL of the product image is mandatory
    unique:true,
  },
  playback: {
    type: String,
    required: false, // Optional field
  },
  rating: {
    type: Number,
    required: true,
    min: 0, // Ensuring a valid rating range
    max: 5,
  },
  name: {
    type: String,
    required: true, // Product name is mandatory
    unique:true,
  },
  salePrice: {
    type: Number,
    required: true, // Sale price is mandatory
  },
  offerPrice: {
    type: Number,
    required: true, // Offer price is mandatory
  },
  discount: {
    type: String,
    required: false, // Optional field
  },
  colorAvailableCount: {
    type: Number,
    required: false, // Optional field
    default: 0, // Default value if not provided
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema);

// module.exports = ProductDetail;


//Caegories and images schema and model

const categoriesandimagesschema=new mongoose.Schema({
    image:{
      type:String,
      required:true,
      unique:true,
    },
    name:{
      type:String,
      required:true,
      unique:true,
    }
},{timestamps:true,});

const categoriesandimages=mongoose.model('categoriesandimages',categoriesandimagesschema)

module.exports={categoriesandimages,ProductDetail,};