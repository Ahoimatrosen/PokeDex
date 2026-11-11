function getPokedexTemplate(indexPokemonInfoList, pokemonInfo) {
    return `
    <div id="pokemon${indexPokemonInfoList}" class="card m-3 ${pokemonInfo.types[0].type.name}-type-background" style="width: 18rem">
        <div   div class="card-body">
        <h5 class="mt-2 mb-0">${pokemonInfo.name.toUpperCase()}</h5>
        <img src="${pokemonInfo.sprites.front_default}" class="card-img" alt="pokemon-img" />
        <ul>
            <li>id: ${pokemonInfo.id}</li>
            <li>height: ${pokemonInfo.height / 10} m</li>
            <li>weight: ${pokemonInfo.weight / 10}kg</li>
            <b>types:</b>
            <li>
                <ul>
                    ${getTypesTemplate(pokemonInfo)}
                </ul>
            </li>
        </ul>
        </div>
    </div>`;
}

function getTypesTemplate(pokemonInfo) {
    let typesHtml = "";
    for (let indexTypes = 0; indexTypes < pokemonInfo.types.length; indexTypes++) {
        const types = pokemonInfo.types[indexTypes];
        typesHtml += `<li>${types.type.name}</li>`;
    }
    return typesHtml;
}
