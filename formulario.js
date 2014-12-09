/*
//utilizar Fx debajo en caso de poner el script Jquery CDN al inicio del html
$(function(){
	alert("1");
})
*/

var $form = $('#formulario'),
	$titulo = $('#titulo'),
	$url = $('#url'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$post = $('.item').first();

if(localStorage.getItem('autosave')){
	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'));
}

var id = setInterval(function(){
	sessionStorage.setItem('titulo', $titulo.val());
	sessionStorage.setItem('url', $url.val());
}, 1000);

//funciones
function mostrarFormulario(){
//function mostrarFormulario(ev){
	//ev.preventDefault();	//en lugar de return false;
	//ev.stopPropagation();
	$form.slideToggle();
	$list.slideToggle();
	return false;
}

//function agregarPost(){
function agregarPost(eve){
	//console.log(eve);
	eve.preventDefault();	//en lugar de return false;
	eve.stopPropagation();

	var url = $url.val(),
		titulo = $titulo.val(),
		$clone = $post.clone();
		$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href', url);
	
	$clone.hide();
	$list.prepend($clone);

	$clone.fadeIn();
	//$clone.slideDown();

	mostrarFormulario();
	$titulo.val('');
	$url.val('');

	//no ejecuta el submit
	//Sreturn false;
}

//eventos
//abreviado debajo
//$button.click(mostrarFormulario);	//$('#publicar_nav a').click( mostrarOcultarFormulario );
//$form.on('submit', agregarPost);	//agregarPost es callback si solo si el evento se dispara, llamame cuando se dispara

$('nav').on('click', function(){
	console.log('soy nav + click');
})

$('nav ul').on('click', function(){
	console.log('soy ul + click');
})

$('#publicar_nav a').click(mostrarFormulario);
$('.formulario')
	.on('submit', agregarPost)