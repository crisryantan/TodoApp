var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	username			: String,
	email				: {type: String, unique: true},
	password			: String,
	todo				: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
});

var todoSchema = mongoose.Schema({
    content    : String,
    updated_at : Date,
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Creates User and Todo model
mongoose.model('User', userSchema);
mongoose.model('Todo', todoSchema);

module.exports = {
	User : mongoose.model('User'),
	Todo : mongoose.model('Todo')
};
