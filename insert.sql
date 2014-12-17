\connect outfitted

INSERT INTO piecetypes VALUES (1,'blouse','now','now');

INSERT INTO piecetypes VALUES (2,'jacket','now','now');

INSERT INTO piecetypes VALUES (3,'shorts','now','now');

INSERT INTO piecetypes VALUES (4,'skirt','now','now');

INSERT INTO piecetypes VALUES (5,'pants','now','now');

INSERT INTO tags VALUES (1,'sleepy','Go get em tiger','now','now');

INSERT INTO tags VALUES (2,'sexy','Go get em tiger','now','now');

INSERT INTO tags VALUES (3,'work','Go get em tiger','now','now');

INSERT INTO tags VALUES (4,'school','Go get em tiger','now','now');

INSERT INTO tags VALUES (5,'sassy','Go get em tiger','now','now');

INSERT INTO tags VALUES (6,'asif','Go get em tiger','now','now');


<!-- Begin carousel -->
<div class='container'>
	<div id="piece-carousel" class="carousel slide" data-ride="carousel">
	<!-- Indicators -->
	  <ol class="carousel-indicators">
	    <li data-target="#piece-carousel" data-slide-to="0" class="active"></li>
	    <li data-target="#piece-carousel" data-slide-to="1"></li>
	  </ol>
	 
	  <!-- Wrapper for slides -->
	  <div class="carousel-inner text-center">
	    <div class="item">
	      <img src="http://res.cloudinary.com/drxybow0v/image/upload/c_fill,h_0.5,r_5,w_0.5/piece_51" alt="...">
	    </div>
	    <div class="item active">
	      <img src="http://res.cloudinary.com/drxybow0v/image/upload/c_fill,h_0.5,r_5,w_0.5/piece_55" alt="...">
	    </div>
	    <div class="item">
	      <img src="http://res.cloudinary.com/drxybow0v/image/upload/c_fill,h_0.5,r_5,w_0.5/piece_48" alt="...">
	    </div>
	  </div>
	 
	  <!-- Controls -->
	  <a class="left carousel-control" href="/mycloset" role="button" data-slide="prev">
	    <span class="glyphicon glyphicon-chevron-left"></span>
	  </a>
	  <a class="right carousel-control" href="/mycloset" role="button" data-slide="next">
	    <span class="glyphicon glyphicon-chevron-right"></span>
	  </a>
	</div> 
</div>
<!-- End Carousel -->

