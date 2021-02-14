import { defineGetters } from "direct-vuex"
import { StateTypes } from './types';

export default defineGetters<StateTypes>()({

  loading: state => state.loading,
  error: state => state.error,
  items: state => state.items,
  relatedItems: state => state.relatedItems,
  singleItem: state => state.singleItem,
  itemsId: state => state.itemsId,
  language: state => state.language,
  route: state => state.route,
  APIkey: state => state.APIkey,
  recordsPerPage: state => state.recordsPerPage,
  maxRecordsNumber: state => state.maxRecordsNumber,
  siteMap: state => state.siteMap,
  paginatedItems: state => state.paginatedItems,
  paginationNumbers: state => state.paginationNumbers,

})
