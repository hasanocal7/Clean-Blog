// Modules
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

// Create a App
const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.render('index', {blogs});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/post', (req, res) => {
  res.render('post');
});

// Action
app.post('/blogs', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});

// Port
const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
