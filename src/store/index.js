import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    // content:  null,
    singleItem: JSON.parse(localStorage.getItem('single-item')) || null,
    // content: JSON.parse(localStorage.getItem('content')) || null,
    error: '',
    items: JSON.parse(localStorage.getItem('items')) || [],
    // items: [],
    // itemsId: [],
    itemsId: JSON.parse(localStorage.getItem('itemsId')) || [],
    // language: 'nl',
    language: JSON.parse(localStorage.getItem('language')) || 'nl',
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
    itemsId: state => state.itemsId,
    language: state => state.language,
  },

  mutations: {

    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },

    SET_SINGLE_ITEM(state, singleItem) {
      state.singleItem = singleItem;
      localStorage.setItem("singleItem",JSON.stringify(state.singleItem))
    },
    // SET_CONTENT(state, content) {
    //   state.content = content;
    //   localStorage.setItem("content",JSON.stringify(state.content))
    // },
    
    SET_ERROR(state, err) {
      state.err = err;
    },

    // SET_ITEMS(state, items) {
    //   console.log('items:', items)
    //   if (items !== undefined) {
    //         state.items = items;
    //   localStorage.setItem("items",JSON.stringify(state.items))  
    //   }
    //   //  else {
    //   //   state.items = JSON.parse(localStorage.getItem('items'))
    //   // }
    // },

    SET_ITEMS(state, items) {
      state.items = items;
      localStorage.setItem("items",JSON.stringify(state.items))
    },
    
    // SET_ITEMS_ID(state, itemsId) {
    //   console.log('itemsId:', itemsId)
    //   if (itemsId !== undefined) {
    //     state.itemsId = itemsId;
    //   localStorage.setItem("itemsId",JSON.stringify(state.itemsId))
    //   }
    // },

    // SET_ITEMS(state) {
    //   state.items = state.content.artObjects;
    //   localStorage.setItem("items",JSON.stringify(state.items))
    // },
    
    // SET_ITEMS_ID(state) {
    //   console.log('state.items:', state.items)
    //   state.itemsId = state.items.map(x => x.objectNumber);
    //   localStorage.setItem("itemsId",JSON.stringify(state.itemsId))
    // },

    CHANGE_LANGUAGE(state, language) {
      state.language = language;
      localStorage.setItem("language", JSON.stringify(state.language))
    },
  },

  actions: {

    // setItems(context) {
    //   context.commit('SET_ITEMS')
    //   // context.commit('SET_ITEMS_ID', this.state.items)
    //   // console.log('itemsID set:', this.state.itemsId)
    //   // console.log('itemsID set:', this.itemsId)
    // },
    // setItemsId(context) {
    //   context.commit('SET_ITEMS_ID')
    //   // context.commit('SET_ITEMS_ID', this.state.items)
    //   // console.log('itemsID set:', this.state.itemsId)
    //   // console.log('itemsID set:', this.itemsId)
    // },

   
    changeStoreLanguage(context) {
      let language = ''
      this.state.language === 'nl' ? language = 'en' : language = 'nl'
      context.commit('CHANGE_LANGUAGE', language)
      // console.log(this.$store.state.itemsId)
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

        if (res.data.artObject !== undefined) {
          context.commit('SET_SINGLE_ITEM', res.data.artObject)
        }

        // context.commit('SET_CONTENT', res.data)
        // console.log('res.data:', res.data)
        // context.commit('SET_ITEMS')

        if (res.data.artObjects !== undefined) {
          context.commit('SET_ITEMS', res.data.artObjects)
          console.log('res.data.artObjects:', res.data.artObjects)
        }

        // console.log('res.data.artObject:', res.data.artObjects)
        // context.commit('SET_ITEMS_ID', res.data.artObjects.map(x => x.objectNumber))

        if (this.state.itemsId.length === 0) {
          context.commit('SET_ITEMS_ID', res.data.artObjects.map(x => x.objectNumber))
        }

        // context.commit('SET_ITEMS_ID', res.data.artObjects)
        // console.log('res.data.artObjects.map(x => x.objectNumber):', res.data.artObjects.map(x => x.objectNumber))
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