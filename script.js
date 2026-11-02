const POKE_API_ALL_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=1352";

async function getDataFromPokeApi() {
    let response = await fetch(POKE_API_ALL_POKEMON);
    let responseToJson = await response.json();
    console.log(responseToJson);
}
