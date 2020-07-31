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
     * Filterable attributes: id, name, generation, types
     * @param collection - Informs which collection this is being filtered from. Usually gotten from redux store.
     */
    constructor(filters, collection) {

        console.log(filters);
        console.log(collection);
    }
}

export default Catalog;
