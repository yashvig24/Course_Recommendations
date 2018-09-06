var mongoose = require('mongoose');

// how mongoose handles promises
mongoose.Promise = global.Promise;

//const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/Recom";
const mongoUrl = "mongodb://heroku_s8qg5dhm:heroku_s8qg5dhm@ds247830.mlab.com:47830/heroku_s8qg5dhm";
async function connect() {
    return mongoose.connect(mongoUrl, { useNewUrlParser: true})
}

module.exports.mongoose = mongoose;
module.exports.connect = connect;