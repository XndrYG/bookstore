const {Book} = require('../models')

//view All
module.exports.viewAll = async function(req, res){
    const books = await Book.findAll();
    res.render('book/view_all', {books});
}

//profile
module.exports.viewProfile= async function(req,res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/profile', {book})
}
//render add form
module.exports.renderAddForm = function(req, res){
    const book = {
        title: '',
        publisher: '',
        author: '',
        genre: '',
        pages: '',
        cover: '',
        description: ''
    }
    res.render('book/add', {book});
}
//add
module.exports.addBook = async function(req, res){
    const book = await Book.create({
        title: req.body.title,
        publisher: req.body.publisher,
        author: req.body.author,
        genre: req.body.genre,
        pages: req.body.pages,
        cover: req.body.cover,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
}

//render edit form
module.exports.renderEditForm = async function(req, res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/edit', {book});
}

//update
module.exports.updateBook = async function(req, res){
    const book = await Book.update({
        title: req.body.title,
        publisher: req.body.publisher,
        author: req.body.author,
        genre: req.body.genre,
        pages: req.body.pages,
        cover: req.body.cover,
        description: req.body.description
    },  {
        where: {
            id: req.params.id
        }
        });
    res.redirect(`/books/profile/${req.params.id}`);
}
//delete