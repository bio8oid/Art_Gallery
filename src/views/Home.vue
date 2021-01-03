<template>
   <div class="home">
      <img class="background" alt="Vue logo" src="../assets/background.jpg" />

      <LanguageButton v-on:changeLanguage="changeLanguage()" />

      <div id="app">
         <label for="sort-by"></label>
         <select
            class="select-element"
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

         <p v-if="this.$store.state.loading" class="loading" >Loading...</p>

         <div v-else class="records-container">
            <Records v-bind:recordsData="this.$store.state.paginatedItems" />
            <button
               v-for="number in this.$store.state.paginationNumbers"
               :key="number"
               @click="pageHandler(number)"
               class="pagination-buttons"
            >
               {{ number }}
            </button>
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

   methods: {
      changeLanguage() {
         this.changeStoreLanguage();
         this.fetchContent();
      },

      sortItemsHandle(value) {
         this.sortItems(value);
      },

      pageHandler(number) {
         this.handlePage(number);
      },

      ...mapActions([
         'fetchContent',
         'changeStoreLanguage',
         'sortItems',
         'handlePage',
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

.home {
   min-height: 80vh;
}

.select-element {
   padding: 5px 15px;
   margin: 4% 0 2.5% 0;
   border-radius: 5px;
   border: 5px solid #2c3e50;
   box-shadow: 5px 5px 10px #202327;
}

.pagination-buttons {
   position: static;
   padding: 5px 10px;
   margin: 2.5% 10px 5% 10px;
   box-shadow: 5px 5px 10px #202327;
}
/* https://www.rijksmuseum.nl/api/en/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer */
</style>