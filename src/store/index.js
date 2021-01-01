import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    error: '',
    items: JSON.parse(localStorage.getItem('items')) || [],
    // items: [],
    relatedItems: [],
    // relatedItems: JSON.parse(localStorage.getItem('related-items')) || [],
    // singleItem: [],
    singleItem: JSON.parse(localStorage.getItem('single-item')) || [],
    itemsId: JSON.parse(localStorage.getItem('items-id')) || [],
    language: JSON.parse(localStorage.getItem('language')) || 'nl',
    random: 0,
    // random: JSON.parse(localStorage.getItem('random')) || 0,
    key: 'iOQQBTgH',
    recordsPerPage: '50',
    url: '',
  },

  // getters: {
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
      state.items = items;
      localStorage.setItem('items', JSON.stringify(state.items));
    },

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
      localStorage.setItem(
        'related-items',
        JSON.stringify(state.relatedItems)
      );
    },

    SET_RANDOM(state, random) {
      state.random = random;
      // localStorage.setItem('random', JSON.stringify(state.random));
      // fetchContent();
    },

    SET_URL(state, routeData) {
    // SET_URL(state, urlData) {

      console.log('routeData:', routeData);
      let urlData = '';
      if (routeData) {
        urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection/${routeData}?key=${this.state.key}`;
      } else {
        urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.key}&ps=${this.state.recordsPerPage}&involvedMaker=Johannes%20Vermeer`;
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

    sortItems(value) {
      if (value === 'z-a') {
        this.state.items = this.state.items.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      }
      if (value === 'a-z') {
        this.state.items = this.state.items.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      if (value === 'newest') {
        this.state.items = this.state.items.sort(
          (a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
        );
      }
      if (value === 'oldest') {
        this.state.items = this.state.items.sort(
          (a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
        );
      }
    },

    // setUrl(context, routeData) {
    //   console.log('routeData:', routeData);
    //   var urlData = '';
    //   if (routeData) {
    //     urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection/${routeData}?key=${this.state.key}`;
    //   } else {
    //     urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.key}&ps=${this.state.recordsPerPage}&involvedMaker=Johannes%20Vermeer`;
    //   }
    //   context.commit('SET_URL', urlData);
    // },

    fetchContent(context, routeData) {
    // fetchContent(context) {
      context.commit('SET_URL', routeData);
      context.commit('SET_LOADING_STATUS', true);
      axios
        .get(this.state.url)
        .then(res => {
          context.commit('SET_LOADING_STATUS', false);

          if (res.data.artObjects !== undefined) {
            let data = res.data.artObjects.filter(x => x.hasImage === true)
            context.commit('SET_ITEMS', data);
            context.commit('SET_ITEMS_ID',data.map(x => x.objectNumber));
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