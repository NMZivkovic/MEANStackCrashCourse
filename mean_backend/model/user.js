var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a schema.
var userSchema = new Schema({
  name: String,
  blog: String,
  age: Number,
  location: String
});

// Define a method for concatanation of name and blog fields.
userSchema.methods.concatanceNameAndBlog = function() {
    // Extend name with value of the blog field.
    this.name = this.name + this.blog; 
  
    return this.name;
  };

// Create a model.
var User = mongoose.model('User', userSchema);

module.exports = User;