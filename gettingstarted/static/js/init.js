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
					    'console.log(marker' + i + '.getTitle())' +
					'});');
				var thumbnail = JSON.parse(response[i].pictures)
				$('#list-view-listings').append('<div class="card row">' +
											       '<div class="col s4 m2" style="background-image: url(' + thumbnail[0].url + ');">'
											     +   '</div>'
											     +   '<div class="col s8 m10">'
											     +	   '<span class="list-view-title">' + response[i].title + '</span>' + '<br>'
											     +	   '<span class="list-view-text">' + 'lorem ipsum' + '</span>'
											     +     '<div class="card listing-arrow-card">'
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