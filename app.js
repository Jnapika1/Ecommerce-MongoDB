const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('6526d956694039b13b722b1b')
//     .then(user => {
//       // console.log("app.js=>", user._id);
//       req.user = new User(user.username, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
//   // next();
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://jnapikaaish:sL2mLFkFwD6VfUBV@cluster0.yt3brse.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
  app.listen(3000);
})
.catch(err=>{
  console.log(err);
})
