import Pokemon from './models/Pokemon'

// TODO: Refactor to use axios

function recursiveEvolutions(evolvesTo) {
    let result = [];
    if (evolvesTo.length > 0){
        evolvesTo.forEach((evolution) =>{
            result.push(evolution.species.url);
            result = result.concat(recursiveEvolutions(evolution.evolves_to));
        })
    }
    return result;
}

function getStats(stats){
    let result = {};
    stats.forEach((stat) =>{
        let name = stat.stat.name;
        let value = stat.base_stat;
        result[name] = value;
    })
    return result;
}

function searchEvolutionData(evolutions) {
    return new Promise((resolve, reject) => {
        let length = evolutions.length;
        let processed = 0;
        let result =[];
        evolutions.forEach((evolution) =>{
            fetch(evolution)
                    .then((response) => {
                        response.json()
                                .then((speciesData) =>{
                                    fetch(speciesData.varieties[0].pokemon.url)
                                            .then((response) =>{
                                                response.json()
                                                        .then((pokemonData) => {
                                                            result.push({
                                                                name: pokemonData.name,
                                                                id: pokemonData.id,
                                                                sprite: pokemonData.sprites.front_default
                                                            });
                                                            processed += 1;
                                                            if (processed === length){
                                                                resolve(result);
                                                            }
                                                        })
                                            })
                                })
                    })
        })
    });
}

export function APIInterface() {
    return new Promise((resolve, reject) => {
        const storeType = "fire";
        // Check local storage
        let localPokemon = localStorage.getItem('pokemon');
        if (localPokemon){
            let localTypes = localStorage.getItem('types');
            // return parsed local storage if OK
            localPokemon = JSON.parse(localPokemon);
            localTypes = JSON.parse(localTypes);
            let result = {
                pokemon: localPokemon,
                types: localTypes
            };
            resolve(result);
        } else {
            // else, load API info, store on local storage and return parsed info.
            fetch('https://pokeapi.co/api/v2/type/10')
                    .then((response) =>{
                        response.json()
                                .then((json) => {
                                    let pokemonLoop = new Promise((resolve, reject) =>{
                                        let pokemonList = [];
                                        let typeList = [];
                                        let length = json.pokemon.length;
                                        let processed = 0;
                                        pokemonList.push(new Pokemon({
                                            name: 'Agumon',
                                            id: 'd1',
                                            seller: 'digiStore',
                                            sprite: 'https://smallimg.pngkey.com/png/small/114-1146777_pixel-art-agumon-pixel-art.png',
                                            types: ['fire'],
                                            evolutions: [
                                                {
                                                    name: 'Agumon',
                                                    id: 'd1',
                                                    sprite: 'https://smallimg.pngkey.com/png/small/114-1146777_pixel-art-agumon-pixel-art.png'
                                                }
                                            ]
                                        }));
                                        pokemonList.push(new Pokemon({
                                            name: 'Gabumon',
                                            id: 'd2',
                                            seller: 'digiStore',
                                            sprite: 'https://www.spriters-resource.com/resources/sheet_icons/50/53431.png',
                                            types: ['fire'],
                                            evolutions: [
                                                {
                                                    name: 'Gabumon',
                                                    id: 'd2',
                                                    sprite: 'https://www.spriters-resource.com/resources/sheet_icons/50/53431.png'
                                                }
                                            ]
                                        }));
                                        pokemonList.push(new Pokemon({
                                            name: 'Patamon',
                                            id: 'd3',
                                            seller: 'digiStore',
                                            sprite: 'https://vignette.wikia.nocookie.net/pokemonwack/images/9/94/2952.png/revision/latest?cb=20200307181312',
                                            types: ['fire'],
                                            evolutions: [
                                                {
                                                    name: 'Patamon',
                                                    id: 'd3',
                                                    sprite: 'https://vignette.wikia.nocookie.net/pokemonwack/images/9/94/2952.png/revision/latest?cb=20200307181312'
                                                }
                                            ]
                                        }));

                                        json.pokemon.forEach((pokemon) =>{
                                            fetch(pokemon.pokemon.url)
                                                    .then((response) =>{
                                                        response.json()
                                                                .then((pokemonData) =>{
                                                                    fetch(pokemonData.species.url)
                                                                            .then((response) =>{
                                                                                response.json()
                                                                                        .then((speciesData) =>{
                                                                                            fetch(speciesData.evolution_chain.url)
                                                                                                    .then((response) =>{
                                                                                                        response.json()
                                                                                                                .then((evolutionData) => {
                                                                                                                    let evolutions = [evolutionData.chain.species.url];
                                                                                                                    evolutions = evolutions.concat(recursiveEvolutions(evolutionData.chain.evolves_to));
                                                                                                                    searchEvolutionData(evolutions)
                                                                                                                            .then((evolutions) =>{
                                                                                                                                let result = {};
                                                                                                                                result.id = pokemonData.id;
                                                                                                                                result.name = pokemonData.name;
                                                                                                                                result.types = pokemonData.types.map(type =>{
                                                                                                                                    let name = type.type.name;
                                                                                                                                    if (!typeList.includes(name)){
                                                                                                                                        typeList.push(name);
                                                                                                                                    }
                                                                                                                                    return name
                                                                                                                                });
                                                                                                                                result.sprite = pokemonData.sprites.front_default;
                                                                                                                                result.spriteShiny = pokemonData.sprites.front_shiny;
                                                                                                                                result.generation = speciesData.generation.name;
                                                                                                                                result.evolutions = evolutions;
                                                                                                                                result.stats = getStats(pokemonData.stats);
                                                                                                                                pokemonList.push(new Pokemon(result));
                                                                                                                                processed += 1;
                                                                                                                                if (processed === length){
                                                                                                                                    let result = {
                                                                                                                                        pokemon: pokemonList,
                                                                                                                                        types: typeList
                                                                                                                                    }
                                                                                                                                    resolve(result);
                                                                                                                                }
                                                                                                                            })
                                                                                                                });
                                                                                                    });
                                                                                        })
                                                                            });
                                                                })
                                                    });
                                        });
                                    });
                                    pokemonLoop.then((result) =>{
                                        result.pokemon.sort((a, b) => {
                                            return a.id - b.id;
                                        });
                                        localStorage.setItem('pokemon', JSON.stringify(result.pokemon));
                                        localStorage.setItem('types', JSON.stringify(result.types));
                                        resolve(result);
                                    });
                                });
                    })
        }
    });
}
