async function show() {
  const list = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0',
  ).then(response => response.json());
  const pokemons = await Promise.all(
    list.results.map(async item => {
      const pokemon = await fetch(item.url).then(response => response.json());
      pokemon.species = await fetch(pokemon.species.url).then(response =>
        response.json(),
      );
      return pokemon;
    }),
  );
  console.log(pokemons);
  renderElements(pokemons);
}

show();

function renderElements(data) {
  const item = document.querySelector('.items');
  item.innerHTML += createElement(data);
}

function createElement(data) {
  const dados = data
    .map(
      pokemon => `
  <div class="items__card">
    <figure>
      <img class="fig__poke" src="${pokemon.sprites.front_default}">
    </figure>
    <p>${pokemon.name}</p>
    <p>${pokemon.species.egg_groups
      .map(item => item.name)
      .filter(item => item !== 'monster')}</p>
  </div>
  `,
    )
    .join('');

  return dados;
}
