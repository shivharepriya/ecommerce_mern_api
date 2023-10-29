const OrderModel = require('../models/Order')

class OrderController {
    static newOrder = async (req, res) => {
        try {
            console.log(req.body) //getting data in console
            const data = await OrderModel.create(req.body)
            // console.log(data);
            // res.send(data)
            res.status(200).send({
                status: "success",
                message: "Order added successfully",
                data
            })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static getSingleOrder = async (req, res) => {
        try {
            const getSingleOrderdata = await OrderModel.findById(req.params.id)
            // console.log(getSingleOrderdata)
            res.status(200).json({
                success: true,
                getSingleOrderdata,
            });
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    // for user (user can see his oder only after the login)
    static myOrder = async (req, res) => {
        try {


        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    // admin
    static getAllOrder = async (req, res) => {
        try {
            const getALLOrderData = await OrderModel.find()
            // console.log(getProductdata)
            res.status(200).json({
                success: true,
                getALLOrderData,
            });
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static deleteOrder = async (req, res) => {
        try {
            const deleteOrderData = await OrderModel.findByIdAndDelete(req.params.id)
            res.send({
                status: 204,
                message: "deleted successfully",
                deleteOrderData
            })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }

}

module.exports = OrderController