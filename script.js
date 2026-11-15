let offset = 0;
async function init() {
    const pokemonList = await getPokemonList(offset);
    const pokemonInfoList = await getPokemonInfoList(pokemonList);
    const singlePokemonTypes = await getSinglePokemonTypes(pokemonInfoList);
    renderPokemonInfo(pokemonInfoList);

    console.log(pokemonList);
    console.log(pokemonInfoList);
    console.log(singlePokemonTypes);
}

// holt die Namen und URLs der Pokemon
async function getPokemonList(offset) {
    let POKE_API_POKEMON = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
    let pokemonListResponse = await fetch(POKE_API_POKEMON);
    let pokemonListResponseJson = await pokemonListResponse.json();
    return pokemonListResponseJson.results;
}
// holt die Infos der einzelnen Pokemon
async function getPokemonInfoList(pokemonList) {
    const pokemonPromises = [];
    for (let indexPokemonList = 0; indexPokemonList < pokemonList.length; indexPokemonList++) {
        const pokemon = pokemonList[indexPokemonList];
        pokemonPromises.push(fetch(pokemon.url).then((pokemonResponse) => pokemonResponse.json()));
    }
    return await Promise.all(pokemonPromises);
}

async function getSinglePokemonTypes(pokemonInfoList) {
    for (let indexPokemonInfoList = 0; indexPokemonInfoList < pokemonInfoList.length; indexPokemonInfoList++) {
        const singlePokemonTypePromises = [];
        const pokemonInfo = pokemonInfoList[indexPokemonInfoList];
        for (let indexSinglePokemonTypes = 0; indexSinglePokemonTypes < pokemonInfo.types.length; indexSinglePokemonTypes++) {
            const pokemonTypes = pokemonInfo.types[indexSinglePokemonTypes];
            singlePokemonTypePromises.push(fetch(pokemonTypes.type.url).then((pokemonTypeResponse) => pokemonTypeResponse.json()));
        }
        pokemonInfo.singlePokemonType = await Promise.all(singlePokemonTypePromises);
    }
}

// bildet Pokemonkarten ab
function renderPokemonInfo(pokemonInfoList) {
    for (let indexPokemonInfoList = 0; indexPokemonInfoList < pokemonInfoList.length; indexPokemonInfoList++) {
        const pokemonCardRef = document.getElementById("pokemon-card");
        const pokemonInfo = pokemonInfoList[indexPokemonInfoList];
        pokemonCardRef.innerHTML += getPokemonCardTemplate(pokemonInfo);
        renderPokemonTypes(pokemonInfo);
    }
}

function renderPokemonTypes(pokemonInfo) {
    for (let indexPokemonTypes = 0; indexPokemonTypes < pokemonInfo.singlePokemonType.length; indexPokemonTypes++) {
        const pokemonTypesListRef = document.getElementById("types-list" + pokemonInfo.id);
        pokemonType = pokemonInfo.singlePokemonType[indexPokemonTypes];
        pokemonTypesListRef.innerHTML += getTypesListTemplate(pokemonType);
    }
}

// lädt 20 mehr Pokemon
async function loadMorePokemon() {
    offset = offset + 20;
    const nextPokemonList = await getPokemonList(offset);
    const nextPokemonInfoList = await getPokemonInfoList(nextPokemonList);
    const nextsinglePokemonTypes = await getSinglePokemonTypes(nextPokemonInfoList);

    renderPokemonInfo(nextPokemonInfoList);
}
