const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon";

async function getDataFromPokeApi() {
    let response = await fetch(POKE_API_URL);
    let responseToJson = await response.json();
    console.log(responseToJson);
}
