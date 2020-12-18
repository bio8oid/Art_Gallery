import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    post: JSON.parse(localStorage.getItem('post')) || null,
    error: '',
    items: JSON.parse(localStorage.getItem('items')) || [],
    itemsId: JSON.parse(localStorage.getItem('itemsId')) || [],
    language: JSON.parse(localStorage.getItem('language')) || 'nl',
    key: 'iOQQBTgH',
    prefix: 'https://cors-anywhere.herokuapp.com/'
  },

  getters: {
    loading: state => state.loading,
    post: state => state.post,
    error: state => state.error,
    items: state => state.items,
    itemId: state => state.itemId,
    language: state => state.language,
  },

  mutations: {

    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },

    SET_POST(state, post) {
      state.post = post;
      console.log('updated post:', post.artObjects[0].longTitle)

      localStorage.setItem("post",JSON.stringify(state.post))
    },
    
    SET_ERROR(state, err) {
      state.err = err;
    },

    SET_ITEMS(state, items) {
      state.items = items;
      localStorage.setItem("items",JSON.stringify(state.items))
    },
    
    SET_ITEM_ID(state, itemId) {
      state.itemId = itemId;
      localStorage.setItem("itemId",JSON.stringify(state.itemId))
    },

    CHANGE_LANGUAGE(state, language) {
      // state.language === 'nl' ? (state.language = 'en') : (state.language = 'nl')
      state.language = language;
      localStorage.setItem("language", JSON.stringify(state.language))
        // this.actions.fetchPost()
        // dispatch('fetchPost')
      // state.items = items;
        console.log('store.language:', state.language)
    },

    // FETCH_DATA(store) {
    //   store.actions.fetchPost()
    // }
  },

  actions: {
   
    changeStoreLanguage(context) {
      this.state.language === 'nl' ? (this.state.language = 'en') : (this.state.language = 'nl')
      context.commit('CHANGE_LANGUAGE', this.state.language)
    },

    fetchPost(context) {
      context.commit('SET_LOADING_STATUS', true)
      console.log('this.state.language:', this.state.language)

      axios.get(`https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`)

      .then(res => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_POST', res.data)
        console.log('res.data:', res.data)
        context.commit('SET_ITEMS', res.data.artObjects)
        context.commit('SET_ITEM_ID', res.data.artObjects.map(x => x.objectNumber))
      })
        .catch((err) => {
          context.commit('SET_LOADING_STATUS', false)
          context.commit('SET_ERROR', err)
          console.log('err:', err)
        })
    }
  },

  modules: {}
});