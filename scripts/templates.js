function getPokemonCardTemplate(indexPokemonInfoList, pokemonInfo) {
    return `
    <div id="pokemon${indexPokemonInfoList}" class="card m-3 ${pokemonInfo.types[0].type.name}-type-background" style="width: 18rem">
        <div class="card-body ">
            <header class="d-flex justify-content-between">
                <h4 class="mt-2 mb-0">${pokemonInfo.name.toUpperCase()}</h4>
                <h4 class="mt-2 mb-0">#${pokemonInfo.id}</h4>
            </header>
       
            <img 
                src="${pokemonInfo.sprites.other["official-artwork"].front_default}" 
                class="card-img " 
                alt="${pokemonInfo.name}" 
            />
            <div class="d-flex justify-content-around" id="types-list${indexPokemonInfoList}"></div>
        </div>
    </div>`;
}

function getTypesListTemplate(pokemonType) {
    return `
<img class="rounded-circle" src="${pokemonType.sprites["generation-ix"].champions["symbol_icon"]}" alt="">

    `;
}
