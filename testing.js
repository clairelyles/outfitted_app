var db = require('./models');
var cloudinary=require('cloudinary');

var user = {id:13};

var tops=[1,2];
var bottoms=[3,4,5];


db.piece.findAll({where:{'userId':user.id}}).then(function(pieceDisplay) {

	var allPieces = pieceDisplay.map(function(piece) {
		var outPiece = {};
		outPiece.id=piece.id;
		outPiece.userId=piece.userId;
		outPiece.piecetypeId=piece.piecetypeId;
		outPiece.image=cloudinary.url('piece_' + piece.id + '.jpg',{
			width: 0.5,
			height: 0.5,
			radius: 5,
			crop: 'fill'
		});
		return outPiece;
	});

	var topPieces = allPieces.filter(function(piece){
		return (tops.indexOf(piece.piecetypeId) > -1);
	});
	var bottomPieces = allPieces.filter(function(piece){
		return (bottoms.indexOf(piece.piecetypeId) > -1);
	});

	console.log('tops',topPieces);
	console.log('bottoms',bottomPieces);

});	