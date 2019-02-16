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


	function videoItemTemplate(movie,category) {

		return(
			 `<div class="primaryPlaylist" data-id="${movie.id}" data-category=${category}>
	            <h3 class="primaryPlaylist-topic">Está de locos</h3>
	            <h2 class="primaryPlaylist-title">${movie.title}</h2>

	            <div class="primaryPlaylist-list" id="${movie.title}">
	              <div class="primaryPlaylistItem" >


	                <div class="primaryPlaylistItem-image">
	                  <img src=${movie.medium_cover_image}>
	                </div>
	                <h4 class="primaryPlaylistItem-title">
	                  ${movie.title}
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

	function showModal($element) {

		//quitar display none overlay
		$overlay.classList.add("active");

		let {

			id,
			category

		} = $element.dataset



		//convirtiendo el id de string a entero	
	    id =  parseInt(id, 10) //base 10

	    debugger


		//quitar translate de modal
		$modal.style.animation = "modalIn .8s forwards"; //Curso animancione sweb

		const data = findMovie(id,category)

			//para optimizar el codigo buscamos en modal
		$modalTitle.textContent = data.title 
		$modalImage.src = data.medium_cover_image  
		$modalDescription.textContent =  data.description_full

	}


	function findById(list, id) {


		/*Usaremos el mètodo find de un array*/
		return list.find( (movie) => movie.id === id )
		debugger
	}

	function findMovie(id,category) {

		/*Aqui filtraremos datos para encontrar algo especifico*/

		switch (category) {

			case "action" : {

				return findById(actionList, id)
				

			}

			case "animation" : {

				return findById(animationList, id)

			}

			case "drama" : {

				return findById(dramaList, id)
				
			}

			default: {
				return findById(animationList, id)
			}
		}



	}


	/*mientras mas propenso me hago a actuar
	me doy cuenta de que es importante hacerme tambien propenso deternerme a pensar
	a visualizar, estructurar, modelar mis ideas antes de testearlas

	clarificar imagenes, hacer preguntas, pensar en los conceptos para asi haciendo menos logrando mas*/

	function hideModal() {
		
		//quitar translate de modal
		$modal.style.animation = "modalOut .8s forwards" //Curso animancione sweb
		//$modal.style.transform = "translateY(0px)"

		//quitar display none overlay
		setTimeout(()=>{
		$overlay.classList.toggle('active');
		},1000);
	}

	function renderMoviesList(movieList, $container, category) {

		$container.children[0].remove(); //eliminando gif que carga
		//remove elimina el elemento


		//Funcion para mostrar en consola las peliculas
		movieList.forEach( (movie) => {

		
		const HTMLString = videoItemTemplate( movie , category )

		const movieElement = createTemplate(HTMLString)

		//Pasando elemento al DOM
		$container.append(movieElement)

		showModalOnClick(movieElement)
		})
	}

	function setAttributes($element, attributes, $innerHTML) {
		
		//loop for Setting attributes
		for(const attribute in attributes) {

			$element.setAttribute(attribute, attributes[attribute])
		}

		$element.innerHTML = $innerHTML
	}

	async function toggleSearchActive(evento) {
			
			/*INICIALIZACIÓN DE ARCHIVO
			============================*/
			evento.preventDefault();		
			
			
			/*DECLARACIÓN DE VARIABLES
			===========================*/
			const $loader = document.createElement("IMG");
			const $copyText = document.createElement("P");

			
			//Creando un objeto FormData		
			const data = new FormData($form);

			/*usando destructuring asignment
			para obtener una variable*/
			const {

				data: {
					movies: pelis
				} 

			} = await getData(`${BASE_API}?limit=1&query_term=${data.get("name")}`)
			//Esto es una peticion GET


			const HTMLstring = movieFoundTemplate(pelis[0]);
			$featuringContainer.innerHTML = HTMLstring;


			/*EJECUCION FUNCIONES RENDER
			=============================*/
			$home.classList.toggle("search-active"); //on - off in this class

			setAttributes($loader, {
				src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Emoji_u1f60f.svg/128px-Emoji_u1f60f.svg.png",
				height: 30,
				width: 30,
			})
			setAttributes($copyText, null, `${nombreUsuario}, Apuesto que esta es la  pelicula que buscas, ¿O no?` )

			$featuringContainer.append($copyText)	
			$featuringContainer.append($loader)
		
	}

	function movieFoundTemplate(peli) {
		return (
		`<div class="featuring">
      		<div class="featuring-image">
        		<img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        	</div>
        	
        	<div class="featuring-content">
        		<p class="featuring-title">Pelicula encontrada</p>
        		<p class="featuring-album">${peli.title}</p>
        	</div>
        </div>`)
	}

	function showModalOnClick($element) {

		$element.addEventListener("click", () => {
			showModal($element)
		})
	}


	/*DECLARACIÓN DE VARIABLES
	============================*/

	/*API data
	==================*/

	const BASE_API = "https://yts.am/api/v2/list_movies.json"	

	//esto necesita el await porque devuelve una promesa arriba y tiene que esperar
	const { data: { movies: actionList } } = await getData(`${BASE_API}?genre=action`)
	const { data: { movies: dramaList } } = await getData(`${BASE_API}?genre=drama`)
	const { data: { movies: animationList } } = await getData(`${BASE_API}?genre=animation`)


	/*Selectores HTML
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

	renderMoviesList(actionList , $actionContainer, "action")
	renderMoviesList(dramaList , $dramaContainer, "drama")
	renderMoviesList(animationList , $animationContainer, "animation")

})() //esta funcion que se autoejecuta gracias a los ultimos parentesis

/* 
¿Cuantos procesos independientes hay en mi programa?

Es util convertir todo lo que puedas en una funcion de una forma reutilizable en otras partes de tu APP

*/




/*PREGUNTAS CLAVES
¿Como obtengo el dato del formulario? para realizar una peticion personanilzada

Opciones:
querySelector + value
formData

*/





/*
lista de preguntas para tomar accion
¿Que me queda de este conocimiento?
¿Como puedo utilizar esto?
¿Cual es el primer paso para accionar?
¿Que paso debo tomar ahora?

*/


/*
¿Cómo aprendo al máximo y mejoro mi arte y mi vida a través de este curso?
- Prestando la màxima atenciòn y elimando todas las distracciones a mi alrededor
- Haciendome preguntas
- Accionando lo que dice
- Comprendiendo lo que accionando
- Replicando por mi mismo lo que aprendi con proyectos y necesidades propias
- Haciendome preguntas respecto a lo que dice
- Dandole pausa
- Si no entiendo, siguiendo y teniendo fe
*/


/*
Conceptos claves de este curso de desustrucutraciuon de obejto

Asignacion por desustructuracion

*/



/*
blog


usando el metodo find con una funcion
el arte de cazar bugs
retornar errores con eso
*/


/*dataset arroja datos ordenados

data-id
data-class
data-src
data-category*/