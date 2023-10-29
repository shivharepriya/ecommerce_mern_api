const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');


const CheckUserAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token)
        // res.send(token)
        if (!token) {
            res.status(401).send({
                'status': 'failed',
                'message': 'Unauthroized user no token'
            })
        }
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log(data)
        // res.send(data)
        req.user = await UserModel.findById(data.userId)
        // console.log(req.user) //in console
        // res.send(req.user) //postmen
        // const user = req.user
        next()
    } catch (err) {
        console.log(err);
    }
}

// adminOnly
const authRoles = (roles) => {
    return (req, res, next) => {
        console.log(roles)
    }
}

module.exports = { CheckUserAuth, authRoles }