
const pokeApi = {};

function convertPokeApiDetailToPokemonHome(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
};

function convertPokeApiInfoToPokemonDetail(PokeInfo) {
    const pokemon = new InfoPokemon();
    pokemon.id = PokeInfo.id;
    pokemon.name = PokeInfo.name;

    const types = PokeInfo.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = PokeInfo.sprites.other.dream_world.front_default;
    pokemon.height = PokeInfo.height;
    pokemon.weight = PokeInfo.weight;

    pokemon.abilities = PokeInfo.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.baseStats = PokeInfo.stats.map((statSlot) => {
        return [statSlot.stat.name, statSlot.base_stat];
    });
    return pokemon;
};

function numberBeforeId(id) {
    let number = "00";

    if (id >= 10) number = "0";
    if (id >= 100) number = "";

    return number;
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json());
};


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then(pokeDetail => pokeDetail.map(pokemon => { 
            return convertPokeApiDetailToPokemonHome(pokemon)
        }))
        .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getInfoPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((response) => response.json())
        .then((infoPokemon) => convertPokeApiInfoToPokemonDetail(infoPokemon));             
}

