var mongoose = require('mongoose');

// how mongoose handles promises
mongoose.Promise = global.Promise;

//const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/Recom";
const mongoUrl = "mongodb://heroku_bxxsh88c:t2a8n0y2a@ds223812.mlab.com:23812/heroku_bxxsh88c";

mongoose.connect(mongoUrl, { useNewUrlParser: true});

module.exports.mongoose = mongoose;