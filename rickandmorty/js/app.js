const url_api = 'https://rickandmortyapi.com/api'


  const getApi = async (apiURL, isHome) => {
    const response = await fetch(apiURL);
    const resJSON = await response.json();
    if(isHome){
      const { results } = resJSON;
      return results;
    }else{
      return resJSON;

    }
  };

  function obtenerTodosLosPersonajes(){
    let url = `${url_api}/character`
    getApi(url, true).then(results => {
      renderPersonajes(results)
      })
  }
function renderPersonajes(arrPersonajes){

  const container = document.getElementById('app')
  let html = ''
  arrPersonajes.forEach(personaje => {
    html += `
      <div class="personaje">
        <img src="${personaje.image}" alt="${personaje.name}">
        <h3>${personaje.name}</h3>
        <p>${personaje.location.name}</p>
        <a href="single/?id=${personaje.id}">Ver más</a>
      </div>
    `
  })
  container.innerHTML = html

}
if(window.location.pathname === '/'){
  obtenerTodosLosPersonajes()
}else{
  const id = window.location.search.split('=')[1]
  if(id){
   
    obtenerSingle(id)
  }
}

async function obtenerSingle(id){
  let url = `${url_api}/character/${id}`
  console.log(url)
  await getApi(url, false).then(results => {
    renderSingle(results)
  
    })
}

function renderSingle(results) {
  const container = document.getElementById('single')
  let html = '' 

   html += `
    <div class="personaje">
      <img src="${results.image}" alt="${results.name}">
      <h3>${results.name}</h3>
      <p>${results.location.name}</p>
      <p>${results.origin.name}</p>
      <p>${results.species}</p>
      <p>${results.status}</p>
      <p>${results.type}</p>
  
  
    </div>
  ` 
  container.innerHTML = html

}