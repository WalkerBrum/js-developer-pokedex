const pokemonList = document.getElementById('pokemonDetail');
const baseStatsWidth = document.querySelector('.progress-bar')

function convertPokemonDetailToLi(pokemon) {
    return `
        <div class="info-top ${pokemon.type}">
            <section class="menu">
                <a href="index.html"><i class="fas fa-arrow-left"></i></a>
                <i class="far fa-heart"></i>
            </section>
            <section class="info-pokemon">
                <div class="name-types">
                    <h2 class="name">${pokemon.name}</h2>
                    <ul class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ul>
                </div>
                <span class="id">#${pokemon.id}</span>
            </section>
            <section class="photo-pokemon">
                <img src="${pokemon.photo}"
                alt="${pokemon.name}" class="poke-img">
            </section>
        </div>
        <div class="info-bottom">
            <h3>About</h3>
            <div class="about">
                <div class="info-about">
                    <span class="title-about">Height</span>
                    <span class="value-about">${pokemon.height}</span>
                </div>
                <div class="info-about">
                    <span class="title-about">Weight</span>
                    <span class="value-about">${pokemon.weight} kg</span>
                </div>
                <div class="info-about">
                    <span class="title-about">Abilities</span>
                    <span class="value-about">Overgrow, Chlorophyl</span>
                </div>
            </div>
            <h3>Base Stats</h3>
            <div class="base-stats">
                ${pokemon.baseStats.map((stats) => {`
                    <div class="info-stats">
                        <span class="name-stats">${stats[0].replace('-', ' ')}</span>
                        <span class="value-stats">${stats[1]}</span>
                        <div class="status-bar">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                `}).join('')}
                
            </div>

        </div>
    `;
}

function loadInfoPokemon(id) {
    pokeApi.getInfoPokemon(id).then((pokemon) => {
        const newHtml = convertPokemonDetailToLi(pokemon);
        pokemonDetail.innerHTML += newHtml;  
    });    
}

function getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
};

window.onload = async () => {
    const { id } = getQueryParams();

    console.log(id)

    loadInfoPokemon(id);
}









