// mongo library from npm
const MongoClient = require('mongodb').MongoClient;

// table: the tabel you want to insert
// data: can be json or array of json
function deleteUseless() {
    var table = "students"
    const url = "mongodb://localhost:27017/" + table

    // this function takes a url and a callback function
    // after connecting to the url, it will either give an error
    // or a client
    MongoClient.connect(url, (err, client) => {
        if(err) {
            return console.log("Can't connect to db");
        }
        console.log('Connected to db');

        // connect to database 
        const db = client.db('Recom');
        // get table from database or create one
        const coll = db.collection(table);

        coll
        .deleteMany({
            'courses': {'$exists': false}
        })
        .then((result) => {
            console.log(result);
        });
        
        client.close();
    });
}


module.exports.deleteUseless = deleteUseless;