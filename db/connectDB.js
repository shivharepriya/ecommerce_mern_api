const mongoose = require('mongoose');

const connectdb = () => {
    return mongoose.connect(process.env.LIVE_URL)
        //for cloud db
        .then(() => {
            console.log('db connection successfully')
        }).catch((error) => {
            console.log(error)
        })
}
module.exports= connectdb