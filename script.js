offset = 0;
async function init() {
    const pokemonList = await getPokemonList(offset);
    const pokemonInfoList = await getPokemonInfoList(pokemonList);
    renderPokemonInfo(pokemonInfoList);

    console.log(pokemonInfoList);
}

async function getPokemonList(offset) {
    let POKE_API_BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
    let pokemonListResponse = await fetch(POKE_API_BASE_URL);
    let pokemonListResponseJson = await pokemonListResponse.json();
    return pokemonListResponseJson.results;
}

async function getPokemonInfoList(pokemonList) {
    const pokemonPromises = [];
    for (let indexPokemonList = 0; indexPokemonList < pokemonList.length; indexPokemonList++) {
        const pokemon = pokemonList[indexPokemonList];
        pokemonPromises.push(fetch(pokemon.url).then((pokemonResponse) => pokemonResponse.json()));
    }
    return await Promise.all(pokemonPromises);
}

function renderPokemonInfo(pokemonInfoList) {
    for (let indexPokemonInfoList = 0; indexPokemonInfoList < pokemonInfoList.length; indexPokemonInfoList++) {
        const pokedexRef = document.getElementById("pokedex");
        const pokemonInfo = pokemonInfoList[indexPokemonInfoList];
    }
}

async function loadMorePokemon() {
    offset = offset + 20;
    POKE_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon?offset=" + offset;
    const nextPokemonList = await getPokemonList(offset);
    const nextPokemonInfoList = await getPokemonInfoList(nextPokemonList);
    renderPokemonInfo(nextPokemonInfoList);
}
