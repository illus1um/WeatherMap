const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.loginPage = (req, res) => {
    res.render('login', { error: req.session.error });
    req.session.error = null;
};
  
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      req.session.error = 'Incorrect username or password';
      res.redirect('/');
      return;
    }

    req.session.user = user;

    if (user.isAdmin) {
      res.redirect('/admin');
    } else {
      res.redirect('/home');
    }
    
  } catch (error) {
    console.error(error);
    req.session.error = 'Internal Server Error';
    res.redirect('/');
  }
};


exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.registerPage = (req, res) => {
    res.render('register', { error: null });
    req.session.error = null;
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.error = errors.array()[0].msg;
      return res.redirect('/register');
    }

    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        req.session.error = 'User already exists please login!';
        return res.redirect('/');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      req.session.error = 'Internal Server Error';
      return res.redirect('/register');
    }
};
