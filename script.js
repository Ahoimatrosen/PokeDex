const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function init() {
    const pokemonList = await getPokemonList();
    const pokemonInfo = await getPokemonInfo(pokemonList);
    console.log(pokemonList);
    console.log(pokemonInfo);
}

async function getPokemonList() {
    let pokemonListResponse = await fetch(POKE_API_BASE_URL);
    let pokemonListResponseJson = await pokemonListResponse.json();
    return pokemonListResponseJson.results;
}

async function getPokemonInfo(pokemonList) {
    const pokemonPromises = [];
    for (let indexPokemonList = 0; indexPokemonList < pokemonList.length; indexPokemonList++) {
        const pokemon = pokemonList[indexPokemonList];
        pokemonResponseJson = fetch(pokemon.url).then((pokemonResponse) => pokemonResponse.json());
        pokemonPromises.push(pokemonResponseJson);
    }
    return await Promise.all(pokemonPromises);
}
