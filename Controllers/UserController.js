const UserModel = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'desy4zkbm',
    api_key: '112322991571153',
    api_secret: 'y4Lp1Gc6UyOX6At32lUdAisTXiA',
});


class UserController {

    static registerUser = async (req, res) => {
        // console.log(req.body)
        console.log(req.files.avatar);
        try {
            const userimages = req.files.avatar //getting avatar from postmen vese him input se lete the.
            const userImage_upload = await cloudinary.uploader.upload(userimages.tempFilePath, {
                folder: 'User_Avatar'
            })
            // console.log(req.body)
            const { name, email, password, confirm_password } = req.body;
            const user = await UserModel.findOne({ email: email })
            if (user) {
                res.json({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
            }
            else {
                if (name && email && password && confirm_password) {
                    if (password === confirm_password) {

                        try {
                            const hashpassword = await bcrypt.hash(password, 10)
                            const result = await UserModel({
                                name: name,
                                email: email,
                                password: hashpassword,
                                confirm_password: hashpassword,
                                avatar: {
                                    public_id: userImage_upload.public_id,
                                    url: userImage_upload.secure_url,
                                },
                            })
                            await result.save()
                            res
                                .status(201) //create
                                .json({ status: 201, message: "User Registration Successfully 😃🍻" });

                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        res.json({ status: 400, message: "Password and confirm password does not match😓" });
                    }
                } else {
                    res.json({ status: "failed", message: "All Fields are required😓" });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    static loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            // console.log(password)
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                // console.log(user.password)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password, user.password)
                    if ((user.email === email) && isMatched) {
                        // verify token
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                        res.cookie('token', token)
                        // console.log(token)
                        res
                            .status(201) //create
                            .send({ status: "success", message: "Login Successfully with web Token😃🍻", "token": token });

                    } else {
                        res.send({ status: "failed", message: "ᴇᴍᴀɪʟ or password is not valid😓" });
                    }
                } else {
                    res.send({ status: "failed", message: "You are not a Registerd User😓" });
                }
            } else {
                res.send({ status: "failed", message: "All fields are required😓" });
            }
        } catch (err) {
            console.log(err)
        }
    }

    static updatePassword = async (req, res) => {
        // console.log(req.user)
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body

            if (oldPassword && newPassword && confirmPassword) {
                const user = await UserModel.findById(req.user.id);
                const isMatch = await bcrypt.compare(oldPassword, user.password)
                //const isPasswordMatched = await userModel.comparePassword(req.body.oldPassword);
                if (!isMatch) {
                    res.send({ "status": 400, "message": "Old password is incorrect" })
                } else {
                    if (newPassword !== confirmPassword) {
                        res.send({ "status": "failed", "message": "password does not match" })
                    } else {
                        const salt = await bcrypt.genSalt(10)
                        const newHashPassword = await bcrypt.hash(newPassword, salt)
                        //console.log(req.user)
                        await UserModel.findByIdAndUpdate(req.user.id, { $set: { password: newHashPassword } })
                        res.send({ "status": "success", "message": "Password changed succesfully" })
                    }
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" })
            }

        } catch (err) {
            res.send(err)
            console.log(err)
        }
    }

    static updateProfile = async (req, res) => {
        try {
            // console.log(req.body);
            // const {avatar} = req.body // for now we dont need this
            const updateimage = await UserModel.findById(req.user.id)
            // console.log(updateimage); // full data we'r getting
            const imageId = updateimage.avatar.public_id;
            // console.log(imageId); // isse User_Avatar/q1iirbawf0csjlbojfex yeh get hota h.
            await cloudinary.uploader.destroy(imageId); //delete image then update
            const Blogimages = req.files.avatar;
            const blogImage_upload = await cloudinary.uploader.upload(Blogimages.tempFilePath, {
                folder: 'User_Avatar',
            });
            const update = await UserModel.findByIdAndUpdate(req.user.id, {
                avatar: {
                    public_id: blogImage_upload.public_id,
                    url: blogImage_upload.secure_url,
                },
            })
            await update.save()
            res.send({
                "status": "success",
                "message": "upadate succesfully 😃🍻",
                update,
                avatar: blogImage_upload.secure_url,
            })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static View = async (req, res) => {

        const view = await UserModel.findById(req.params.id)
        res.status(200).json({
            success: true,
            view,
        });
    }

    static logoutUser = async (req, res) => {
        try {
            const logout = await UserModel.findById(req.params.id)
            res.clearCookie('token')
            res.send({ status: "success", message: "logout successfull 😃🍻", logout});
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    


    // AdminOnly

    static getAllUser = async (req, res) => {
        try {
            const getalluserData = await UserModel.find()
            res.status(200).json({
                success: true,
                getalluserData
            })
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    }

    static getSingleUser = async (req, res) => {
        try {
            const getSingleUserData = await UserModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                getSingleUserData
            })
        } catch (err) {
            res.send(err)
            console.log(err);
        }
    }

    static updateUserRole = async (req, res) => {
        try {

        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const deleteRegisterUser = await UserModel.findByIdAndDelete(req.params.id)
            res.send({
                status: 204,
                message: "Deleted successfully",
                deleteRegisterUser
            })
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    }
}

module.exports = UserController