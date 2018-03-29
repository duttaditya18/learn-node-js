var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    favoriteBook: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
});

// authenticate input against database documents
userSchema.statics.authenticate = function(email, password, callback) {
    user.findOne({ email: email}).exec(function(error, user) {
        if(error) {
            return callback(error);
        } else if(!user) {
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    })
}

// hash passwords before saving to database
userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

var user = mongoose.model('user', userSchema);
module.exports = user;