const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type: String,trim: true, required: true},
    password:{type: String,trim: true, required: true},
    role:{type: String,trim: true, required: true},
    name:{type: String,trim: true, required: true},
    nip:{type: String,trim: true, required: true},
});

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;