/*
Autor: Daniel Páez
Titulo: De jquery a javascript
Descripcion: pasando De jquery a javascript
*/

/*INICIALIZACION DE ARCHIVO
======================================================*/

console.log('Inicializando archivo');

/*DECLARACION DE VARIABLES
=========================================================*/

const nombreUsuario = "Daniel";
let usuario = "@heysoypaez"



/* DECLARACION DE FUNCIONES
=========================================================*/

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}


/* DECLARACION DE PROMESAS
=========================================================*/


//Creando una promesa
const getUser = new Promise(function(todoChevere,error) {

	// llamar un api
	setTimeout(function(){
		//Luego de 3 segundos se ejecuta esto
		todoChevere("GANE? No, llegue en 3 segundos");
	}, 3000)

	if(!todoChevere) {

	error("Damas y caballeros... hubo un error")
	
	}

})

//Creando una promesa
const getUserAll = new Promise(function(todoChevere,error) {

	// llamar un api
	setTimeout( function() {
		//Luego de 3 segundos se ejecuta esto
		todoChevere("GANE A LOS 2 SEGUNDOS");
	}, 2000)

	if(!todoChevere) {

	error("Damas y caballeros... hubo un error")

	}

	
})


/*EJECUCION (CONSUMO) DE PROMESAS
=========================================================*/


	/*PROMISE.RACE()
	Este método envia a la promesa que termine primero */

	Promise.race([
	getUser,
	getUserAll
	])

	.then(function(mensaje) {
	console.log(mensaje)
	})




//Metodos si todo va bien
getUser
	.then( function (mensaje) {

	console.log(`HEY ${mensaje}`)

	})

	
	/* PROMISE.ALL() 
	Espera a que todas las promesas esten listas 
	y las ejecuta todas en el orden declarado */

	Promise.all([
	getUser,
	getUserAll,
	])

	.then(function(mensaje) {

	console.log(`Ya en serio ${mensaje}`)

	})
	

	
	//Metodo de Promise cuando las cosas van mal
	.catch( function(mensaje) {

	console.error(mensaje)

	})


/*LLAMADAS AJAX A API
======================*/

//parametros:  url , objeto
$.ajax("https://randomuser.me/api/",{

	methood: "GET", //GET traer datos, si entregas es POST
	success: function(data) {
		console.log(data)
	},
	error: function(error) {
		console.log(error)
	}
})

//Esto en realidad es un XMLHttpRequest

/*param: url, settings
fetch devuelve una promesa
*/
fetch("https://randomuser.me/api/")

	.then( function(response){
		// console.log(response)
		return response.json()
	})

	.then( function(user){
		console.log("user FETCH",user.results[0].name.first)
	})

	.catch( function() {
		console.error("Señores, he fallado")
	});
//si no colocas settings la coloca por defecto

//las promesas pueden devolver una promesa y asi sucesivament

//results es un array



const requestIronMan = "https://gateway.marvel.com:443/v1/public/characters?name=Iron%20Man&limit=10&apikey=8a51c58308bb4e6fb2b8532c7e7536d3"


const settingsMarvel = {

  method: 'POST', // or 'PUT'
 // body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }

}


fetch(requestIronMan)

	.then( function(response, settingsMarvel){
		// console.log(response)
		return response.json()
	})

	.then( function(user){
		console.log("TED FETCH",user )
	})

	.catch( function() {
		console.error("Señores, he fallado")
	});	




/*
$.ajax({
  url: 'https://randomuser.me/api/',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
    
*/

(async function load() {
	
	//await

	/*
	animation
	action
	terror
	*/

	async function getData(url) {
	//Espera a que esto se ejecute
	const response = await fetch(url)
	//como es una funcion asincrona no hace falta el .then

	const movieRequest = await response.json() //respuesta del metodo json

	return movieRequest;
	}

	const api = "https://yts.am/api/v2/list_movies.json"	

	//esto necesita el await porque devuelve una promesa arriba y tiene que esperar
	const actionList = await getData(`${api}?genre=action`)
	const terrorList = await getData(`${api}?genre=terror`)
	const animationList = await getData(`${api}?genre=animation`)


	console.log("actionList", actionList);
	console.log("terrorList", terrorList);
	console.log("animationList", animationList);
})() //esta funcion se autoejecuta


//con funciones asincronas simplifico fetch

/*URLs APIs
https://yts.am/api
*/