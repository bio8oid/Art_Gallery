import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    content:  null,
    // content: JSON.parse(localStorage.getItem('content')) || null,
    error: '',
    // items: JSON.parse(localStorage.getItem('items')) || [],
    items: [],
    itemsId: [],
    // itemsId: JSON.parse(localStorage.getItem('itemsId')) || [],
    language: 'nl',
    // language: JSON.parse(localStorage.getItem('language')) || 'nl',
    key: 'iOQQBTgH',
    // prefix: 'https://cors-anywhere.herokuapp.com/',
    // url: `https://www.rijksmuseum.nl/`,

    // homeUrl: `https://www.rijksmuseum.nl/api/${this.language}/collection?key=${this.key}&ps=10&involvedMaker=Johannes%20Vermeer`,

    // detailsUrl: `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`,
    // singleItemUrl: `api/${this.language}/collection/${this.$route.params.id}?key=${this.key}`
  },

  getters: {
    loading: state => state.loading,
    content: state => state.content,
    error: state => state.error,
    items: state => state.items,
    itemId: state => state.itemId,
    language: state => state.language,
  },

  mutations: {

    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },

    SET_CONTENT(state, content) {
      state.content = content;
      // localStorage.setItem("content",JSON.stringify(state.content))
    },
    
    SET_ERROR(state, err) {
      state.err = err;
    },

    SET_ITEMS(state, items) {
      state.items = items;
      // localStorage.setItem("items",JSON.stringify(state.items))
    },
    
    SET_ITEM_ID(state, itemId) {
      state.itemId = itemId;
      // localStorage.setItem("itemId",JSON.stringify(state.itemId))
    },

    CHANGE_LANGUAGE(state, language) {
      state.language = language;
      // localStorage.setItem("language", JSON.stringify(state.language))
    },
  },

  actions: {
   
    changeStoreLanguage(context) {
      let language = ''
      this.state.language === 'nl' ? language = 'en' : language = 'nl'
      context.commit('CHANGE_LANGUAGE', language)
    },
  
    fetchContent(context, url) {
      context.commit('SET_LOADING_STATUS', true)

      // const params = {
      //   answer: { toJSON: () => 42 },
      //   time: moment('2016-06-01')
      // };

      // axios.get(`https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`)

      axios.get(url)

      // axios.get(`https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`)

      .then(res => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_CONTENT', res.data)
        console.log('res.data:', res.data)
        context.commit('SET_ITEMS', res.data.artObjects)
        // context.commit('SET_ITEM_ID', res.data.artObjects.map(x => x.objectNumber))
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