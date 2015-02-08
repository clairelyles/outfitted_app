var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');
var db = require('./models');
var multer = require('multer');
var cloudinary = require('cloudinary');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(multer({dest: __dirname+'/uploads'}));
app.use(session ({
	secret: 'lolCats',
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next){
    req.getUser = function(){
        return req.session.user || false;
    }
    next();
});


/* ------------------- Testing Responsiveness Page ------------------- */
app.get('/testing', function(req, res) {
	res.render('responsive');
});

/* ---------- Applies flash msg to every * page ---------- */
app.get('*', function(req, res, next) {

	var alerts = req.flash();
	res.locals.alerts = alerts;
	next();
});


/* ------------------- Index Page ------------------- */
app.get('/', function(req, res) {
	res.render('index');
});


/* ------------------- Signup Post ------------------- */
app.get('/signup', function(req,res) {
	res.render('landing');
})

app.post('/signup', function(req, res) {
	db.user.findOrCreate({
		where:{
			'email':req.body.email
		},
		defaults:{
			'password':req.body.password,
			'first_name':req.body.first_name
		}
	}).spread(function(userInfo, created) {
			req.session.user = {
				id: userInfo.id,
				email: userInfo.email,
				name: userInfo.first_name
			};

			res.redirect('/landing');
	}).catch(function(error) {
		if (error && Array.isArray(error.errors)) {
			// must be error.errors b/c the error obj contains name and message keys in addition to errors
			error.errors.forEach(function(errorItem) {
				// if error, display error message
				req.flash('danger', errorItem.message)
							res.redirect('/');

			});
		} else {
			// for unknown errors
			res.flash('danger', 'Unknown error');
			res.redirect('/');
		};
	});
});


/* ------------------- Login Post ------------------- */
app.get('/login', function(req,res) {
	res.render('landing');
})

app.post('/login', function(req, res) {
	db.user.find({where: {'email':req.body.email}}).then(function(userObj) {
		if (userObj) {
			bcrypt.compare(req.body.password, userObj.password, function(err, match) {
			if (match === true) {
				req.session.user = {
					id: userObj.id,
					email: userObj.email,
					name: userObj.first_name
				};
				res.redirect('landing');
			} else {
				req.flash('warning', 'Invalid password, please try again.');
				res.redirect('/');
			};
		});
	} else {
		req.session.count ? req.session.count = req.session.count +1 : req.session.count = 1;
		if (req.session.count > 2) {
			req.flash('warning', 'Too many incorrect log-in attempts. Please create an account')
			res.redirect('/');
		} else {
			req.flash('warning', 'Unknown User, please try again.')
			res.redirect('/');
			};
		};
	});
});


/* ------------------- Landing Page ------------------- */
app.get('/landing', function(req, res) {
	var user = req.getUser();
	if (user) {
		db.user.find({where:{'id':user.id}}).then(function(userInfo) {
			var city = 'Seattle,usa'
			request('http://api.openweathermap.org/data/2.5/weather?q=' + city, function(error, response, body){
				var city = JSON.parse(body);
				var cityTemp = city.main;
				var cityDesc = city.weather;
				for (var i = 0; i < cityDesc.length; i++) {
					var description = cityDesc[i]
					res.render('landing', {'temp':cityTemp,'description':description,'userInfo':userInfo});
				};
			});
		});
	} else {
		req.flash('warning', 'Please log-in before continuing.');
		res.redirect('/');
	};
});

/* ------------------- Get Upload Page ------------------- */
app.get('/upload', function(req, res) {
	var user = req.getUser();
	if (user) {
		db.piecetype.findAll().then(function(piecetype) {
		res.render('upload', {piecetype:piecetype});
		})
	} else {
		req.flash('warning', 'Please log-in before continuing.');
		res.redirect('/');
	};
});

/* ------------------- Post Upload Page ------------------- */
app.post('/upload', function(req, res) {
	var pieceType = req.body.selectpicker;
	var user = req.getUser()

	if (pieceType && req.files.piecePicture != undefined) {
		var imgInfo = req.files.piecePicture.path;

		db.piece.create({'piecetypeId':pieceType, 'userId':user.id}).then(function(pieceData) {
			cloudinary.uploader.upload(imgInfo, function(result) {
				 req.flash('info', 'A new item has been added to your closet.')
				 res.redirect('/mycloset');
				},{'public_id':'piece_' + pieceData.id})
		});
	} else {
		req.flash('danger', 'Oops! Please choose a file and item type.')
		res.redirect('upload');
	};
});


/* ------------------- My Closet Page ------------------- */
app.get('/mycloset', function(req, res) {
	var user = req.getUser();
	var top = [1,2];
	var bottom = [3,4,5];

	if (user) {
		db.tag.findAll().then(function(tags){
			db.piece.findAll({where:{'userId':user.id}}).then(function(pieceDisplay){
				var allPieces = pieceDisplay.map(function(piece){
				var outPiece = {};
				outPiece.id = piece.id;
				outPiece.userId = piece.userId;
				outPiece.piecetypeId = piece.piecetypeId;
				outPiece.image = (cloudinary.url('piece_' + piece.id + '.jpg',{
					radius: 5,
					crop: 'fill'
				}));
				return outPiece;
			});

				var topPieces = allPieces.filter(function(piece){
					return top.indexOf(piece.piecetypeId) > -1;
				})
				var bottomPieces = allPieces.filter(function(piece){
					return bottom.indexOf(piece.piecetypeId) > -1;
				})
				res.render('mycloset', {'topPieces':topPieces,'bottomPieces':bottomPieces,'tags':tags});
			});
		});
	} else {
		req.flash('warning', 'Please log-in before continuing.');
		res.redirect('/');
	};
});


/* ------------------- My Outfits Page ------------------- */
app.get('/outfits', function(req, res){
	var user = req.getUser();
		if (user) {
			db.outfit.findAll({
				where:{userId:user.id},
				include:[{model:db.piece},{model:db.tag}],
				order:'id DESC'
			}).then(function(outfits){
				res.render('outfits', {'outfits':outfits});
			});
		} else {
			req.flash('warning', 'Please log-in before continuing.');
			res.redirect('/');
		}
});

app.post('/outfits', function(req, res){
	var user = req.getUser();
	db.outfit.create({'tagId':req.body.tagSelect,'userId':user.id}).then(function(createdOutfit){
  	db.look.create({'pieceId':req.body.topId,'outfitId':createdOutfit.id}).then(function(createdTops){
  		db.look.create({'pieceId':req.body.bottomId,'outfitId':createdOutfit.id}).then(function(createdBottoms){
  			db.tag.find({id:req.body.tagSelect}).then(function(tagName){
    			var displayInfo = {
    				'outfits':createdOutfit,
    				'top':createdTops,
    				'bottom':createdBottoms,
    				'tagName':tagName
    			};
    			res.send('outfits', {'displayInfo':displayInfo});
  			});
  		});
    });
	});
});

app.delete('/outfits', function(req, res){
	var user = req.getUser();
	db.outfit.find({where:{'userId':user.id}}).then(function(removedOutfit){
		db.look.destroy({where:{'outfitId':removedOutfit.id}}).then(function(removedLook){
			db.outfit.destroy({where:{'id':removedOutfit.id}}).then(function(removedOutfitAgain){
				res.send({deleted: true});
			});
		});
	});
});


/* ------------------- About Me ------------------- */

app.get('/about', function(req,res){
	var user = req.getUser();
	if (user) {
		res.render('about');
	} else {
		req.flash('warning', 'Please log-in before continuing.');
		res.redirect('/');
	}
})


/* ------------------- Logout ------------------- */
app.get('/logout', function(req, res) {
	delete req.session.user;
	req.flash('info', 'You have been logged out.');
	res.redirect('/');
})



app.listen(process.env.PORT || 3000);