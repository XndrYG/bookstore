const {Author} = require('../models');

//view all
module.exports.viewAll = async function(req, res){
    const authors = await Author.findAll();
    res.render('author/view_all', {authors});
};

//profile
module.exports.viewProfile= async function(req, res){
    const author = await Author.findByPk(req.params.id);
    res.render('author/profile', {author})
}

//render add
module.exports.renderAddForm = function(req, res){
    const author = {
        first_name: '',
        last_name: '',
        birth: '',
        written: '',
    }
    res.render('author/add', {author});
}

//add
module.exports.addAuthor = async function(req, res){
    const author = await Author.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth: req.body.birth,
        written: req.body.written
    });
    res.redirect(`/authors/profile/${author.id}`);
}

//render edit
module.exports.renderEditForm = async function(req, res){
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
}

//update
module.exports.updateAuthor = async function(req, res){
    const author = await Author.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth: req.body.birth,
        written: req.body.written
    },  {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/authors/profile/${req.params.id}`);
}

//delete
module.exports.deleteAuthor = async function(req, res){
    await Author.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/authors');
}