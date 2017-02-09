(function() {
	function nombrar(nombre){
		return  nombre;
	}

	function saludar(nombre){
		console.info('!HI ' + nombre)
	}

	saludar(nombrar('User'));
})();