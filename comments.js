//Create a webserver
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

//Create a route for the homepage
router.get('/', function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            console.log('Error', err);
        }else{
            res.render('comments/index', {comments: comments});
        }
    });
});

//Create a route for the new page
router.get('/new', function(req, res){
    res.render('comments/new');
});

//Create a route for the create page
router.post('/', function(req, res){
    Comment.create(req.body.comment, function(err, comment){
        if(err){
            res.render('comments/new');
        }else{
            res.redirect('/comments');
        }
    });
});

//Create a route for the show page
router.get('/:id', function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log('Error', err);
        }else{
            res.render('comments/show', {comment: comment});
        }
    });
});

//Create a route for the edit page
router.get('/:id/edit', function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log('Error', err);
        }else{
            res.render('comments/edit', {comment: comment});
        }
    });
});

//Create a route for the update page
router.put('/:id', function(req, res){
    Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, comment){
        if(err){
            console.log('Error', err);
        }else{
            res.redirect('/comments/' + req.params.id);
        }
    });
});

//Create a route for the delete page
router.delete('/:id', function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log('Error', err);
        }else{
            res.redirect('/comments');
        }
    });
});

module.exports = router;
