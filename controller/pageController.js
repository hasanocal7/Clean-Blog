const Blog = require('./../models/Blog');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPostPage = (req, res) => {
  res.render('add_post');
};

exports.getUpdatePage = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('update', { blog });
};
