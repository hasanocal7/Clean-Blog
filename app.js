// Modules
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Blog = require('./models/Blog');
const pageController = require('./controller/pageController')
const blogController = require('./controller/blogController')

// Create a App
const app = express();

// Connect DB
mongoose.connect('mongodb+srv://root:hasan@atlascluster.4tjfe1d.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB CONNECTED');
}).catch((err) => {
  console.log(err);
});

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
  methods: ['GET', 'POST']
}));

// Get Request
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/update/:id', pageController.getUpdatePage);


// Post Request
app.get('/', blogController.getAllBlog);
app.get('/blogs/:id', blogController.getBlog);
app.post('/blogs', blogController.createBlog);
app.put('/blogs/:id', blogController.updateBlog);
app.delete('/blogs/:id', blogController.deleteBlog);



// Port
const port = 3000;

app.listen(port, () => {
  console.log(`Server is connected to ${port}...`);
});
