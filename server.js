'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');

//Importing helper functions
const helperFunction = require('./helperfunctions');
const PORT = process.env.PORT;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Method override setup
const methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// these are nice, and so is the commenting!
//Server routes
app.get('/', (req, res) => res.redirect('/search'));

app.get('/results', helperFunction.getResults);
app.get('/search', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('pages/about'));
// It's convention to use plural names in routes, i.e. '/places'.
app.get('/place/:id', helperFunction.returnData);
app.delete('/place', helperFunction.deletePlace);
app.post('/place', helperFunction.addPlace);
app.get('/pages/saved', (req, res) => res.redirect('/pages/saved/favorites'));
app.get('/pages/saved/:id', helperFunction.saveLocal);

//Catch all route
app.get('*', (req, res) => {
  res.statusCode = 404;
  res.render('pages/error', { err: '404, page not found.' });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
