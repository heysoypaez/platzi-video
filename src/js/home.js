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

					const dataRequest = await response.json() //respuesta del metodo json

					//dataRequest.data nos permite acceder a la api de las peliculas
					//necesito otra forma de validar que estoy manejando la API de peliculas
					if (dataRequest.data !== undefined) {

								const { data: {movie_count} } = dataRequest

								if(movie_count > 0) {

									return dataRequest;
								}
								//Si no hay pelis esto sucede
								else {
									
									//Throw funciona como un return  
									throw new Error(`😓 Me disgusta cuando pasa esto ${nombreUsuario}, busqué y busqué y no encontré NADA `);
								}
					}

					else {

						return dataRequest;
					}
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


					try {

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
					} 

					catch(error) {
						
						$loader.remove();
						$home.classList.remove("search-active")

						alert(error.message)

					}
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

		//convierte string en html
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

		function hideModal() {
			
			//quitar translate de modal
			$modal.style.animation = "modalOut .8s forwards" //Curso animancione sweb

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
				const movieElement = createTemplate(HTMLString) //Convirtiendo en HTML

				$container.append(movieElement) //Pasando elemento al DOM

				const image = movieElement.querySelector("img")
				image.addEventListener("load",(event) => {

					/*colocamos event.srcElement, srcElement es el elemento
					que lanzó el evento*/

					event.srcElement.classList.add("fadeIn") //agregando animacion css usando clases

				})
				

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

		//======

			function friendPlayListTemplate(friend) {

				return (

					`<li class="playlistFriends-item">
	              <a href="#">
	                <img src="${friend.picture.thumbnail}" alt="${friend.name.first}-${friend.name.last}-picture" />
	                <span>
	                  ${friend.name.first} ${friend.name.last}
	                </span>
	              </a>
	            </li>`
	      )
			}

			function renderFriendPlaylist(friend) {

				const HTMLString = friendPlayListTemplate(friend);
				const $friendPlayListItem = createTemplate(HTMLString)
				return $playlistFriendsPrincipal.appendChild($friendPlayListItem)
			}

			async function renderAllFriendsPlaylist(friendsLimit) {

				for (let i = 0; i < friendsLimit; i++) {

					let {results: [friend] } = await getData('https://randomuser.me/api/')
					renderFriendPlaylist(friend)
				}
			}

		//=========

		function moviesPlaylistTemplate(movie) {
			return(
				`<li class="myPlaylist-item">
              <a href="#">
                <span>
                  ${movie.title}
                </span>
              </a>
          </li>`
      )
		}

		function renderMoviesPlaylist(movie) {

				const HTMLString = moviesPlaylistTemplate(movie);
				const $moviePlayListItem = createTemplate(HTMLString)
				return $playlistMoviesPrincipal.appendChild($moviePlayListItem)
		}

		async function renderAllMoviesPlaylist(moviesLimit = 10) {

				for (let i = 0; i < moviesLimit; i++) {

					let {data: { movies } } = await getData(`${BASE_API}`)
					renderMoviesPlaylist(movies[i])
				}
		}


	/*DECLARACIÓN DE VARIABLES
	============================*/


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

		const $playlistFriends = document.body.getElementsByClassName("playlistFriends")
		const $playlistFriendsPrincipal = $playlistFriends[0]

		const $playlistMovies = document.body.getElementsByClassName("myPlaylist")
		const $playlistMoviesPrincipal = $playlistMovies[0]



	/*API data
	==================*/

		const BASE_API = "https://yts.am/api/v2/list_movies.json"	

		//esto necesita el await porque devuelve una promesa arriba y tiene que esperar
		const { data: { movies: actionList } } = await getData(`${BASE_API}?genre=action`)
		window.localStorage.setItem("actionList", JSON.stringify(actionList))
		renderMoviesList(actionList , $actionContainer, "actio		n")

		const { data: { movies: dramaList } } = await getData(`${BASE_API}?genre=drama`)
		window.localStorage.setItem("dramaList", JSON.stringify(dramaList))
		renderMoviesList(dramaList , $dramaContainer, "drama")
		


		const { data: { movies: animationList } } = await getData(`${BASE_API}?genre=animation`)
		window.localStorage.setItem("animationList", JSON.stringify(animationList))
		renderMoviesList(animationList , $animationContainer, "animation")



		renderAllFriendsPlaylist(5)
		renderAllMoviesPlaylist()
		
	/*ESCUCHADORES DE EVENTOS
	==========================*/

		$form.addEventListener("submit", toggleSearchActive) //añadire un evento formulario
		$hideModal.addEventListener("click" , hideModal ) //evento modal (ficha de peli)


	/*EJECUCION DE FUNCIONES 
	================================*/

})() //esta funcion que se autoejecuta gracias a los ultimos parentesis



/*APUNTES BLOG APORTE

Las animaciones vienen en eventos
fadeIn
fadeOut

hacer peticiones en momento correcto para optimizar carga

optimizar animaciones para imagenes y objetos especificos
usando el evento load

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
Blog errores

Te vas a equivocar de eso no hay duda

Yo incluso estoy desarrollando el emocionarme al dar reload y ver donde me equivoque

la pregunta no es si te vas a equivocar sino donde

Y màs te vale (y me vale) que no te equivoques en lo mismo, que evites el error, que entiendas lo que hagas


Pero de todos modos te enseñare un sistema simple para manejar errores


Hay varios tipos de eroores
error http, error typo, cae internet
*/



/*
desafio para colocar en la playlist de amigos personas al azar usando ramdor user me


y my playlist colocar peliculas

 



*/