$(function(){
	//peticion get/post
	//     recurso a obtener   callback cuando ajax termina
	$.get('logos_footer.html', function(codigo_logo){
		//console.log(codigo_logo);
		$('footer').append(codigo_logo);
	});



	//objeto
	$.get('usuario.json', function(codigo_dato){
		//console.log(codigo_dato);
		var avatar = new Image();
		avatar.src = codigo_dato.avatar;
		avatar.title = codigo_dato.nombre+' '+codigo_dato.apellido;
				
		$('#avatar').append(avatar);
	});


	//obtenerGeoInformacion();

	//function obtenerGeoInformacion(lat, lon){
	//function obtenerGeoInformacion(){
	//	console.log(window.lat, window.lon);
	//}

	//carga html
	/*
	$('footer').load('logos_footer.html #logo_1')
	*/
});

var base_url = "https://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	//console.log(lat, lon);
	var query = 'select * from geo.placefinder where text = "'+lat+','+lon+'" and gflags = "R"';
	//console.log(query);
	query = encodeURIComponent(query);
	//console.log(query);

	$.ajax({
		url: base_url+"q="+query,
		dataType : 'jsonp',
		jsonpCallback : 'procesarGeoInfo',
		data : {
			format : 'json'
		}
	});
}

function procesarGeoInfo(datos){
	//console.log(datos);
	var res = datos.query.results.Result;
	var barrio = res.neighborhood;
	var ciudad = res.city;
	var pais = res.country;

	$('#geo')
		.append('<p><strong>'+barrio+'</strong></br>'+barrio+','+ciudad+'</p>');
}
