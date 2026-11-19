let offset = 0;
let allPokemon = [];

async function init() {
    const pokemonList = await getPokemonList(offset);
    const pokemonInfoList = await getPokemonInfoList(pokemonList);
    const singlePokemonTypes = await getSinglePokemonTypes(pokemonInfoList);

    savePokemonInfo(pokemonInfoList);
    renderPokemonInfo(pokemonInfoList);

    console.log(pokemonList);
    console.log(pokemonInfoList);
    console.log(singlePokemonTypes);
    console.log(allPokemon);
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

// lädt 20 mehr Pokemon
async function loadMorePokemon() {
    offset = offset + 20;
    const nextPokemonList = await getPokemonList(offset);
    const nextPokemonInfoList = await getPokemonInfoList(nextPokemonList);
    const nextsinglePokemonTypes = await getSinglePokemonTypes(nextPokemonInfoList);
    savePokemonInfo(nextPokemonInfoList);

    renderPokemonInfo(nextPokemonInfoList);
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

function fillPokemonDetails(pokemonId) {
    const currentPokemon = allPokemon.find((pokemon) => pokemon.id === pokemonId);
    document.getElementById("offcanvas-pokemon-name").innerHTML = currentPokemon.name.toUpperCase();
    document.getElementById("offcanvas-pokemon-id").innerHTML = "#" + currentPokemon.id;
    document.getElementById("offcanvas-pokemon-img").setAttribute("src", currentPokemon.sprites.other["official-artwork"].front_default);
    document.getElementById("offcanvas-header").setAttribute("class", currentPokemon.types[0].type.name + "-type-background");
    document.getElementById("base-stats-tab-pane").innerHTML = "";
    for (let indexBaseStats = 0; indexBaseStats < currentPokemon.stats.length; indexBaseStats++) {
        const baseStat = currentPokemon.stats[indexBaseStats];
        document.getElementById("base-stats-tab-pane").innerHTML += getBaseStatTableTemplate(baseStat);
    }
}

function savePokemonInfo(infoList) {
    for (let indexAllPokemon = 0; indexAllPokemon < infoList.length; indexAllPokemon++) {
        const info = infoList[indexAllPokemon];

        allPokemon.push(info);
    }
}
