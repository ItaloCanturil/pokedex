function show () {
  fetch('https://pokeapi.co/api/v2/pokemon/')
  .then(response => response.json())
  .then(data => renderElements(data.results))
}

show()

function createElement(data) {
  console.log(data)
  const dados = data.map((item, index) => `
  <div>
    <figure>
      <img src="https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png">
    </figure>
    <p>${item.name}</p>
  </div>
  `).join('');

  return dados
}

function renderElements(data) {
  const item = document.querySelector('.item')
  item.innerHTML += createElement(data)
}