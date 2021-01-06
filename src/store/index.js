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
      filteredByCategoryItems: [],
      relatedItems: [],
      paginationNumbers: [],
      paginatedItems: [],
      maxRecordsNumber: 50,
      recordsPerPage: 10,
      APIkey: 'iOQQBTgH',
      random: 0,
      route: '',
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
         console.log('items:', items)
         // if (items.length > 1) {
         //  const firstPage = items.slice(0, 10);
         const firstPage = items.slice(0, state.recordsPerPage)
         state.paginatedItems = firstPage;
         state.items = items;
         localStorage.setItem('items', JSON.stringify(state.items));
         // }
      },

      SET_PAGINATION_NUMBERS(state, items) {
         // const pages = Math.ceil(items.length / 10);
         const pages = Math.ceil(items.length / state.recordsPerPage);
         const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
         state.paginationNumbers = pageNumbers;
      },

      SET_PAGINATED_ITEMS(state, paginatedItems) {
         state.paginatedItems = paginatedItems;
         // localStorage.setItem('paginated-items', JSON.stringify(state.paginatedItems));
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
      },

      SET_SORTED_ITEMS(state, sorted) {
         state.paginatedItems = sorted;
      },

      SET_FILTERED_BY_CATEGORY_ITEMS(state, filtered) {
         state.filteredByCategoryItems = filtered;
      },

      SET_RANDOM(state, random) {
         state.random = random;
      },

      SET_ROUTE_DATA(state, routeData) {
         // console.log('routeData:', routeData);
         // let urlData = '';
         // if (routeData) {
         //    if (/\d/.test(routeData)) {
         //       console.log('cond-1');
         //       // console.log('filter: ', /\d/.test(routeData));
         //       urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection/${routeData}?key=${this.state.APIkey}`;
         //    } else {
         //       console.log('cond-2');
         //       // localStorage.removeItem('items', JSON.stringify(state.items));
         //      //  urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.APIkey}&type=${routeData}&ps=${this.state.maxRecordsNumber}&imgonly=true&involvedMaker=Johannes%20Vermeer`;
         //       urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.APIkey}&type=${routeData}&ps=${this.state.maxRecordsNumber}&imgonly=true&involvedMaker=Johannes%20Vermeer`;
         //    }
         // } else {
         //    console.log('cond-3');
         //    // 'https://www.rijksmuseum.nl/api/nl/collection&ps=50&type=painting&involvedMaker=Johannes%20Vermeer?key=iOQQBTgH'
         //    // urlData = `https://www.rijksmuseum.nl/api/nl/collection?key=iOQQBTgH&involvedMaker=Johannes%20Vermeer&type=painting`;
         //    // urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.APIkey}&ps=${this.state.maxRecordsNumber}&imgonly=true&involvedMaker=Johannes%20Vermeer`;
         //    urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.APIkey}&type=${routeData}&ps=${this.state.maxRecordsNumber}&imgonly=true&involvedMaker=Johannes%20Vermeer`;
         // }
         // // console.log('set')
         state.route = routeData;
      },
   },

   actions: {
      changeStoreLanguage(context) {
         let language = '';
         this.state.language === 'nl' ? (language = 'en') : (language = 'nl');
         context.commit('CHANGE_LANGUAGE', language);
      },

      getRelatedItems(context) {
         // let shuffeledItems = this.state.items.filter( x => x.principalOrFirstMaker === this.state.singleItem.principalOrFirstMaker);
         let shuffeledItems = this.state.items.sort(() => Math.random() - 0.5);
         console.log('shuffeledItems:', shuffeledItems);
         let filtered = shuffeledItems.slice(0, 3);
         console.log('filtered:', filtered);
         context.commit('SET_RELATED_ITEMS', filtered);
      },

      filteredByCategory(context) {
         // localStorage.removeItem('items', JSON.stringify(this.state.items));
         let filteredItems = this.state.items;
         console.log('filteredItems:', filteredItems)
         //  JSON.parse(JSON.stringify(filteredItems)) === []
         //     ? (filteredItems = ['kutas'])
         //     : (filteredItems = this.state.item);
         //  console.log(
         //     'JSON.parse(JSON.stringify(filteredItems)):',
         //     JSON.parse(JSON.stringify(filteredItems))
         //  );
         console.log('filteredItems:', filteredItems);
         context.commit('SET_FILTERED_BY_CATEGORY_ITEMS', filteredItems);
      },

      getRandom(context) {
         let random = Math.floor(
            Math.random() * (this.state.items.length - 1) + 1
         );
         context.commit('SET_RANDOM', random);
      },

      handlePage(context, event) {
         const dataset = this.state.items;
         const pageNumber = event;
         // const offset = (pageNumber - 1) * 10;
         const offset = (pageNumber - 1) * this.state.recordsPerPage;
         // const paginatedItems = dataset.slice(offset).slice(0, 10);
         const paginatedItems = dataset.slice(offset).slice(0, this.state.recordsPerPage);
         context.commit('SET_PAGINATED_ITEMS', paginatedItems);
      },

      sortItems(context, value) {
         let sortedItems;
         if (value === 'z-a') {
            sortedItems = this.state.paginatedItems.sort((a, b) =>
               b.title.localeCompare(a.title)
            );
         }
         if (value === 'a-z') {
            sortedItems = this.state.paginatedItems.sort((a, b) =>
               a.title.localeCompare(b.title)
            );
         }
         if (value === 'newest') {
            sortedItems = this.state.paginatedItems.sort(
               (a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
            );
         }
         if (value === 'oldest') {
            sortedItems = this.state.paginatedItems.sort(
               (a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
            );
         }
         context.commit('SET_SORTED_ITEMS', sortedItems);
      },

      fetchContent(context, routeData) {
         context.commit('SET_LOADING_STATUS', true);
         // context.commit('SET_ROUTE_DATA', routeData);

         // let urlData = '';
         let detailsRoute = '';
         let categoriesRoute = '';

         if (/\d/.test(routeData)) {

            console.log('cond-1');
            detailsRoute = '/' + routeData;
            console.log('detailsRoute:', detailsRoute)
            context.commit('SET_ROUTE_DATA', detailsRoute);
            // context.commit('SET_ROUTE_DATA', routeData);
            // urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection${routeData}?key=${this.state.APIkey}`;
         } else {
            console.log('cond-2');
            categoriesRoute = routeData;
            console.log('categoriesRoute:', categoriesRoute)
            context.commit('SET_ROUTE_DATA', categoriesRoute);
            if (categoriesRoute !== '') context.commit('CHANGE_LANGUAGE', 'en');

            // urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.APIkey}&type=${routeData}&ps=${this.state.maxRecordsNumber}&imgonly=true`;
            // urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.APIkey}&type=${routeData}&ps=${this.state.maxRecordsNumber}&imgonly=true&involvedMaker=Johannes%20Vermeer`;
         }

         let urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection${detailsRoute}?key=${this.state.APIkey}${categoriesRoute}&ps=${this.state.maxRecordsNumber}&imgonly=True`;

         console.log('urlData:', urlData)
         // console.log('this.state.url:', this.state.url);

         axios
            .get(urlData)
            // .get(this.state.url)
            .then(res => {
               context.commit('SET_LOADING_STATUS', false);

               if (res.data.artObjects !== undefined) {
                  // let data = res.data.artObjects.filter(x => x.hasImage === true)
                  let data = res.data.artObjects;
                  // let data = JSON.parse(JSON.stringify(res.data.artObjects));
                  context.commit('SET_ITEMS', data);
                  console.log('fetchdata:', data);
                  console.log('fetchdata:', JSON.parse(JSON.stringify(data)));
                  context.commit('SET_PAGINATION_NUMBERS', data);
                  context.commit(
                     'SET_ITEMS_ID',
                     data.map(x => x.objectNumber)
                  );
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
