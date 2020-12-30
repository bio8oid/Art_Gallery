import Vue from "vue";
import Vuex from "vuex";
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
    key: 'iOQQBTgH',
  },

  getters: {
    loading: state => state.loading,
    error: state => state.error,
    items: state => state.items,
    relatedItems: state => state.relatedItems,
    singleItem: state => state.singleItem,
    itemsId: state => state.itemsId,
    language: state => state.language,
  },

  mutations: {

    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },

    SET_SINGLE_ITEM(state, singleItem) {
      state.singleItem = singleItem;
      localStorage.setItem("single-item", JSON.stringify(state.singleItem))
    },

    SET_ERROR(state, err) {
      state.err = err;
    },

    SET_ITEMS(state, items) {
      state.items = items;
      localStorage.setItem("items", JSON.stringify(state.items))
    },

    SET_ITEMS_ID(state, itemsId) {
      state.itemsId = itemsId;
      localStorage.setItem("items-id", JSON.stringify(state.itemsId))
    },

    CHANGE_LANGUAGE(state, language) {
      state.language = language;
      localStorage.setItem("language", JSON.stringify(state.language))
    },

    RELATED_ITEMS(state, filtered) {
      state.relatedItems = filtered;
      localStorage.setItem("related-items", JSON.stringify(state.relatedItems))
    },
  },

  actions: {

    changeStoreLanguage(context) {
      let language = ''
      this.state.language === 'nl' ? language = 'en' : language = 'nl'
      context.commit('CHANGE_LANGUAGE', language)
    },
     
    getRelatedItems(context) {
      let shuffeledItems = this.state.items.sort(() => Math.random() - 0.5);
      let filtered = shuffeledItems.slice(0,3)
      context.commit('RELATED_ITEMS', filtered)
    },
  
    fetchContent(context, url) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get(url)
      .then(res => {
        context.commit('SET_LOADING_STATUS', false)

        if (res.data.artObjects !== undefined) {
          context.commit('SET_ITEMS', res.data.artObjects)
          context.commit('SET_ITEMS_ID', res.data.artObjects.map(x => x.objectNumber))
        } else {
          context.commit('SET_SINGLE_ITEM', res.data.artObject)
        }
      })
        .catch((err) => {
          context.commit('SET_LOADING_STATUS', false)
          context.commit('SET_ERROR', err)
          console.log('err:', err)
        })
    }
  },
});