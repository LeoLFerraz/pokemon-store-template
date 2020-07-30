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
            // return parsed local storage if OK
            localPokemon = JSON.parse(localPokemon);
            resolve(localPokemon);
        } else {
            // else, load API info, store on local storage and return parsed info.
            fetch('https://pokeapi.co/api/v2/type/10')
                    .then((response) =>{
                        response.json()
                                .then((json) => {
                                    let pokemonLoop = new Promise((resolve, reject) =>{
                                        let pokemonList = [];
                                        let length = json.pokemon.length;
                                        let processed = 0;
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
                                                                                                                                result.types = pokemonData.types;
                                                                                                                                result.sprite = pokemonData.sprites.front_default;
                                                                                                                                result.spriteShiny = pokemonData.sprites.front_shiny;
                                                                                                                                result.generation = speciesData.generation.name;
                                                                                                                                result.evolutions = evolutions;
                                                                                                                                pokemonList.push(new Pokemon(result));
                                                                                                                                processed += 1;
                                                                                                                                if (processed === length){
                                                                                                                                    resolve(pokemonList);
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
                                        result.sort((a, b) => {
                                            return a.id - b.id;
                                        })
                                        localStorage.setItem('pokemon', JSON.stringify(result));
                                        resolve(result);
                                    });
                                });
                    })
        }

        // Loading info:
        // get /type/{storeType} from API
        // For each pokemon in data.pokemon:
        // get pokemon.url and process data to fit model (src/models/Pokemon.js)
    });
}
