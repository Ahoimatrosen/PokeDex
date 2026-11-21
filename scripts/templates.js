function getPokemonCardTemplate(pokemonInfo) {
    return `
        <div onclick="fillPokemonDetails(${pokemonInfo.id})"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
            id="pokemon${pokemonInfo.id}" class="card m-3 ${pokemonInfo.types[0].type.name}-type-background" style="width: 18rem">
            <header class="d-flex justify-content-between card-background">
                <h4 class="mt-2 mb-0">${pokemonInfo.name.toUpperCase()}</h4>
                <h4 class="mt-2 mb-0">#${pokemonInfo.id}</h4>
            </header>
            <div class="card-body">    
                <img 
                    src="${pokemonInfo.sprites.other["official-artwork"].front_default}" 
                    class="card-img mt-4 mb-4" 
                        alt="${pokemonInfo.name}" 
                />
            </div>
            <footer class="card-background"> 
                <div class="d-flex justify-content-around" id="types-list${pokemonInfo.id}"></div>
            </footer>
        </div>    
    `;
}

function getTypesListTemplate(pokemonType) {
    return `
        <img class="rounded-circle" src="${pokemonType.sprites["generation-ix"].champions["symbol_icon"]}" alt="pokemon-type-symbol">
    `;
}

function getBaseStatTableTemplate(baseStat) {
    return `
    
    <tr class="w-100">
        <th>${baseStat.stat.name.toUpperCase()}</th>
        <td class="w-50">
            <div class="progress w-100" role="progressbar" aria-label="Example with label" aria-valuenow="0" aria-valuemin="0" aria-valuemax="255">
                <div class="progress-bar" style="width: ${(baseStat.base_stat / 255) * 100}%">${baseStat.base_stat}</div>
            </div>
        </td>
    </tr>

    `;
}

function getGeneralTableTemplate(currentPokemon) {
    return `
    
    <tr>
        <th><h4>Types:</h4></th>
        <td id="details-types" class="d-flex w-100"></td>
    </tr>

    <tr>
    
        <th><h4>Height:</h4></th>
        <td><h4>${currentPokemon.height / 10} m</h4></td>
    </tr>
    <tr>
        <th><h4>Weight:</h4></th>
        <td><h4>${currentPokemon.weight / 10} kg</h4></td>
    </tr>
    <tr>
        <th><h4>Abilities:</h4></th>
        <td class="d-flex justify-content-between" id="details-abilities">
            
        </td>
    </tr>
    
    
    `;
}

function getPokemonTypesInDetailsTemplate(pokemonTypeInDetails) {
    return `
    <img src="${pokemonTypeInDetails.sprites["generation-viii"]["brilliant-diamond-shining-pearl"].name_icon}" class="p-1 detail-types-img" alt="type-img">
    
    `;
}

function getPokemonAbilitiesInDetailsTemplate(ability) {
    return `

    <div class="ability-box"><h5>${ability.ability.name}</h5></div>

    `;
}
