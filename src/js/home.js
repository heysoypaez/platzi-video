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
==============================================================*/

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

/*=================================================*/


/*DECLARACION DE FUNCIONES ASINCRONAS
===========================================================================*/

(async function load() {
	

	/*DECLARACION DE FUNCIONES ASINCRONAS
	======================================*/
	async function getData(url) {

	//Espera a que esto se ejecute
	const response = await fetch(url) //como es una funcion asincrona no hace falta el .then

	const movieRequest = await response.json() //respuesta del metodo json

	return movieRequest;
	}


	/*DECLARACION DE FUNCIONES SINCRONAS
	======================================*/


	function videoItemTemplate(imgSrc , title) {

		return(
			 `<div class="primaryPlaylist">
	            <h3 class="primaryPlaylist-topic">Está de locos</h3>
	            <h2 class="primaryPlaylist-title">${title}</h2>

	            <div class="primaryPlaylist-list" id="${title}">
	              <div class="primaryPlaylistItem">
	                <div class="primaryPlaylistItem-image">
	                  <img src=${imgSrc}>
	                </div>
	                <h4 class="primaryPlaylistItem-title">
	                  ${title}
	                </h4>
	              </div>
	            </div>

	          </div>`
			)
	}

	function createTemplate(HTMLString) {
		
		const $html = document.implementation.createHTMLDocument();
		//creando un documento html

		$html.body.innerHTML = HTMLString;

		return $html.body.children[0];
		//Donde el hijo O es el elemento que creamos con videoItemTemplate()
	}

	function showModal() {

		//quitar display none overlay
		$overlay.classList.add("active")

		//quitar translate de modal
		$modal.style.animation = "modalIn .8s forwards" //Curso animancione sweb
	//	$modal.style.transform = "translateY(0px)"
	}

	function hideModal() {
		
		//quitar translate de modal
		$modal.style.animation = "modalOut .8s forwards" //Curso animancione sweb
		//$modal.style.transform = "translateY(0px)"

		//quitar display none overlay
		setTimeout(()=>{
		$overlay.classList.toggle('active');
		},1000);
	}

	function renderMoviesList(movieList, $container) {

		$container.children[0].remove(); //eliminando gif que carga
		//remove elimina el elemento


		//Funcion para mostrar en consola las peliculas
		movieList.data.movies.forEach( (movie) => {

		
		const HTMLString = videoItemTemplate(movie.medium_cover_image, movie.title)

		const movieElement = createTemplate(HTMLString)

		//Pasando elemento al DOM
		$container.append(movieElement)

		addEventClick(movieElement)
		})
	}


	function toggleSearchActive(evento) {
		
			console.log(evento)
			$home.classList.toggle("search-active")
			evento.preventDefault();	
	}

	function addEventClick($element) {

		$element.addEventListener("click", () => {
			showModal()
		})
	}


	/*DECLARACIÓN DE VARIABLES
	============================*/

	/*API data
	==================*/

	const api = "https://yts.am/api/v2/list_movies.json"	

	//esto necesita el await porque devuelve una promesa arriba y tiene que esperar
	const actionList = await getData(`${api}?genre=action`)
	const dramaList = await getData(`${api}?genre=drama`)
	const animationList = await getData(`${api}?genre=animation`)


	/*SELECTORES
	===================*/

	const $featuringContainer = document.querySelector("#featuring") 
	const $form = document.querySelector("#form") 
	const $home = document.querySelector("#home") 

	//El "$" es una convención para decir que es un elemento del DOM
	const $modal = document.getElementById("modal")


	const $actionContainer = document.querySelector("#action")
	const $animationContainer = document.getElementById("animation")
	const $dramaContainer = document.getElementById("drama")	

	
	const $overlay = document.getElementById("overlay")
	const $hideModal = document.getElementById("hide-modal")

	//para optimizar el codigo buscamos en modal
	const $modalImage =  $modal.querySelector("img")
	const $modalTitle =  $modal.querySelector("h1")
	const $modalDescription =  $modal.querySelector("p")


	/*ESCUCHADORES DE EVENTOS
	==========================*/

	$form.addEventListener("submit", toggleSearchActive) //añadire un evento formulario
	$hideModal.addEventListener("click" , hideModal ) //evento modal (ficha de peli)


	/*EJECUCION DE FUNCIONES 
	================================*/

	console.log("actionList", actionList);
	console.log("dramaList", dramaList);
	console.log("animationList", animationList);

	renderMoviesList(actionList , $actionContainer)
	renderMoviesList(dramaList , $dramaContainer)
	renderMoviesList(animationList , $animationContainer)

})() //esta funcion que se autoejecuta gracias a los ultimos parentesis

/* 
¿Cuantos procesos independientes hay en mi programa?

Es util convertir todo lo que puedas en una funcion de una forma reutilizable en otras partes de tu APP

*/


/*
queremos ocultar el grid de pelicula encontrada por defefcto
y queremos que se muestre solo cuando se hace una busqueda

para mostrarlo o no usamos la clase search-active


*/