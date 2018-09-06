var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var {mongoose} = require('./db/mongoose')
var {Course} = require('./model/course 2');
var {User} = require('./model/user');
var {Student} = require('./model/student');
var {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/autheticate');

var app = express();

var frontendPath = path.join(__dirname + '/../frontend');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(frontendPath));

app.listen(port, () => {
    console.log('started on port ' + port);
});

app.post('/users', (req, res) => {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        major1: req.body.major1,
        major2: req.body.major2,
        major3: req.body.major3,
        coursesTaken: req.body.coursesTaken
    });

    user.generateAuthToken()
    .then((token) => {
        res.header('x-auth', token).send(user);
    })
    .catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    User.findByCredentials(req.body.email, req.body.password)
    .then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    })
    .catch((e) => {
        res.status(400).send();
    })
})

app.delete('/users/me/token' , authenticate, (req, res) => {
    req.user.removeToken(req.token)
    .then(() => {
        res.status(200).send();
    })
    .catch((e) => {
        res.status(400).send();
    })
})

app.get('/students/:studentID', (req, res) => {
    Student
    .findById(req.params.studentID)
    .then((student) => {
        res.send(student);
    })
    .catch((e) => {
        console.log(e);
    });
})

app.post('/addCourseToUserByID/:userId/:courseId', authenticate, (req, res) => {
    User
    .findById(new ObjectID(req.params.userId))
    .then((user) => {
        var coursesTaken = user.coursesTaken;
        var courseId = req.params.courseId;
        if(!coursesTaken.includes(courseId)) {
            coursesTaken.push(courseId);
        }
        User
        .findOneAndUpdate({
            _id: new ObjectID(userId)
        }, {
            $set: {
                coursesTaken: coursesTaken
            }
        }, {new: true}, (er, doc) => {
            if(er) {
                return console.log(er);
            }
            console.log(coursesTaken);
            res.send(doc);
        });
    }, (e) => {
        console.log(e);
    })
    .catch((e) => {
        console.log(e);
    });
})

app.get('/courses/:courseId', (req, res) => {
    Course
    .findById(req.params.courseId)
    .then((courses) => {
        res.send(courses);
    })
    .catch((e) => {
        console.log(e);
    });
});