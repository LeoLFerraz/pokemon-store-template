import store from "../redux/store";

class Catalog {
    /**
     *
     * @param filters - Informs which attributes should be filtered in the collection. You can pass either raw values
     * for 'equals' comparisons (id: 5) or an object as below:
     * {
     *     id: {
     *         gt: 5
     *         lt: 10
     *     }
     * }
     * Filterable attributes: id, name, generation, types, stats
     * @param collection - Informs which collection this is being  filteredfrom. Usually gotten from redux store.
     */
    constructor(filters, collection) {
        let minId = -Infinity;
        let maxId = Infinity;
        let name = filters.name;
        let generations = filters.generations;
        let types = filters.types;
        let {attack, defense, hp, 'special-attack' : specialAttack, 'special-defense' : specialDefense, speed} = filters.stats || {};
        if(isNaN(filters.id)) {
            minId = filters.id?.gt || minId;
            maxId = filters.id?.lt || maxId;
        } else {
            minId = filters.id - 1;
            maxId = filters.id + 1;
        }
        if (types && !Array.isArray(types)){
            types = [types]
        }
        if (generations && !Array.isArray(generations)){
            generations = [generations]
        }
        this.catalog = collection.filter(item => {
            let nameTest = (name ? item.name.includes(name) : true);
            let generationTest = (generations ? generations.includes(item.generation) : true);
            let typeTest = (types ? item.types.some(type => types.includes(type)) : true);
            let idTeste = ((item.id > minId) && (item.id < maxId));
            let attackTest = (attack ? item.stats.attack >= attack : true);
            let defenseTest = (defense ? item.stats.defense >= defense : true);
            let hpTest = (hp ? item.stats.hp >= hp : true);
            let specialAttackTest = (specialAttack ? item.stats['special-attack'] >= specialAttack : true);
            let specialDefenseTest = (specialDefense ? item.stats['special-defense'] >= specialDefense : true);
            let speedTest = (speed ? item.stats.speed >= speed : true);
            return (nameTest && generationTest && idTeste && typeTest && attackTest && defenseTest && hpTest && specialAttackTest && specialDefenseTest && speedTest);
        });
    }
}

export default Catalog;
