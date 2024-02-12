const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const path = require("path");
const { body, validationResult } = require('express-validator');
const weatherController = require("./controllers/weatherController");
const authController = require('./controllers/authController');
const adminController = require('./controllers/adminController');
const searchHistoryController = require('./controllers/searchHistoryController');
const { isAdmin } = require('./middleware/isAdmin');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb+srv://illus1ve:1q2w3e4r5t@cluster0.zo5qkc6.mongodb.net/').then(() => console.log('Connected to MongoDB')).catch(error => console.error('MongoDB connection error:', error));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}));

app.get('/home', (req, res) => {
  res.render('index', { user: req.session.user });
}); 

app.get('/', authController.loginPage);
app.post('/login', 
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty(),
  authController.login);
app.get('/logout', authController.logout);

app.get('/admin', isAdmin, adminController.adminPanel);
app.post('/addUser', adminController.addUser);
app.get('/deleteUser/:id', adminController.deleteUser);
app.get('/editUser/:id', adminController.editUserPage);
app.post('/editUser/:id', adminController.editUser);

app.get('/register', authController.registerPage);
app.post('/register', authController.register);

app.post("/weather", weatherController.getWeather);
app.get('/search-history', async (req, res) => {
  try {
    const searchHistory = await searchHistoryController.getSearchHistory();
    res.render('searchHistory', { searchHistory });
  } catch (error) {
    console.error('Error getting search history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/clear-history', async (req, res) => {
  try {
    await searchHistoryController.clearSearchHistory();
    res.redirect('/search-history');
  } catch (error) {
    console.error('Error clearing search history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});