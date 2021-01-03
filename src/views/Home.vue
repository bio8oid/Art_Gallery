<template>
   <div class="home">
      <img class="background" alt="Vue logo" src="../assets/background.jpg" />

      <LanguageButton v-on:changeLanguage="changeLanguage()" />

      <div id="app">
         <label for="sort-by"></label>
         <select
            name="sort-by"
            id="sort-by"
            v-model="value"
            @change="sortItemsHandle(value)"
         >
            <option value="" disabled>sort by</option>
            <optgroup label="Date">
               <option value="oldest">from oldest</option>
               <option value="newest">from newest</option>
            </optgroup>
            <optgroup label="Title">
               <option value="a-z">a-z</option>
               <option value="z-a">z-a</option>
            </optgroup>
         </select>

         <p v-if="this.$store.state.loading">Loading...</p>

         <div v-else class="records-container">
            <Records v-bind:recordsData="this.$store.state.paginatedItems" />
            <button v-for="number in this.$store.state.paginationNumbers" :key="number" @click="pageHandler(number)" class="pagination-button">{{number}}</button>
         </div>

         <p v-if="this.$store.state.error">{{ error }}</p>
      </div>
   </div>
</template>

<script>
import LanguageButton from '@/components/LanguageButton.vue';
import Records from '@/components/Records.vue';
import { mapActions } from 'vuex';

export default {
   data() {
      return {
         value: '',
      };
   },

   components: {
      LanguageButton,
      Records,
   },

   // watch: {
   //    methods: 'pageHandler',
   // },

   methods: {
      changeLanguage() {
         this.changeStoreLanguage();
         this.fetchContent();
      },

      sortItemsHandle(value) {
         this.sortItems(value)
      },

      pageHandler(value) {
         this.handlePage(value)
      },
      
      ...mapActions([
         'fetchContent',
         'changeStoreLanguage',
         'sortItems',
         'handlePage'
      ]),
   },

   created() {
      this.fetchContent();
   },
};
</script>

<style lang="scss">
.background {
   width: 100%;
}
/* https://www.rijksmuseum.nl/api/en/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer */
</style>