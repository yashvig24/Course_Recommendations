const fs = require('fs');
const input = require('./input.js');
const Papa = require('papaparse');
const pcl = require('./putCourseList');
const del = require('./deleteUserless');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const path = '/Users/legend/Documents/node/recom/data/'

// get csv file
// var students_csv = fs.readFileSync(path + "students_r.csv", 'utf-8').trim();
// var json = JSON.parse(fs.readFileSync(path + "student_courselist.json", 'utf-8').trim());

function insertToDatabase(csvfilename, endpoint) {
    try {
        var csv = fs.readFileSync(path + csvfilename, 'utf-8').trim();

        var json = Papa.parse(csv, {
            header: true,
            dynamicTyping: true
        });

        json.data.forEach(function(item) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://stark-mountain-17519.herokuapp.com/' + endpoint, false);

            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {//Call a function when the state changes.
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    console.log(xhr.responseText);
                }
            }
            xhr.send(JSON.stringify(item)); 
        });
    }
    catch(error) {
        console.log(error);
    }
}

var files = fs.readdirSync('/Users/legend/Documents/node/recom/data/students');
insertToDatabase('students/' + files[480], 'addStudent');
    

// input.connect("courses", json.data);
// console.log(json.data);
// upload json to mongo db
// pcl.add(json);
// del.deleteUseless();