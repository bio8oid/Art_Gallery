import axios from 'axios';

export default {
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
      let random = Math.floor(Math.random() * (this.state.items.length - 1) + 1);
      context.commit('SET_RANDOM', random);
   },

   handlePage(context, event) {
      const dataset = this.state.items;
      const pageNumber = event;
      const offset = (pageNumber - 1) * this.state.recordsPerPage;
      const paginatedItems = dataset.slice(offset).slice(0, this.state.recordsPerPage);
      context.commit('SET_PAGINATED_ITEMS', paginatedItems);
   },

   reset(context) {
      context.commit('SET_RESET');
   },

   sortItems(context, value) {
      let sortedItems;
      switch (value) {
         case 'z-a':
            sortedItems = this.state.paginatedItems.sort((a, b) => b.title.localeCompare(a.title));
            break;
         case 'a-z':
            sortedItems = this.state.paginatedItems.sort((a, b) => a.title.localeCompare(b.title));
            break;
         case 'newest':
            sortedItems = this.state.paginatedItems.sort(
               (a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
            );
            break;
         case 'oldest':
            sortedItems = this.state.paginatedItems.sort(
               (a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
            );
            break;
      }
      context.commit('SET_SORTED_ITEMS', sortedItems);
   },

   fetchContent(context, routeData) {
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
         recordsNumber = `&ps=${this.state.maxRecordsNumber}`;
         categoriesRoute = routeData;
         context.commit('SET_ROUTE_DATA', categoriesRoute);
         if (categoriesRoute !== '') context.commit('CHANGE_LANGUAGE', 'en');
      }

      let urlData = `https://www.rijksmuseum.nl/api/${this.state.language}/collection${detailsRoute}?key=${this.state.APIkey}${categoriesRoute}&imgonly=True${recordsNumber}`;

      axios
         .get(urlData)
         .then(res => {
            context.commit('SET_LOADING_STATUS', false);

            if (res.data.artObjects !== undefined) {
               let data = res.data.artObjects;
               context.commit('SET_ITEMS', data);
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
         });
   },
};
