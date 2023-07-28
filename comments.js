// Create Web Server
// Create Database
// Create Schema
// Create Model
// Create Router
// Create Controller

// 1. Create Web Server
const express = require('express');
const app = express();
const port = 3000;

// 2. Create Database
const mongoose = require('mongoose');
const db = mongoose.connection;
const db_url = 'mongodb://localhost:27017';
const db_name = 'comment';
mongoose.connect(`${db_url}/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Connected to ${db_name} database`);
});

// 3. Create Schema
const commentSchema = new mongoose.Schema({
    comment: String,
    name: String,
    date: Date
});

// 4. Create Model
const Comment = mongoose.model('Comment', commentSchema);

// 5. Create Router
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/comment', (req, res) => {
    Comment.find((err, comments) => {
        if (err) return console.error(err);
        res.send(comments);
    }).sort({date: -1});
});

app.post('/comment', (req, res) => {
    const comment = new Comment({
        comment: req.body.comment,
        name: req.body.name,
        date: Date.now()
    });
    comment.save((err, comment) => {
        if (err) return console.error(err);
        res.send(comment);
    });
});

// 6. Create Controller

// 7. Start Web Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});