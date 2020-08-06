import Pokemon from "./Pokemon";

describe("createPokemon", () => {
    beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
    });
    it("createPokemon", () => {
        let pokemon = new Pokemon({});

        expect(pokemon).toEqual({
            id: -1,
            name: "Undefined Name",
            generation: "Undefined Generation",
            evolutions: ["Undefined Evolutions"],
            types: ["Undefined Type"],
            sprite: require("../assets/media/undefinedpokemon.png"),
            spriteShiny: require("../assets/media/undefinedpokemon.png"),
            sprites: [],
            price: "60.00",
            discountedPrice: "35.99",
            priceDifference: 40,
            stats: {
                hp : "Undefined Stat",
                attack: "Undefined Stat",
                defense: "Undefined Stat",
                spAttack: "Undefined Stat",
                spDefense: "Undefined Stat",
                speed: "Undefined Stat"
            },
            seller: "pokeStore",
            flags: "Daily_Discount"
        });
    });
});
