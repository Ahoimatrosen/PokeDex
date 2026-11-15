function getPokemonCardTemplate(pokemonInfo) {
    return `
    <div id="pokemon${pokemonInfo.id}" class="card m-3 ${pokemonInfo.types[0].type.name}-type-background" style="width: 18rem">
    <header class="d-flex justify-content-between card-background">
        <h4 class="mt-2 mb-0">${pokemonInfo.name.toUpperCase()}</h4>
        <h4 class="mt-2 mb-0">#${pokemonInfo.id}</h4>
    </header>
        <div class="card-body ">
       
            <img 
                src="${pokemonInfo.sprites.other["official-artwork"].front_default}" 
                class="card-img mt-4 mb-4" 
                alt="${pokemonInfo.name}" 
            />
            </div>
            <footer class="card-background">
                <div class="d-flex justify-content-around" id="types-list${pokemonInfo.id}"></div>
            </footer>
    </div>`;
}

function getTypesListTemplate(pokemonType) {
    return `
        <img class="rounded-circle" src="${pokemonType.sprites["generation-ix"].champions["symbol_icon"]}" alt="pokemon-type-symbol">
    `;
}
