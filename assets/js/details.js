const pokemonPage = document.querySelector('#pokemonPage');
const pokedex = document.querySelector('#pokedex');
const pokemonNum = document.querySelector('#pokemonNum');
const pokemonName = document.querySelector('#pokemonName');
const api = 'https://pokeapi.co/api/v2/';

async function getPokemonsSpecies(id, info) {
  const response = await fetch(`${api}pokemon-species/${id}`);
  const data = await response.json();

  if (info === 'egg_groups') {
    const eggGroups = data.egg_groups.map(eggs => eggs.name).join(', ');
    return eggGroups;
  } else if (info === 'specie') {
    const genus = data.genera.find(entry => entry.language.name === 'en');
    return genus.genus.split(' ')[0];
  }
}

async function getPokemon(pokemon) {
    const response = await fetch(`${api}pokemon/${pokemon}`);
    const data = await response.json();

    if (!pokedex.hasAttribute('hidden')) {
        pokedex.setAttribute('hidden', 'true');

        const pokemonInfoElement = document.querySelector('#pokemonInfo');

        const speciesInfo = await getPokemonsSpecies(data.id, 'specie');
        const speciesName = speciesInfo;

        pokemonPage.innerHTML = `
            <section class="content-stats ${data.types[0].type.name}" id="pokemonInfo">
                <div class="pokemon-top">
                    <a href="index.html"><img src="./assets/favicon/arrow_back.svg" alt="Ícone de retorno" class="icons"></a>
                </div>

                <div class="pokemon-name name">
                    <span>${data.name[0].toUpperCase() + data.name.substring(1)}</span>
                    <span>#${data.id}</span>
                </div>

                <div class="details">
                    <ol class="types">
                    ${data.types.map((type) => `<li class="type">${type.type.name}</li>`).join('')}
                    </ol>
                </div>

                <div class="pokemon-image">
                    <img src="${data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}" alt="${data.name}">
                </div>
            </section>

            <div class="pokemon-stats" id="pokemonStats">
                <nav>
                    <ul>
                        <li class="active">About</li>
                        <li>Base Stats</li>
                        <li>Evolution</li>
                        <li>Moves</li>
                    </ul>
                </nav>

                <div class="info-table">
                    <table>
                        <tr>
                            <td class="item">Species</td>
                            <td class="description">${speciesName}</td>
                        </tr>
                        <tr>
                            <td class="item">Height</td>
                            <td class="description">${data.height/10} m</td>
                        </tr>
                        <tr>
                            <td class="item">Weight</td>
                            <td class="description">${data.weight/10} Kg</td>
                        </tr>
                        <tr>
                            <td class="item">Abilities</td>
                            <td class="description">${data.abilities.map((ability) => ability.ability.name).join(', ')}</td>
                        </tr>
                        <tr>
                            <td class="item">Egg Groups</td>
                            <td class="description">${await getPokemonsSpecies(data.id, 'egg_groups')}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    }
}




