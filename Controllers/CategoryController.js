const CategoryModel = require('../models/Category');

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'desy4zkbm',
    api_key: '112322991571153',
    api_secret: 'y4Lp1Gc6UyOX6At32lUdAisTXiA',
});

class CategoryController {

    static categoryInsert = async (req, res) => {
        try {
            const { cname, image } = req.body
            const file = req.files.image
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'categoryimageEcommApi'
            })
            const result = new CategoryModel({
                cname: cname,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                },
            })
            await result.save()
            res.status(201).json({
                status: "success",
                message: "Category Inserted successfully 😃🍻"
            })
        } catch (error) {
            console.log(error)
        }
    }

    static categoryDisplay = async (req, res) => {
        try {
            const category = await CategoryModel.find()
            //console.log(category);
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                category,
            })
        } catch (error) {
            console.log(error)
        }
    }

    static categoryUpdate = async (req, res) => {
        try {
            if (req.files) {
                // console.log(req.params.id)
                const { cname, image } = req.body
                const category = await CategoryModel.findById(req.params.id)
                const imageid = category.image.public_id
                //console.log(imageid);
                await cloudinary.uploader.destroy(imageid)
                const file = req.files.image
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'categoryimageEcommApi'
                });
                var categoryData = {
                    cname:cname, // cname: req.body.cname,  // we can Add this line if cname needs to be updated with image
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url,
                    }
                }
            } else {
                var categoryData = {
                    cname: req.body.cname
                }
            }
            const updateCategoryData = await CategoryModel.findByIdAndUpdate(req.params.id, categoryData)
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                updateCategoryData,
            })
        } catch (error) {
            console.log(error)
        }
    }

    static categoryView = async (req, res) => {
        try {
            //console.log(req.params.id);
            const category = await CategoryModel.findById(req.params.id)
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                category,
            })
        } catch (error) {
            console.log(error)
        }
    }

    static categoryDelete = async (req, res) => {
        try {
            await CategoryModel.findByIdAndDelete(req.params.id)
            res.status(201).json({
                status:'success',
                message:'Delete Successfully',
            })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = CategoryController                                       