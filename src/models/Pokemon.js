class Pokemon {
    // All Pokemon info is obtained from pokeapi.co
    constructor(pokemon) {
        this.id = pokemon.id || -1;
        /*
            Endpoint ID is found in: "pokemon".
            Property name: "id".
            The ID number is the same as the National Pokedex number for
            every pokemon.
        */
        this.name = pokemon.name || "Undefined Name";
        /*
            Endpoint name is found in: "pokemon".
            Property name: "name".
            A pokemon's name will not change between its forms and varieties.
        */
        this.generation = pokemon.generation || "Undefined Generation";
        /*
            Endpoint generation is found in: "species".
            Property name: generation.name
            The generation's name follows a "generation-X" pattern where
            X is the generation's number.
            To access a Pokemon's generation, the API results path would be:
            pokemon.species.url <-- get request to url into 'response';
            response.generation.name
        */
        this.evolutions = pokemon.evolutions || ["Undefined Evolutions"];
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
        this.types = pokemon.types || ["Undefined Type"];
        this.sprite = pokemon.sprite || require("../assets/media/undefinedpokemon.png");
        this.spriteShiny = pokemon.spriteShiny || require("../assets/media/undefinedpokemon.png");
        this.sprites = pokemon.sprites || [];
        this.price = (Math.random()*100).toFixed(2);
        if (Math.random() > .5){
            this.discountedPrice =  (Math.random() * (this.price-.01)).toFixed(2);
        }else {
            this.discountedPrice = this.price;
        }
        this.priceDifference = Math.floor(100-100*(this.discountedPrice/this.price));
        this.stats = pokemon.stats || {
            hp : "Undefined Stat",
            attack: "Undefined Stat",
            defense: "Undefined Stat",
            spAttack: "Undefined Stat",
            spDefense: "Undefined Stat",
            speed: "Undefined Stat"
        }
        this.seller = pokemon.seller || 'pokeStore';
        let random = Math.floor(Math.random() * (0 - 6)) + 6;
        switch(random){
            case 1:
                this.flags = "Weekly_Promotion";
                break;
            case 2:
                this.flags = "Daily_Discount";
                break;
            case 3:
                this.flags = "PokeDeal_2020";
                break;
            default:
                this.flags = "";
        }
    }
}

export default Pokemon;
