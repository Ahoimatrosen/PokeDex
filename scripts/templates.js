function getPokedexTemplate(indexPokemonInfoList, pokemonInfo) {
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
        
       
        <ul>
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
