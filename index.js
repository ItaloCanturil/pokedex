async function show() {
  const list = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0',
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
  renderElements(pokemons);
  search(pokemons);
}

show();

function renderElements(data) {
  const item = document.querySelector('.items');
  item.innerHTML = '';
  item.innerHTML += createElement(data);
}

function createElement(data) {
  const dados = data
    .map(
      pokemon => `
  <section class="items__card">
    <figure class="card__fig">
      <img class="fig__poke" src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png">
    </figure>
    <div class="card__org">
      <p class="org__name">${pokemon.name}</p>
      <p class="org__group">${pokemon.types
        .map(
          item =>
            `<span class="race race-${item.type.name}">${item.type.name}</span>`,
        )
        .join('')}</p>
  </section>
  `,
    )
    .join('');

  return dados;
}

function search(data) {
  const $search = document.querySelector('.search');
  $search.addEventListener('input', e => {
    const searchPokemons = data.filter(elements =>
      elements.name.includes(e.target.value.toLowerCase()),
    );
    renderElements(searchPokemons);
  });
}
