const {mongoose} = require('../server/db/mongoose');
var {Course} = require('../server/model/course');
const fs = require('fs');
const Papa = require('papaparse');
const path = '/Users/legend/Documents/node/recom/data/';

function putCourses() {
    var csv = fs.readFileSync(path + 'courses_r.csv', 'utf-8').trim();
    var json = Papa.parse(csv, {
        header: true,
        dynamicTyping: true
    });
    Course
    .insertMany(json.data)
    .then((courses) => {console.log(courses)})
    .catch((e) => {
        console.log(e);
    }); 
}

putCourses();