const {mongoose} = require('../server/db/mongoose');
const {Student} = require('../server/model/student');
const fs = require('fs');

const path = "/Users/legend/Documents/node/recom/data/";

function add(data) {

    Object.keys(data).forEach((item) => {
        var itemNum = parseInt(item);
        Student
        .findOneAndUpdate({
            '_id': itemNum
        }, {
            $set: {
                'courses': data[item]
            }
        }, {new: true})
        .then((updated) => {
            console.log(updated);
        })
        .catch((e) => {
            console.log(e);
        });
    });
}

add(JSON.parse(fs.readFileSync(path + 'student_course.json')));