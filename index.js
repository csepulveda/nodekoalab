var koa = require('koa');
var route = require('koa-route');
var app = koa();
var mongoose = require('mongoose');
var database = 'mongodb://nodekoalab.westus.cloudapp.azure.com/NodeKoaLab'
mongoose.connect(database);
var db = mongoose.connection;

// Test Database
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Succesfully connected to ' +  database);
});

// Schema
var labSchema = mongoose.Schema({
    name: String,
    type: String,
    size: Number
});

// REST API
app.use(route.get('/api/items', function*() {
    this.body = 'Get';
}));
app.use(route.get('/api/items/:id', function*(id) {
    this.body = 'Get id: ' + id;
}));
app.use(route.post('/api/items', function*() {
    this.body = 'Post';
}));
app.use(route.put('/api/items/:id', function*(id) {
    this.body = 'Put id: ' + id;
}));
app.use(route.delete('/api/items/:id', function*(id) {
    this.body = 'Delete id: ' + id;
}));

// all other routes
app.use(function *() {
    this.body = 'Hello world';
});

var server = app.listen(3000, function() {
    console.log('NodeKoaLab is listening to http://localhost:3000');
});
