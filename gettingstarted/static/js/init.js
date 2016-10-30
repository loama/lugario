(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

//map
function initMap() {
  var w = window.innerWidth;
  disableDefaultUIMaps = true;
  if (w < 992) {
  	disableDefaultUIMaps = false;
  }
  console.log(disableDefaultUIMaps);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.422893, lng: -99.174298},
    zoom: 13,
    styles: [{"featureType":"all","elementType":"all","stylers":[{"hue":"#ff2600"},{"saturation":"100"},{"lightness":"-39"},{"gamma":"0.70"}]}],
    zoomControl: disableDefaultUIMaps,
  	mapTypeControl: false,
  	scaleControl: true,
  	streetViewControl: false,
  	rotateControl: false
  });

  function loadProperties() {
  	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://lugarapi.herokuapp.com/website_properties",
	  "method": "GET",
	  "headers": {
	    "cache-control": "no-cache",
	  }
	}

	$.ajax(settings).done(function (response) {
	  $('#list-view-listings').empty();
	  for (i=0; i < response.length; i++) {
	  	var image = 'static/img/map_marker.png';
	  	var location = JSON.parse(response[i].location);
	  	//console.log(location);
		var marker_latitude = location.latitude;
		//console.log(latitude);
		var marker_longitude = location.longitude;
		//console.log(longitude);
		if(isNaN(marker_latitude) || isNaN(marker_longitude)) {}
		else {
			if (marker_latitude.length != "") {
				//console.log(marker_latitude);
				eval('var marker' + i + ' = new google.maps.Marker({' +
				    'position: {lat: ' + marker_latitude + ', lng: ' + marker_longitude + '},' +
				    'title: "' + response[i].id + '",' +
				    'map: map,' +
				    'icon: "' + image + '"});' + 
				    'marker' + i + '.addListener("click", function() {' +
					    'mapListingPreview(marker' + i + '.getTitle())' +
					'});');
				var thumbnail = JSON.parse(response[i].pictures);
				$('#list-view-listings').append('<div class="card row">' +
											       '<div class="col s4 m2" style="background-image: url(' + thumbnail[0].url + ');">'
											     +   '</div>'
											     +   '<div class="col s8 m10">'
											     +	   '<span class="list-view-title">' + response[i].title + '</span>' + '<br>'
											     +	   '<span class="list-view-text">' + response[i].title + '</span>'
											     +     '<div class="card listing-arrow-card" onclick="openListing(' + response[i].id + ', \'panel\')">'
											     +       '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
											     +     '</div>'
											     +   '</div>'
											     + '</div>');
			}	
			
		}
		
	  }
	  console.log(i);
	});
  };
  loadProperties();

  // places autocomplete

  var input = document.getElementById('search-bar-where');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', function() {
    //infowindow.close();
    //marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
 	}

 	if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }

 	console.log(place);
  });

  var image = 'static/img/map_marker.png';
  var marker = new google.maps.Marker({
    position: {lat: 19.4220, lng: -99.174},
    map: map,
    icon: image
  });
};

$("#change-view-list").click( function() {
	$("#change-view-map").css('color', 'white');
	$(".view-indicator").css('left', '3px');
	$(this).css('color', '#777');
	$('#list-view').css('display', 'block');
	$('#list-view').animateCss('bounceInLeft', 'in');
});

$("#change-view-map").click( function() {
	$("#change-view-list").css('color', 'white');
	$(".view-indicator").css('left', '49px');
	$(this).css('color', '#777');
	$('#list-view').animateCss('bounceOutLeft', 'out');
});

$('#close-filter-view').click( function() {
	$('#filter-view').animateCss('bounceOutUp', 'out');
});

$('#filter-results').click( function() {
	$('#filter-view').animateCss('bounceInDown', 'in');
});

$.fn.extend({
    animateCss: function (animationName, type) {
    	$(this).css('display', 'block');
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (type == 'out') {
            	$(this).css('display', 'none');
            	console.log('out');
            }
        });
    }
});

function mapListingPreview(id) {

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://lugarapi.herokuapp.com/website_properties?id=eq." + id + "",
	  "method": "GET",
	  "headers": {
	    "cache-control": "no-cache",
	    "postman-token": "11ad607c-bac8-0538-7000-bd798dea4820"
	  }
	}

	$.ajax(settings).done(function (response) {
	  $('#map-preview-property-title').html(response[0].title);
	  $('#map-preview-property-description').html(response[0].title);
	  var picture = JSON.parse(response[0].pictures)[0].url;
	  $('#map-preview-property-image').css("background-image", "url(" + picture + ")");

	  var bed = '<i class="fa fa-bed" aria-hidden="true"></i>';
	  var apt = '<i class="fa fa-building-o" aria-hidden="true"></i>';
	  var house = '<i class="fa fa-home" aria-hidden="true"></i>';
	  
  	  switch(response[0].property_type) {
	    case "cuarto":
	       	var icon = bed;
	        break;
	    case "departamento":
	        var icon = apt;
	        break;
	    default:
	        var icon = house;
	        console.log('default');
	  }

	  $('#detail-price-type').html(icon);
	  $('#detail-price-price').html("$" + response[0].price + response[0].currency_id);
	  $('#map-property-detail-card').animateCss('bounceInLeft', 'in');
	  $('#map-property-detail-price').animateCss('bounceInRight', 'in');
	});
	
}

function openListing(id, from) {
	console.log(id);
	console.log(from);
}

$('.detail-price-back-button').click( function() {
	$('#map-property-detail-card').animateCss('bounceOutLeft', 'out');
	$('#map-property-detail-price').animateCss('bounceOutRight', 'out');
});