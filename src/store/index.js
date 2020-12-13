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
    language: 'nl',
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

    CHANGE_LANGUAGE(state) {
      state.language === 'nl' ? (state.language = 'en') : (state.language = 'nl')
        // this.actions.fetchPost()
        console.log('store.language:', state.language)
    }
    
    // setLoading(status) {
    //    this.loading = status
    //    console.log('status:', status)
    // },

    // setError(status) {
    //    this.error = status
    // },

    // setPost(data) {
    //    this.post = data
    //    console.log('data:', data)
    // }
    
    // fetchData() {
    //   this.loading = true
    //   axios
    //     .get(
    //       this.prefix + `https://www.rijksmuseum.nl/api/${this.language}/collection?key=${this.key}&ps=10&involvedMaker=Johannes%20Vermeer`
    //     )
    //     .then((res) => {
    //       this.state.loading = false
    //       this.state.post = res.data
    //       this.state.items = this.state.post.artObjects
    //       this.state.itemsId = this.state.items.map(x => x.objectNumber)
    //       console.log('fetched:')
    //     })
    //     .catch((err) => {
    //       this.state.loading = false
    //       this.state.error = err
    //     })
    // },
  },
  actions: {
    // fetch(context) {
    //   context.commit('fetch')
    // }


    changeLanguage(context) {
      context.commit('CHANGE_LANGUAGE')
    },

    fetchPost(context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('https://www.rijksmuseum.nl/api/nl/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer')
      .then(res => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_POST', res.data)
        context.commit('SET_ITEMS', res.data.artObjects)
        context.commit('SET_ITEM_ID', res.data.artObjects.map(x => x.objectNumber))

/// persist state

        // const setLocalStorageId = data => localStorage.setItem('keptRouteId', JSON.stringify(data));


      //     this.state.items = this.state.post.artObjects
      //     this.state.itemsId = this.state.items.map(x => x.objectNumber)

        // console.log('res.data:', res.data)
      })
        .catch((err) => {
          context.commit('SET_LOADING_STATUS', false)
          context.commit('SET_ERROR', err)
          console.log('err:', err)
        })
    }

    

    // async ['fetchData']({ commit }) {
    //   console.log('fired:')

    //   try {
    //     commit('setLoading', true);
    //     const { post } = await axios.get(  'https://www.rijksmuseum.nl/api/nl/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer');

    //     commit('setPost', post);
    //     console.log('post:', post)

    //   } catch (error) {
    //     commit('setError', error);
    //     console.log('error:', error)

    //     throw error;
    //   } finally {
    //     commit('setLoading', false);
    //   }



      // commit('setLoading', true);
      // axios
      //   .get(
      //     this.prefix + `https://www.rijksmuseum.nl/api/${this.language}/collection?key=${this.key}&ps=10&involvedMaker=Johannes%20Vermeer`
      //   )
      //   .then((res) => {
      //     commit('setUpdate', res.data);
      //     commit('setLoading', false);
      //     this.state.loading = false
      //     this.state.post = res.data
      //     this.state.items = this.state.post.artObjects
      //     this.state.itemsId = this.state.items.map(x => x.objectNumber)
      //     console.log('fetched:')
      //   })
      //   .catch((err) => {
      //     commit('setLoading', false);
      //     commit('setError', err);
      //     this.state.loading = false
      //     this.state.error = err
      //   })
    // },
  },
  modules: {}
});