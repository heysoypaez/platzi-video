console.log('hola mundo!');
const nombreUsuario = "Daniel";

let usuario = "@heysoypaez"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}


//Creando una promesa
const getUser = new Promise(function(todoChevere,seJodio) {

	// llamar un api
	setTimeout(function(){
		//Luego de 3 segundos se ejecuta esto
		todoChevere("GANE? No, llegue en 5 segundos");
	}, 5000)

})

//Creando una promesa
const getUserAll = new Promise(function(todoChevere,seJodio) {

	// llamar un api
	setTimeout(function(){
		//Luego de 3 segundos se ejecuta esto
		todoChevere("GANE A LOS 3 SEGUNDOS");
	}, 3000)


	
})


//Metodos si todo va bien
getUser
	.then( function () {
		// body...
		console.log("Todo esta bien en la vida")
	})
	.catch( function(mensaje) {
		console.error(mensaje)
	})

	//Enviando varias promesas al mismo tiempo
		Promise.race([
			getUser,
			getUserAll,
			getUserAll,
			
			])

		//solo entramos al then de la promesa que se resuelva primero
		.then(function(mensaje) {
			console.log(mensaje)
		})

		.catch(function (mensaje) {
			console.log(mensaje)
		})
	

//promise. all espera a que todo este y te lo manda en el orden que dijiste


