var express = require('express');
var router = express.Router();
var user = require('../models/user');

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if(req.session) {
    // delelte session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    })
  }
});

// GET /login
router.get('/login', function(req, res, next) {
  return res.render('login', { title: 'Login'});
});

// POST /login
router.post('/login', function(req, res, next) {
  if(req.body.email && req.body.password) {
    user.authenticate(req.body.email, req.body.password, function(error, user) {
      if(error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /profile
router.get('/profile', function(req, res, next) {
  if(!req.session.userId) {
    var err = new Error('You are not authorized to view this page');
    err.status = 403;
    return next(err);
  }
  user.findById(req.session.userId).exec(function(error, user) {
    if(error) {
      return next(error);
    } else {
      var title = `Profile | ${user.name}`;
      return res.render('profile', { title: title, name: user.name, favorite: user.favoriteBook });
    }
  })
});

// GET /register
router.get('/register', function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next) {
  if(req.body.email && req.body.name && req.body.favoriteBook && req.body.password && req.body.confirmPassword) {

    // confirm that user typed the same password twice
    if(req.body.password !== req.body.confirmPassword) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    // create object with form input
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    }

    // user schema's create method to insert our document into mongo
    user.create(userData, function(err, user) {
      if(err) {
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
