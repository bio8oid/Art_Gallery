import { defineModule } from "direct-vuex";
import { moduleActionContext } from "./index";
import axios from 'axios';

export interface State {
    name: null | string,
    items: Array<undefined>,
    itemsId: Array<undefined>,
    language: null | string,
    singleItem: null | Array<undefined>,
    paginationNumbers: Array<undefined>,
    paginatedItems: Array<undefined>,
    relatedItems: Array<undefined>,
    maxRecordsNumber: string,
    recordsPerPage: number,
    APIkey: string,
    loading: boolean,
    error: string,
    route: string,
    random: number,
}

const mod1 = defineModule({
    state: (): State => {
        return {
            name: '',
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
        //  SET_P1(state, p1: string) {
        //    // Here, the type of 'state' is 'State'.
        //    state.p1 = p1
        //  },

        SET_ITEMS(state, items: Array<undefined>) {
            const firstPage = items.slice(0, state.recordsPerPage);
            state.paginatedItems = firstPage;
            state.items = items;
            localStorage.setItem('items', JSON.stringify(state.items));
        },
        SET_SINGLE_ITEM(state, singleItem: Array<undefined>) {
            state.singleItem = singleItem;
            localStorage.setItem('single-item', JSON.stringify(state.singleItem));
        },

        SET_ITEMS_ID(state, itemsId: Array<undefined>) {
            state.itemsId = itemsId;
            localStorage.setItem('items-id', JSON.stringify(state.itemsId));
        },

        CHANGE_LANGUAGE(state, language: string) {
            state.language = language;
            localStorage.setItem('language', JSON.stringify(state.language));
        },

        SET_PAGINATION_NUMBERS(state, items: Array<undefined>) {
            const pages = Math.ceil(items.length / state.recordsPerPage);
            const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
            state.paginationNumbers = pageNumbers;
        },

        SET_PAGINATED_ITEMS(state, paginatedItems: Array<undefined>) {
            state.paginatedItems = paginatedItems;
        },

        SET_RELATED_ITEMS(state, filtered: Array<undefined>) {
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

        SET_SORTED_ITEMS(state, sorted: Array<undefined>) {
            state.paginatedItems = sorted;
        },

        SET_RESET(state) {
            state.paginationNumbers = [];
            state.paginatedItems = [];
        },
    },

    //   actions: {
    //     loadP1(context, payload: { id: string }) {
    //       const { dispatch, commit, getters, state } = mod1ActionContext(context)
    //       // Here, 'dispatch', 'commit', 'getters' and 'state' are typed.
    //    }

    changeStoreLanguage(context) {
        const { commit } = mod1ActionContext(context)
        let language = '';
        this.state.language === 'nl' ? (language = 'en') : (language = 'nl');
        commit('CHANGE_LANGUAGE', language);
    },

    getRelatedItems(context) {
        const { commit } = mod1ActionContext(context)
        let shuffeledItems = this.state.items.sort(() => Math.random() - 0.5);
        let filtered = shuffeledItems.slice(0, 3);
        commit('SET_RELATED_ITEMS', filtered);
    },

    getRandom(context) {
        const { commit } = mod1ActionContext(context)
        let random = Math.floor(Math.random() * (this.state.items.length - 1) + 1);
        commit('SET_RANDOM', random);
    },

    // handlePage(context, event: number) {
    //     const { commit } = mod1ActionContext(context)
    //     const dataset = this.state.items;
    //     const pageNumber = event;
    //     const offset = (pageNumber - 1) * this.state.recordsPerPage;
    //     const paginatedItems = dataset.slice(offset).slice(0, this.state.recordsPerPage);
    //     commit('SET_PAGINATED_ITEMS', paginatedItems);
    // },

    reset(context) {
        const { commit } = mod1ActionContext(context)
        commit('SET_RESET');
    },

    // sortItems(context, value: string) {
    //     const { commit } = mod1ActionContext(context)
    //     let sortedItems;
    //     switch (value) {
    //         case 'z-a':
    //             sortedItems = this.state.paginatedItems.sort((a, b) => b.title.localeCompare(a.title));
    //             break;
    //         case 'a-z':
    //             sortedItems = this.state.paginatedItems.sort((a, b) => a.title.localeCompare(b.title));
    //             break;
    //         case 'newest':
    //             sortedItems = this.state.paginatedItems.sort(
    //                 (a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
    //             );
    //             break;
    //         case 'oldest':
    //             sortedItems = this.state.paginatedItems.sort(
    //                 (a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
    //             );
    //             break;
    //     }
    //     commit('SET_SORTED_ITEMS', sortedItems);
    // },

    fetchContent(context, routeData: string) {
        const { commit } = mod1ActionContext(context);
        commit('SET_ERROR', '');
        commit('SET_LOADING_STATUS', true);

        let detailsRoute = '';
        let categoriesRoute = '';
        let recordsNumber = '';

        if (/\d/.test(routeData)) {
            detailsRoute = '/' + routeData;
            recordsNumber = '';
            commit('SET_ROUTE_DATA', detailsRoute);
        } else {
            recordsNumber = `&ps=${this.state.maxRecordsNumber}`;
            categoriesRoute = routeData;
            commit('SET_ROUTE_DATA', categoriesRoute);
            if (categoriesRoute !== '') commit('CHANGE_LANGUAGE', 'en');
        }

        let urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection${detailsRoute}?key=${this.state.APIkey}${categoriesRoute}&imgonly=True${recordsNumber}`;

        axios
            .get(urlData)
            .then(res => {
                commit('SET_LOADING_STATUS', false);

                if (res.data.artObjects !== undefined) {
                    let data = res.data.artObjects;
                    commit('SET_ITEMS', data);
                    commit('SET_PAGINATION_NUMBERS', data);
                    commit(
                        'SET_ITEMS_ID',
                        data.map(x => x.objectNumber)
                    );
                } else {
                    commit('SET_SINGLE_ITEM', res.data.artObject);
                }
            })
            .catch(err => {
                commit('SET_LOADING_STATUS', false);
                commit('SET_ERROR', err);
            });
    },

})

export default mod1
// const mod1MutationContext = (args: [any, any, any, any]) => moduleMutationContext(args, mod1)
const mod1ActionContext = (context: any) => moduleActionContext(context, mod1)