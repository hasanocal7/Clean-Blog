const Blog = require('./../models/Blog');

exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('post', { blog });
};

exports.getAllBlog = async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', { blogs });
};

exports.createBlog = async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
};

exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const updatedData = req.body; // Güncellenecek verileri içeren JSON

  try {
    // Mevcut blogu alıp güncellemek için önce veritabanından çekiyoruz
    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
      return res.status(404).send('Belirtilen blog gönderisi bulunamadı.');
    }

    // `dateCreated` alanını güncelliyoruz
    existingBlog.dateCreated = new Date(); // Şu anın tarihini kullanabilirsiniz veya başka bir tarih atayabilirsiniz

    // Diğer verileri güncelliyoruz
    existingBlog.title = updatedData.title;
    existingBlog.detail = updatedData.detail;

    // Blog gönderisini kaydediyoruz
    const updatedBlog = await existingBlog.save();

    res.redirect('/');
  } catch (error) {
    console.error('Blog güncelleme hatası:', error);
    res.status(500).send('Blog gönderisi güncellenirken bir hata oluştu.');
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).send('Belirtilen blog gönderisi bulunamadı.');
    }

    res.redirect('/');
  } catch (error) {
    console.error('Blog silme hatası:', error);
    res.status(500).send('Blog gönderisi silinirken bir hata oluştu.');
  }
};
