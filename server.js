const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/CRUD')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/user', async (req, res) => {

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password
  });

  await user.save();

  res.send('User created successfully!');
});


app.get('/user', async (req, res) => {

  const users = await User.find();

  res.json(users);

});

app.put('/user/:id', async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(user);
});

app.delete('/user/:id', async (req, res) => {

  const user = await User.findByIdAndDelete(req.params.id);

  res.json({
     message: 'User deleted successfully!', user });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});