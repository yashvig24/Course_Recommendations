const {mongoose} = require('../server/db/mongoose');
var {Student} = require('../server/model/student');
const fs = require('fs');
const Papa = require('papaparse');
const path = '/Users/legend/Documents/node/recom/data/';

function addStudents() {
    var filename = 'students_r.csv';
    var csv = fs.readFileSync(path + filename, 'utf-8').trim();
    var json = Papa.parse(csv, {
        header: true,
        dynamicTyping: true
    });
    Student
    .insertMany(json.data)
    .then((students) => {console.log(students)})
    .catch((e) => {
        console.log(e);
    });    
}

addStudents();