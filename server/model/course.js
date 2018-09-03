var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var courseSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    dept_abbrev: {
        type: String,
        // required: true,
        trim: true
    }, 
    course_number: {
        type: Number,
        // required: true
    }, 
    course_credits: {
        type: Number,
        // required: true
    },
    title: {
        type: String,
        trim: true
    }, 
    desc: {
        type: String,
        trim: true,
        default: ""
    },
    INS: {
        type: Boolean, 
        default: 0
    },
    VLPA: {
        type: Boolean, 
        default: 0
    },
    DIV: {
        type: Boolean, 
        default: 0
    },
    W: {
        type: Boolean, 
        default: 0
    },
    QSR: {
        type: Boolean, 
        default: 0
    },
    NW: {
        type: Boolean, 
        default: 0
    }, 
    hash: {
        type: Number
    },
    fullName: {
        type: String
    }
}); 

courseSchema
.pre('save', function(next) {
    var dept = this.dept_abbrev;
    var dept = dept.split(" ").join('');
    this.fullName = this.dept_abbrev + " " + this.course_number + ": " + this.Title;
    next();   
});

var Course = mongoose.model('Course', courseSchema);


module.exports.Course = Course;