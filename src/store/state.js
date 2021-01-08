export default {
   items: JSON.parse(localStorage.getItem('items')) || [],
   itemsId: JSON.parse(localStorage.getItem('items-id')) || [],
   language: JSON.parse(localStorage.getItem('language')) || 'nl',
   singleItem: JSON.parse(localStorage.getItem('single-item')) || [],
   paginationNumbers: [],
   paginatedItems: [],
   relatedItems: [],
   maxRecordsNumber: '30',
   recordsPerPage: 10,
   APIkey: 'iOQQBTgH',
   loading: false,
   error: '',
   route: '',
   random: 0,
};
