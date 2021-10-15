const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passportServices = require('./services/passport');
const connectDB = require('./config/db');
const keys = require('./config/keys');
const User = require('./models/User');

const port = process.env.PORT || 5000;

// Init express
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

// passport
passportServices(keys, User, GoogleStrategy, passport);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/snap'));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like out main.js file, main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
