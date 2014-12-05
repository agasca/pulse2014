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



	//funciones
	function mostrarFormulario(){
		$form.slideToggle();
		return false;
	}

	function agregarPost(){
		var url = $url.val(),
			titulo = $titulo.val(),
			$clone = $post.clone();

		$clone.find('.titulo_item a')
			.text(titulo)
			.attr('href', url);
		
		$clone.hide();

		$list.prepend($clone);

		$clone.fadeIn();
		//no ejecuta el submit
		return false;
	}

	//eventos
	$button.click(mostrarFormulario);
	$form.on('submit', agregarPost);