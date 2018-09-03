const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {salt} = require('../salt');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    }, 
    password: {
        type: String,
        required: true
    }, 
    tokens: [{
        access: {
            type: String, 
            require: true
        },
        token: {
            type: String, 
            require: true
        }
    }],
    major1: {
        type: String,
        default: null
    },
    major2: {
        type: String,
        default: null
    }, 
    major3: {
        type: String,
        default: null
    },
    courses: {
        type: [Number],
        default: []
    }
});

userSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['email', '_id']);
};

userSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, salt);
    }
    catch(e) {
        return Promise.reject();
    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token, 
        'tokens.access': 'auth'
    });
};

userSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({
        email: email
    })
    .then((user) => {
        if(!user)
            Promise.reject();
        else {
            var hashedPassword = user.password;
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, hashedPassword, (err, res) => {
                    if(res) {
                        resolve(user);
                    }
                    else
                        reject(err);
                })
            })
        }
    })
};

userSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

userSchema.methods.generateAuthToken = async function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, salt).toString();
    user.tokens = user.tokens.concat([{access, token}]);
    await user.save();
    console.log(token);
    return token;
};

userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if(err)
                console.log(err);
            else {
                bcrypt.hash(user.password, salt, function (e, hash) {
                    if(e) {
                        console.log(e);
                    }
                    else {
                        user.password = hash;
                    }
                    next();
                });
            }
        });
    }
    else
        next();
});

var User = mongoose.model('User', userSchema);
module.exports.User = User;