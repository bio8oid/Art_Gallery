import axios from 'axios';
import { rootActionContext } from './indexTs';

export default {
   changeStoreLanguage(context: any) {
      const { state } = rootActionContext(context);
      let language = '';
      state.language === 'nl' ? (language = 'en') : (language = 'nl');
      context.commit('CHANGE_LANGUAGE', language);
   },

   getRelatedItems(context: any) {
      const { state } = rootActionContext(context);
      const shuffeledItems = state.items.sort(() => Math.random() - 0.5);
      const filtered = shuffeledItems.slice(0, 3);
      context.commit('SET_RELATED_ITEMS', filtered);
   },

   getRandom(context: any) {
      const { state } = rootActionContext(context);
      const random = Math.floor(Math.random() * (state.items.length - 1) + 1);
      context.commit('SET_RANDOM', random);
   },

   handlePage(context: any, event: number) {
      const { state } = rootActionContext(context);
      const dataset = state.items;
      const pageNumber = event;
      const offset = (pageNumber - 1) * state.recordsPerPage;
      const paginatedItems = dataset.slice(offset).slice(0, state.recordsPerPage);
      context.commit('SET_PAGINATED_ITEMS', paginatedItems);
   },

   reset(context: any) {
      const { state } = rootActionContext(context);
      context.commit('SET_RESET', state);
   },

   sortItems(context: any, value: string) {
      const { state } = rootActionContext(context);
      let sortedItems;
      switch (value) {
         case 'z-a':
            sortedItems = state.paginatedItems.sort((a: any, b: any) => a.title.localeCompare(b.title));
            break;
         case 'a-z':
            sortedItems = state.paginatedItems.sort((a: any, b: any) => a.title.localeCompare(b.title));
            break;
         case 'newest':
            sortedItems = state.paginatedItems.sort(
               (a: any, b: any) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
            );
            break;
         case 'oldest':
            sortedItems = state.paginatedItems.sort(
               (a: any, b: any) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
            );
            break;
      }
      context.commit('SET_SORTED_ITEMS', sortedItems);
   },

   fetchContent(context: any, routeData: string) {
      const { state } = rootActionContext(context);
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
         recordsNumber = `&ps=${state.maxRecordsNumber}`;
         categoriesRoute = routeData;
         context.commit('SET_ROUTE_DATA', categoriesRoute);
         if (categoriesRoute !== '') context.commit('CHANGE_LANGUAGE', 'en');
      }

      const urlData = `https://www.rijksmuseum.nl/api/${state.language}/collection${detailsRoute}?key=${state.APIkey}${categoriesRoute}&imgonly=True${recordsNumber}`;
      console.log('urlData:', urlData);

      axios
         .get(urlData)
         .then(res => {
            context.commit('SET_LOADING_STATUS', false);

            if (res.data.artObjects !== undefined) {
               const data = res.data.artObjects;
               context.commit('SET_ITEMS', data);
               context.commit('SET_PAGINATION_NUMBERS', data);
               context.commit(
                  'SET_ITEMS_ID',
                  data.map((x: any) => x.objectNumber)
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
