export default {

    SET_ITEMS(state: any, items: Array<object>) {
        const firstPage = items.slice(0, state.recordsPerPage);
        state.paginatedItems = firstPage;
        state.items = items;
        localStorage.setItem('items', JSON.stringify(state.items));
    },

    SET_SINGLE_ITEM(state: any, singleItem: Array<object>) {
        state.singleItem = singleItem;
        localStorage.setItem('single-item', JSON.stringify(state.singleItem));
    },

    SET_ITEMS_ID(state: any, itemsId: Array<string>) {
        state.itemsId = itemsId;
        localStorage.setItem('items-id', JSON.stringify(state.itemsId));
    },

    CHANGE_LANGUAGE(state: any, language: string) {
        state.language = language;
        // localStorage.setItem('language', JSON.stringify(state.language));
    },

    SET_PAGINATION_NUMBERS(state: any, items: Array<number>) {
        const pages = Math.ceil(items.length / state.recordsPerPage);
        const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
        state.paginationNumbers = pageNumbers;
    },

    SET_PAGINATED_ITEMS(state: any, paginatedItems: Array<object>) {
        state.paginatedItems = paginatedItems;
    },

    SET_RELATED_ITEMS(state: any, filtered: Array<object>) {
        state.relatedItems = filtered;
    },

    SET_LOADING_STATUS(state: any, status: boolean) {
        state.loading = status;
    },

    SET_ERROR(state: any, err: string) {
        state.error = err;
    },

    SET_RANDOM(state: any, random: number) {
        state.random = random;
    },

    SET_ROUTE_DATA(state: any, routeData: string) {
        state.route = routeData;
    },

    SET_SORTED_ITEMS(state: any, sorted: Array<object>) {
        state.paginatedItems = sorted;
    },

    SET_RESET(state: any) {
        state.paginationNumbers = [];
        state.paginatedItems = [];
    },
};
