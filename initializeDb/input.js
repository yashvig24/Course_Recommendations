// mongo library from npm
const MongoClient = require('mongodb').MongoClient;

// table: the tabel you want to insert
// data: can be json or array of json
function connect(table, data) {
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

        if(Array.isArray(data)) {
            console.log('data is in array form');
            coll
            .insertMany(data, (err, result) => {
                if(err)
                    return console.log('unable to insert: ' + err);
                console.log(JSON.stringify(result.ops, undefined, 2))
            });
        }
        else {
            console.log('data is in json form');
            coll
            .insertOne({
                data
            }, (err, result) => {
                if(err)
                    return console.log('unable to insert');
                console.log(JSON.stringify(result.ops, undefined, 2))
            });
        }

        // client.close();
    });
}


module.exports.connect = connect;