import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: '',
    items: JSON.parse(localStorage.getItem('items')) || [],
    singleItem: JSON.parse(localStorage.getItem('single-item')) || [],
    itemsId: JSON.parse(localStorage.getItem('items-id')) || [],
    language: JSON.parse(localStorage.getItem('language')) || 'nl',
    relatedItems: [],
    paginationNumbers: [],
    paginatedItems: [],
    // recentPageNumber:  1,
    maxRecordsNumber: 50,
    APIkey: 'iOQQBTgH',
    random: 0,
    url: '',
  },

  // getters: {
  //   // loading: state => state.loading,
  //   loading: state => state.loading,
  //   error: state => state.error,
  //   items: state => state.items,
  //   relatedItems: state => state.relatedItems,
  //   singleItem: state => state.singleItem,
  //   itemsId: state => state.itemsId,
  //   language: state => state.language,
  // },

  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },

    SET_SINGLE_ITEM(state, singleItem) {
      state.singleItem = singleItem;
      localStorage.setItem('single-item', JSON.stringify(state.singleItem));
    },

    SET_ERROR(state, err) {
      state.err = err;
    },

    SET_ITEMS(state, items) {
      const firstPage = JSON.parse(localStorage.getItem('paginated-items')) || items.slice(0, 10)
      state.paginatedItems = firstPage;
      state.items = items;
      localStorage.setItem('items', JSON.stringify(state.items));
    },

    SET_PAGINATION_NUMBERS(state, items) {
      const pages = Math.ceil(items.length / 10);
      const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
      state.paginationNumbers = pageNumbers;
    },

    SET_PAGINATED_ITEMS(state, paginatedItems) {
      state.paginatedItems = paginatedItems;
      localStorage.setItem('paginated-items', JSON.stringify(state.paginatedItems));
    },

    // SET_RECENT_PAGE(state, pageNumber) {
    //   state.recentPageNumber = pageNumber;
    // },

    SET_ITEMS_ID(state, itemsId) {
      state.itemsId = itemsId;
      localStorage.setItem('items-id', JSON.stringify(state.itemsId));
    },

    CHANGE_LANGUAGE(state, language) {
      state.language = language;
      localStorage.setItem('language', JSON.stringify(state.language));
    },

    SET_RELATED_ITEMS(state, filtered) {
      state.relatedItems = filtered;
    },

    SET_SORTED_ITEMS(state, sorted) {
      state.paginatedItems = sorted;
    },

    SET_RANDOM(state, random) {
      state.random = random;
    },

    SET_URL(state, routeData) {
      let urlData = '';
      if (routeData) {
        urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection/${routeData}?key=${this.state.APIkey}`;
      } else {
        urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.APIkey}&ps=${this.state.maxRecordsNumber}&involvedMaker=Johannes%20Vermeer`;
      }
      state.url = urlData;
    },
  },

  actions: {
    changeStoreLanguage(context) {
      let language = '';
      this.state.language === 'nl' ? (language = 'en') : (language = 'nl');
      context.commit('CHANGE_LANGUAGE', language);
    },

    getRelatedItems(context) {
      let shuffeledItems = this.state.items.sort(() => Math.random() - 0.5);
      let filtered = shuffeledItems.slice(0, 3);
      context.commit('SET_RELATED_ITEMS', filtered);
    },

    getRandom(context) {
      let random = Math.floor(
        Math.random() * (this.state.items.length - 1) + 1);
      context.commit('SET_RANDOM', random);
    },

    handlePage(context, event) {
      const dataset = this.state.items;
      const pageNumber = event;
      const offset = (pageNumber - 1) * 10
      const paginatedItems = dataset.slice(offset).slice(0, 10)
      // context.commit('SET_RECENT_PAGE', pageNumber);
      context.commit('SET_PAGINATED_ITEMS', paginatedItems);
    },

    sortItems(context, value) {
      let sortedItems;
      if (value === 'z-a') {
        sortedItems = this.state.paginatedItems.sort((a, b) => b.title.localeCompare(a.title));
      }
      if (value === 'a-z') {
        sortedItems = this.state.paginatedItems.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (value === 'newest') {
        sortedItems = this.state.paginatedItems.sort((a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/));
      }
      if (value === 'oldest') {
        sortedItems = this.state.paginatedItems.sort((a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/));
      }
      context.commit('SET_SORTED_ITEMS', sortedItems);
    },

    fetchContent(context, routeData) {
      context.commit('SET_URL', routeData);
      context.commit('SET_LOADING_STATUS', true);
      axios
        .get(this.state.url)
        .then(res => {
          context.commit('SET_LOADING_STATUS', false);

          if (res.data.artObjects !== undefined) {
            let data = res.data.artObjects.filter(x => x.hasImage === true)
            context.commit('SET_ITEMS', data);
            context.commit('SET_PAGINATION_NUMBERS', data);
            context.commit('SET_ITEMS_ID', data.map(x => x.objectNumber));
          } else {
            context.commit('SET_SINGLE_ITEM', res.data.artObject);
          }
        })
        .catch(err => {
          context.commit('SET_LOADING_STATUS', false);
          context.commit('SET_ERROR', err);
          console.log('err:', err);
        });
    },
  },
});