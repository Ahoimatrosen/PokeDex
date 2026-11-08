function getPokedexTemplate(indexPokemonInfoList, pokemonInfo) {
    return `
    <div id="pokemon${indexPokemonInfoList}" class="card m-3" style="width: 18rem">
        <div   div class="card-body">
        <img src="${pokemonInfo.sprites.front_default}" class="card-img" alt="pokemon-img" />
        <h5 class="mt-2 mb-0">${pokemonInfo.name.toUpperCase()}</h5>
        <ul>
        <li>id: ${pokemonInfo.id}</li>
        <li>height: ${pokemonInfo.height}cm</li>
        <ul>
        ${getTypesTemplate(pokemonInfo)}
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
