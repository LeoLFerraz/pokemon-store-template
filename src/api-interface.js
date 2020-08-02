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
            let localGenerations = localStorage.getItem('generations');
            // return parsed local storage if OK
            localPokemon = JSON.parse(localPokemon);
            localTypes = JSON.parse(localTypes);
            localGenerations = JSON.parse(localGenerations);
            let result = {
                pokemon: localPokemon,
                types: localTypes,
                generations: localGenerations
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
                                        let generationList = [];
                                        let length = json.pokemon.length;
                                        let processed = 0;
                                        pokemonList.push(new Pokemon({
                                            name: 'Agumon',
                                            id: 'd1',
                                            seller: 'digiStore',
                                            sprite: require('./assets/media/agumon.png'),
                                            sprites: [require('./assets/media/agumon.png')],
                                            types: ['fire', 'dragon'],
                                            evolutions: [
                                                {
                                                    name: 'Agumon',
                                                    id: 'd1',
                                                    sprite: require('./assets/media/agumon.png'),
                                                }
                                            ],
                                            stats: {
                                                "hp": 100,
                                                "attack": 70,
                                                "defense": 70,
                                                "special-attack": 20,
                                                "special-defense": 20,
                                                "speed": 20
                                            }
                                        }));
                                        pokemonList.push(new Pokemon({
                                            name: 'Patamon',
                                            id: 'd4',
                                            seller: 'digiStore',
                                            sprite: require('./assets/media/patamon.png'),
                                            sprites: [require('./assets/media/patamon.png')],
                                            types: ['fire', 'dragon'],
                                            evolutions: [
                                                {
                                                    name: 'Agumon',
                                                    id: 'd1',
                                                    sprite: require('./assets/media/patamon.png'),
                                                }
                                            ],
                                            stats: {
                                                "hp": 100,
                                                "attack": 70,
                                                "defense": 70,
                                                "special-attack": 20,
                                                "special-defense": 20,
                                                "speed": 20
                                            }
                                        }));
                                        pokemonList.push(new Pokemon({
                                            name: 'Gabumon',
                                            id: 'd2',
                                            seller: 'digiStore',
                                            sprite: require('./assets/media/gabumon.png'),
                                            sprites: [require('./assets/media/gabumon.png')],
                                            types: ['fire', 'ice'],
                                            evolutions: [
                                                {
                                                    name: 'Gabumon',
                                                    id: 'd2',
                                                    sprite: require('./assets/media/gabumon.png'),
                                                }
                                            ],
                                            stats: {
                                                "hp": 80,
                                                "attack": 25,
                                                "defense": 25,
                                                "special-attack": 50,
                                                "special-defense": 50,
                                                "speed": 15
                                            }
                                        }));
                                        pokemonList.push(new Pokemon({
                                            name: 'Terriermon',
                                            id: 'd3',
                                            seller: 'digiStore',
                                            sprite: require('./assets/media/terriermon.png'),
                                            sprites: [require('./assets/media/terriermon.png')],
                                            types: ['fire', 'flying', 'cyber'],
                                            evolutions: [
                                                {
                                                    name: 'Terriermon',
                                                    id: 'd3',
                                                    sprite: require('./assets/media/terriermon.png'),
                                                }
                                            ],
                                            stats: {
                                                "hp": 50,
                                                "attack": 10,
                                                "defense": 10,
                                                "special-attack": 10,
                                                "special-defense": 10,
                                                "speed": 30
                                            }
                                        }));

                                        pokemonList.forEach(pokemon =>{
                                            pokemon.types.forEach(type =>{
                                                if (!typeList.includes(type)){
                                                    typeList.push(type);
                                                }
                                            })
                                        });
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
                                                                                                                                result.sprites = Object.values(pokemonData.sprites).filter(sprite => {
                                                                                                                                    return (typeof sprite === 'string')
                                                                                                                                });
                                                                                                                                result.generation = speciesData.generation.name;
                                                                                                                                if (!generationList.includes(result.generation)){
                                                                                                                                    generationList.push(result.generation);
                                                                                                                                }
                                                                                                                                result.evolutions = evolutions;
                                                                                                                                result.stats = getStats(pokemonData.stats);
                                                                                                                                pokemonList.push(new Pokemon(result));
                                                                                                                                processed += 1;
                                                                                                                                if (processed === length){
                                                                                                                                    let result = {
                                                                                                                                        pokemon: pokemonList,
                                                                                                                                        types: typeList,
                                                                                                                                        generations: generationList
                                                                                                                                    };
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
                                        localStorage.setItem('generations', JSON.stringify(result.generations));
                                        resolve(result);
                                    });
                                });
                    })
        }
    });
}
