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
	query = encodeURIComponent(query);	//administra espacios para mejor lectura del navegador
	//console.log(query);


	//funcion que viene envuelta el objeto es jsonCallback
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
	var woeid = res.woeid;

	$('#geo')
		.prepend('<p><strong>'+barrio+'</strong></br>'+pais+','+ciudad+'</p>');
	obtenerClima(woeid);
}

function obtenerClima(woeid){
	//console.log(lat, lon);
	var query = 'select * from weather.forecast where woeid = "'+woeid+'" and u="c"';
	//console.log(query);
	query = encodeURIComponent(query);	//administra espacios para mejor lectura del navegador
	//console.log(query);


	//funcion que viene envuelta el objeto es jsonCallback
	$.ajax({
		url: base_url+"q="+query,
		dataType : 'jsonp',
		jsonpCallback : 'procesarClima',
		data : {
			format : 'json'
		}
	});
}

function procesarClima(datos){
	//console.log(datos);
	//debajo viene de la estructura console
	var clima = datos.query.results.channel;
	var temp = clima.item.condition.temp;
	var unit = clima.units.temperature;
	var cond = clima.item.condition.code
	var img = new Image();
	img.src = "http://l.yimg.com/a/i/us/we/52/"+cond+".gif"

	//console.log(clima);
	//opcion 1
	$('#clima')
		.append(img)
		.append(temp+' '+unit+'°')
	//opcion 2
	/*
	$('#clima')
		.append(clima.item.description);
	*/
}