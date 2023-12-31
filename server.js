if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

// set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// hook up expres layouts
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
// tell express where our public files are
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => {
  console.error(error);
});
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);