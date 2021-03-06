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
        let name = filters.name.toLowerCase();
        let generations = filters.generations;
        let types = filters.types;
        let flag = filters.flag;
        let {attack, defense, hp, spAttack, spDefense, speed} = filters.stats || {};
        let seller = filters.seller;
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
            let sellerTest = (seller ? item.seller === seller : true);
            let generationTest = ((generations && generations.length > 0) ? generations.includes(item.generation) : true);
            let typeTest = ((types && types.length > 0) ? item.types.some(type => types.includes(type)) : true);
            let idTeste = ((filters.id) ? (item.id > minId) && (item.id < maxId) : true);
            let attackTest = (attack ? item.stats.attack >= attack : true);
            let defenseTest = (defense ? item.stats.defense >= defense : true);
            let hpTest = (hp ? item.stats.hp >= hp : true);
            let specialAttackTest = (spAttack ? item.stats['special-attack'] >= spAttack : true);
            let specialDefenseTest = (spDefense ? item.stats['special-defense'] >= spDefense : true);
            let speedTest = (speed ? item.stats.speed >= speed : true);
            let flagTest = (flag ? item.flags === flag : true);

            return (nameTest && sellerTest && generationTest && idTeste && typeTest && attackTest && defenseTest && hpTest && specialAttackTest && specialDefenseTest && speedTest && flagTest);
        });
        switch (filters.orderBy) {
            case 'name':
                this.catalog.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
                break;
            case 'hp':
                this.catalog.sort((a, b) => (Number(a.stats.hp) < Number(b.stats.hp)) ? 1 : -1);
                break;
            case 'attack':
                this.catalog.sort((a, b) => (Number(a.stats.attack) < Number(b.stats.attack)) ? 1 : -1);
                break;
            case 'defense':
                this.catalog.sort((a, b) => (Number(a.stats.defense) < Number(b.stats.defense)) ? 1 : -1);
                break;
            case 'speed':
                this.catalog.sort((a, b) => (Number(a.stats.speed) < Number(b.stats.speed)) ? 1 : -1);
                break;
            case 'spAttack':
                this.catalog.sort((a, b) => (Number(a.stats['special-attack']) < Number(b.stats['special-attack'])) ? 1 : -1);
                break;
            case 'spDefense':
                this.catalog.sort((a, b) => (Number(a.stats['special-defense']) < Number(b.stats['special-defense'])) ? 1 : -1);
                break;
            case 'priceAsc' :
                this.catalog.sort((a, b) => (Number(a.discountedPrice) > Number(b.discountedPrice)) ? 1 : -1);
                break;
            case 'priceDesc' :
                this.catalog.sort((a, b) => (Number(a.discountedPrice) < Number(b.discountedPrice)) ? 1 : -1);
                break;
            case 'discount':
                this.catalog.sort((a, b) => (Number(a.priceDifference) < Number(b.priceDifference)) ? 1 : -1);
                break;
            default:
            case 'id':
                this.catalog.sort((a, b) => (a.id > b.id) ? 1 : -1);
                break;
        }
    }
}

export default Catalog;
