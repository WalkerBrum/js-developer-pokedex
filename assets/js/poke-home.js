const pokemonList = document.getElementById('pokemonList');
const poke = document.getElementById('poke');

function convertPokemonHomeToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="poke">
            <a href="pokemon.html?id=${pokemon.number}" >
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                         alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `;
};

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonHomeToLi).join('');
        pokemonList.innerHTML += newHtml;  
    });    
};


