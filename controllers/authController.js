const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(400).send('Invalid password');
    }
    req.session.user = user;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

exports.adminPanel = async (req, res) => {
  try {
    const users = await User.find();
    res.render('adminPanel', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  }
};
