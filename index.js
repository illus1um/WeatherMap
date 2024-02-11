const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const path = require("path");
const weatherController = require("./controllers/weatherController");
const authController = require('./controllers/authController');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb+srv://illus1ve:1q2w3e4r5t@cluster0.zo5qkc6.mongodb.net/');


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', authController.register);

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', authController.login);

app.get('/logout', authController.logout);

app.get('/admin', authController.adminPanel);

app.post("/weather", weatherController.getWeather);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});