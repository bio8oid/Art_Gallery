import { defineModule } from "direct-vuex";
// import { rootActionContext } from "./indexTs";
import * as Context from "./indexTs";
import axios from 'axios';

export interface StateTypes {
    items: Array<string | number>,
    itemsId: Array<string | number>,
    language: string,
    singleItem: null | Array<string | number>,
    paginationNumbers: Array<string | number>,
    paginatedItems: Array<string | number>,
    relatedItems: Array<string | number>,
    maxRecordsNumber: string,
    recordsPerPage: number,
    APIkey: string,
    loading: boolean,
    error: string,
    route: string,
    random: number,
}

const mod1 = defineModule({
    state: (): StateTypes => {
        return {
            items: [],
            itemsId: [],
            language: 'nl',
            singleItem: [],
            paginationNumbers: [],
            paginatedItems: [],
            relatedItems: [],
            maxRecordsNumber: '30',
            recordsPerPage: 10,
            APIkey: 'iOQQBTgH',
            loading: false,
            error: '',
            route: '',
            random: 0,
        }
    },

    //   getters: {
    //     p1OrDefault(...args): string {
    //       const { state, getters, rootState, rootGetters } = mod1GetterContext(args)
    //       // Here, 'getters', 'state', 'rootGetters' and 'rootState' are typed.
    //       // Without 'mod1GetterContext' only 'state' would be typed.
    //       return state.p1 || "default"
    //     }
    //   },

    mutations: {

        SET_ITEMS(state, items: Array<string | number>) {
            const firstPage = items.slice(0, state.recordsPerPage);
            state.paginatedItems = firstPage;
            state.items = items;
            localStorage.setItem('items', JSON.stringify(state.items));
        },

        SET_SINGLE_ITEM(state, singleItem: Array<string | number>) {
            state.singleItem = singleItem;
            localStorage.setItem('single-item', JSON.stringify(state.singleItem));
        },

        SET_ITEMS_ID(state, itemsId: Array<string | number>) {
            state.itemsId = itemsId;
            localStorage.setItem('items-id', JSON.stringify(state.itemsId));
        },

        CHANGE_LANGUAGE(state, language: string) {
            state.language = language;
            // localStorage.setItem('language', JSON.stringify(state.language));
        },

        SET_PAGINATION_NUMBERS(state, items: Array<string | number>) {
            const pages = Math.ceil(items.length / state.recordsPerPage);
            const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
            state.paginationNumbers = pageNumbers;
        },

        SET_PAGINATED_ITEMS(state, paginatedItems: Array<string | number>) {
            state.paginatedItems = paginatedItems;
        },

        SET_RELATED_ITEMS(state, filtered: Array<string | number>) {
            state.relatedItems = filtered;
        },

        SET_LOADING_STATUS(state, status: boolean) {
            state.loading = status;
        },

        SET_ERROR(state, err: string) {
            state.error = err;
        },

        SET_RANDOM(state, random: number) {
            state.random = random;
        },

        SET_ROUTE_DATA(state, routeData: string) {
            state.route = routeData;
        },

        SET_SORTED_ITEMS(state, sorted: Array<string | number>) {
            state.paginatedItems = sorted;
        },

        SET_RESET(state) {
            state.paginationNumbers = [];
            state.paginatedItems = [];
        },
    },

    actions: {

        changeStoreLanguage(context) {
            const { state } = constantActionContext(context)
            let language = '';
            state.language === 'nl' ? (language = 'en') : (language = 'nl');
            context.commit('CHANGE_LANGUAGE', language);
        },

        getRelatedItems(context) {
            const { state } = constantActionContext(context)
            const shuffeledItems = state.items.sort(() => Math.random() - 0.5);
            const filtered = shuffeledItems.slice(0, 3);
            context.commit('SET_RELATED_ITEMS', filtered);
        },

        getRandom(context) {
            const { state } = constantActionContext(context)
            const random = Math.floor(Math.random() * (state.items.length - 1) + 1);
            context.commit('SET_RANDOM', random);
        },

        handlePage(context, event: number) {
            const { state } = constantActionContext(context)
            const dataset = state.items;
            const pageNumber = event;
            const offset = (pageNumber - 1) * state.recordsPerPage;
            const paginatedItems = dataset.slice(offset).slice(0, state.recordsPerPage);
            context.commit('SET_PAGINATED_ITEMS', paginatedItems);
        },

        reset(context) {
            const { state } = constantActionContext(context)
            context.commit('SET_RESET', state);
        },

        // sortItems(context, value: string) {
        //     const {  state } = constantActionContext(context)
        //     let sortedItems;
        //     switch (value) {
        //         case 'z-a':
        //             sortedItems = state.paginatedItems.sort((a: undefined | string, b: undefined | string) => b.title.localeCompare(a.title));
        //             break;
        //         case 'a-z':
        //             sortedItems = state.paginatedItems.sort((a, b) => a.title.localeCompare(b.title));
        //             break;
        //         case 'newest':
        //             sortedItems = state.paginatedItems.sort(
        //                 (a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
        //             );
        //             break;
        //         case 'oldest':
        //             sortedItems = state.paginatedItems.sort(
        //                 (a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
        //             );
        //             break;
        //     }
        //     context.commit('SET_SORTED_ITEMS', sortedItems);
        // },

        fetchContent(context, routeData: string) {
            const { state } = constantActionContext(context);
            context.commit('SET_ERROR', '');
            context.commit('SET_LOADING_STATUS', true);

            let detailsRoute = '';
            let categoriesRoute = '';
            let recordsNumber = '';

            if (/\d/.test(routeData)) {
                detailsRoute = '/' + routeData;
                recordsNumber = '';
                context.commit('SET_ROUTE_DATA', detailsRoute);
            } else {
                recordsNumber = `&ps=${state.maxRecordsNumber}`;
                categoriesRoute = routeData;
                context.commit('SET_ROUTE_DATA', categoriesRoute);
                if (categoriesRoute !== '') context.commit('CHANGE_LANGUAGE', 'en');
            }

            const urlData = `https://www.rijksmuseum.nl/api/${state.language}/collection${detailsRoute}?key=${state.APIkey}${categoriesRoute}&imgonly=True${recordsNumber}`;
            console.log('urlData:', urlData)

            axios
                .get(urlData)
                .then(res => {
                    context.commit('SET_LOADING_STATUS', false);

                    if (res.data.artObjects !== undefined) {
                        const data = res.data.artObjects;
                        context.commit('SET_ITEMS', data);
                        context.commit('SET_PAGINATION_NUMBERS', data);
                        // context.commit(
                        //     'SET_ITEMS_ID',
                        //     data.map((x: string) => x.objectNumber)
                        // );
                    } else {
                        context.commit('SET_SINGLE_ITEM', res.data.artObject);
                    }
                })
                .catch(err => {
                    context.commit('SET_LOADING_STATUS', false);
                    context.commit('SET_ERROR', err);
                });
        },
    }
})

export default mod1
// const mod1MutationContext = (args: [any, any, any, any]) => moduleMutationContext(args, mod1)
// const mod1GetterContext = (args: [any, any, any, any]) => moduleGetterContext(args, mod1)
// const constantActionContext = (context: string) => localActionContext(context, mod1)
const constantActionContext = (context: any) => Context.moduleActionContext(context, mod1)