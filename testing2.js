var db = require('./models');


// db.outfit.findAll({
// 	where:{userId:13}
// }).then(function(outfits){
// 	outfits.forEach(function(outfit){

// 		outfit.getTag().then(function(tag){
// 			console.log('tag',outfit.id,tag.tag_name)
// 		});

		
// 	});
// });




db.outfit.findAll({
	where:{userId:13},
	include:[{model:db.piece},{model:db.tag}]
}).then(function(outfits){
	console.log(outfits);

	console.log('the '+outfits[0].tag.tag_name+ ' outfit has the pieces ' + outfits[0].pieces[0].id + ' and '+ outfits[0].pieces[1].id);

	return;

	outfits.forEach(function(outfit){

		console.log('outfit: '+outfit.id,outfit.pieces[0].id,outfit.pieces[1].id,outfit.tag.tag_name);
		// outfit.pieces[0].getUser().then(function(user){
		// 	console.log('user',user.first_name);
		// });
		
	});
});



/*

db.outfit.findAll({
	where:{userId:13},
	include:[{model:db.piece},{model:db.tag}]
})

SELECT "outfit"."id", "outfit"."tagId", "outfit"."userId", "outfit"."createdAt", "outfit"."updatedAt", "pieces"."id" AS "pieces.id", "pieces"."piecetypeId" AS "pieces.piecetypeId", "pieces"."img_url" AS "pieces.img_url", "pieces"."userId" AS "pieces.userId", "pieces"."createdAt" AS "pieces.createdAt", "pieces"."updatedAt" AS "pieces.updatedAt", "pieces.look"."outfitId" AS "pieces.look.outfitId", "pieces.look"."pieceId" AS "pieces.look.pieceId", "pieces.look"."createdAt" AS "pieces.look.createdAt", "pieces.look"."updatedAt" AS "pieces.look.updatedAt", "tag"."id" AS "tag.id", "tag"."tag_name" AS "tag.tag_name", "tag"."tagline" AS "tag.tagline", "tag"."createdAt" AS "tag.createdAt", "tag"."updatedAt" AS "tag.updatedAt" FROM "outfits" AS "outfit" LEFT OUTER JOIN ("looks" AS "pieces.look" LEFT OUTER JOIN "pieces" AS "pieces" ON "pieces"."id" = "pieces.look"."pieceId") ON "outfit"."id" = "pieces.look"."outfitId" LEFT OUTER JOIN "tags" AS "tag" ON "outfit"."tagId" = "tag"."id" WHERE "outfit"."userId"=13;

*/