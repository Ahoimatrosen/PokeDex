const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function init() {
    const pokemonList = await getPokemonList();
    const pokemonInfoList = await getPokemonInfoList(pokemonList);
    renderPokemonInfo(pokemonInfoList);

    console.log(pokemonList);
    console.log(pokemonInfoList);
}

async function getPokemonList() {
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
        pokedexRef.innerHTML += getPokedexTemplate(indexPokemonInfoList, pokemonInfo);
    }
}
