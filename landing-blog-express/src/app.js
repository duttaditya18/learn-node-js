'use strict';

var express = require('express');
var posts = require('./mock/posts.json');

var postsLists = Object.keys(posts).map(function(value) {
	return posts[value]
});

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {
	var path = req.path;
	res.locals.path = path;

	var fullUrl = req.protocol + '://' + req.get('host');
	res.locals.fullUrl = fullUrl;
	
	res.render('index.pug');
});

app.get('/blog/:title?', function(req, res) {
	
	var title = req.params.title;

	var fullUrl = req.protocol + '://' + req.get('host');
	res.locals.fullUrl = fullUrl;

	if(title === undefined) {
		res.render('blog.pug', {posts: postsLists});
	} else {
		var post = posts[title] || {};
		res.render('post.pug', {post: post});
	}
});

app.get('/api/blog/:title?', function(req, res) {

	var title = req.params.title;

	if (title === undefined) {
		res.json(postsLists);
	} else {
		var post = posts[title] || {};
		res.json(post);
	}
});

const serverIp = '127.0.0.1';
const serverPort = 1337;

app.listen(serverPort, serverIp, function() {
	console.log(`Server running at 'http://${serverIp}:${serverPort}/'`);
});
