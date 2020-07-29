class Pokemon {
    // All Pokemon info is obtained from pokeapi.co
    constructor() {
        this.id = -1;
        /*
            Endpoint ID is found in: "pokemon".
            Property name: "id".
            The ID number is the same as the National Pokedex number for
            every pokemon.
        */
        this.name = "Undefined Name";
        /*
            Endpoint name is found in: "pokemon".
            Property name: "name".
            A pokemon's name will not change between its forms and varieties.
        */
        this.generation = "Undefined Generation";
        /*
            Endpoint generation is found in: "species".
            Property name: generation.name
            The generation's name follows a "generation-X" pattern where
            X is the generation's number.
            To access a Pokemon's generation, the API results path would be:
            pokemon.species.url <-- get request to url into 'response';
            response.generation.name
        */
        this.evolutions = ["Undefined Evolutions"];
        /*
            Endpoint evolutions are found in: "evolution_chain".
            Property name: "evolves_to".

            pokemon.species.url <-- get req to url into 'response1';
            response1.evolution_chain.url <-- get req to url into 'response2';
            response2.chain.evolves_to
            The 'evolves_to' property contains another 'evolves_to' property,
            which will NOT be empty as long as the pokemon has an evolution.
            Each 'evolves_to' property can point to the species name through
            evolves_to.species.name.
         */
        this.types = ["Undefined Type"];
        this.sprite = "undefinedpokemon.png";
        this.spriteShiny = "undefinedpokemon.png";
        this.varieties = ["Undefined Varieties"];
    }
}

export default Pokemon;
