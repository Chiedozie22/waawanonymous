const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');  //ejs is a simple html and css that aids itration and flow control. other examples are pug
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const Message= require('./models/message');

// DB connection
mongoose.connect('mongodb://localhost/waawnonymous')
.then((disconnect) => console.log('Data connection sucessful'))
.catch((error) => console.log('Database Connection Error', error.message));

// Setting up express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views')); //to set view path
app.set('view engine', 'ejs'); //sets your default engine to ejs

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (request, response) => {
    response.send('You are on the About page');
});

app.get('/contact', (request, response) => {
    response.send ('You are on the Contact page');
});

app.post('/message/create-message', (req, res) => {
    let {message} = req.body;
    // console.log('Form data :::::::::::::', req.body)

    if (!message){
        return res.redirect("/");
    }

let newMessage = new Message({
    message
});

newMessage.save()
    .then(() => console.log('Message created successfully'))
    .then(() => console.log('Error creating message'))
res.redirect('./');
});

app.listen(port, () => console.log(`Server listening on port:: ${port}`));