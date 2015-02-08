

$(function() {
	$('#faveButton').on('click', function(event) {
			event.preventDefault();

			var activeItems = $('.active img');
			var selectItems = $('.selectTag').val();
			var selectItemsName = $('.selectTag tagSelections').html();
			var postData = {
				topId: activeItems[0].dataset.pieceid,
				bottomId: activeItems[1].dataset.pieceid,
				tagSelect: selectItems[0],
				tagName: selectItemsName
			};

		$.ajax({
			type: 'POST',
			url: '/outfits',
			data: postData
		}).success(function(data){
			$('#favorited')
				.fadeIn('slow', function(){
					$('#favorited').show();
				})
				.fadeOut('slow', function(){
					$('#favorited').hide();
				})
			});
		// }).error(function(){
		// 	alert('please select an outfit descriptor')
		// })
	});


	$('.polariod-inner').hover(function(){
		$(this).children('.glyphicon-remove').fadeIn("slow", function(){
			$(this).show();
		});
	}, function(){
		$(this).children('.glyphicon-remove').fadeOut("slow", function(){
			$(this).hide();
		});
	});

	$('.glyphicon-remove').on('click', function(event){
		var myOutfit = $(this)
		$.ajax({
			type: 'DELETE',
			url: '/outfits'
		}).success(function(data){
			myOutfit.parent().parent().fadeOut('fast');
		})
	});

	$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })

});