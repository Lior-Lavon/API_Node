const mongoose = require('mongoose');

// connect to mongoDB
mongoose.connect('mongodb://localhost/Todo');

// Define the schema
var TodoScheam = new mongoose.Schema({
    name: String,
    completed: Boolean
});

// connect the schema to the Collection
var ToDo = mongoose.model('todo', TodoScheam);
// Create a new item and insert it
ToDo.create({
    name: 'clear up my room',
    completed: false
})
.then((err, todo) => {
    console.log(err, todo);
})