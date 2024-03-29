var express = require('express');
var router = express.Router();
var Posts = require("../db.json");
var request = require("request");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'ODee Sportmanship Channel',
    posts: Posts.posts
  });

});

router.get('/views/:id', function(req, res, next) {
  request({
   uri: "http://localhost:8000/posts/" + req.params.id,
   method: "GET"
  }, function(error, response, body) {
       console.log(JSON.parse(body));


       res.render('readMore', {posts: JSON.parse(body), images: body.image});
       
   });
});

// Get new page
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Page' });
});

router.get('/archive', function (req, res, next) {
  res.render('archive', { title: 'Archive Page', posts: Posts.posts });
});

router.get('/edit', function (req, res, next) {
  res.render('edit', { title: 'Edit Page', posts: Posts.posts });
});

router.get('/posts', function (req, res, next) {
  res.render('posts', { title: 'Posts Page' });
});

/* Post new page */
router.post('/posts', function (req, res, next) {
  // console.log(req.body);

  /*creates variable to posts*/ 
  let obj = {
    "id": req.body.id,
    "title": req.body.title,
    "author": req.body.author,
    "date_time": req.body.date_time,
    "content": req.body.content,
    "image": req.body.image
  }

    /* saves data*/ 
  request.post({
    url: "http://localhost:8000/posts",
    body: obj,
    json: true
  }, function (error, response, body) {
    /* what to send when the function has finished */
   // res.render('posts', { title: 'POSTS' });
    res.redirect("/");
  });
});


/* GET edit page. */
router.get('/edit/:id', function(req, res, next){
  request({
    url: "http://localhost:8000/posts/"+
    req.params.id,
    method: "GET",
  }, function(error, response, body){
    res.render("edit", {message: false, posts: JSON.parse(body), title: body.title})
  });
});
  
router.post("/edit/:id", function(req, res, next){
  console.log(req.params.id);
  request({
    url: "http://localhost:8000/posts/"+req.params.id,
    method: "PATCH",
    form: {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      image: req.body.image
    },
    function(error,response,body){
      res.render("index",{message:"successfully added"});
    }
      
    })
    res.redirect("/");
})

// get delete post
router.get('/delete/:id', function(req, res, next) {
  request({
    url: "http://localhost:8000/posts/"+req.params.id,
    method: "DELETE",
    function(error, response, body) {
      res.render("index", {message: "successfully added"});
    }
  })
  res.redirect("/");
});


module.exports = router;
