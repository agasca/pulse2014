$(function(){
	var geo = navigator.geolocation;
	var opciones = {};


	function geo_error(){
		console.log("i'm lost");
	}

	function geo_exito(posicion){
		//console.log(posicion);
		var lat = posicion.coords.latitude;
		var lon = posicion.coords.longitude;
		//objeto mapa
		var mapa = new Image();
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?zoom=15&maptype=hybrid&size=200x200&sensor=false&center="+lat+","+lon;
		$('#geo').append(mapa);

		obtenerGeoInformacion(lat, lon);
		//obtenerGeoInformacion(lan, lon)	//funcion oculta llama ajax.js
		//window.lat = lat; window.lon = lon;
	}

	geo.getCurrentPosition(geo_exito, geo_error, opciones);
});