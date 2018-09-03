var mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    _id: {
        type: Number,
        required: true
    },
    Major1: {
        type: String,
        required: true
    },
    Major2: {
        type: String,
        default: null
    }, 
    Major3: {
        type: String,
        default: null
    },
    courses: {
        type: [Number],
        default: []
    }
}); 

module.exports.Student = Student;