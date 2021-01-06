<template>
   <div class="home category">
      <h1 class="category-header">Select Category</h1>
      <label for="categories"></label>
      <select
         class="select-element"
         name="categories"
         id="categories"
         v-model="value"
         @change="filterItemsHandle(value)"
      >
         <option value="" disabled>SELECT</option>
         <option value="&type=painting">painting</option>
         <option value="&type=drawing">drawing</option>
         <option value="&type=print">print</option>
         <option value="&type=photomechanical+print">
            photomechanical print
         </option>
         <option value="&type=photograph">photograph</option>
      </select>

      <p v-if="this.$store.state.loading" class="loading">Loading...</p>

      <div v-else class="records-container">
         <!-- <Records v-if="this.$store.state.items.length > 1" v-bind:recordsData="this.$store.state.items" /> -->
         <Records v-bind:recordsData="this.$store.state.paginatedItems" />
         <!-- <Records v-bind:recordsData="this.$store.state.filteredByCategoryItems" /> -->
         <!-- <Records  /> -->
         <PaginationButtons v-on:paginationButtonAction="pageHandler($event)" />
      </div>

      <p v-if="this.$store.state.error">{{ error }}</p>
   </div>
</template>

<script>
import PaginationButtons from '@/components/PaginationButtons.vue';
import Records from '@/components/Records.vue';
import { mapActions } from 'vuex';

export default {
   data() {
      return {
         value: '',
         // categorized: []
      };
   },

   components: {
      PaginationButtons,
      Records,
   },

   methods: {
      // changeLanguage() {
      //    this.changeStoreLanguage();
      //    this.fetchContent(this.value);
      // },

      filterItemsHandle(value) {
         this.fetchContent(value);
         // this.filteredByCategory()
      },

      pageHandler(number) {
         this.handlePage(number);
      },

      ...mapActions(['filteredByCategory', 'fetchContent', 'handlePage']),
   },
   // created() {
   // localStorage.removeItem('items', JSON.stringify(this.$store.state.items));
   // localStorage.removeItem('items', JSON.stringify(this.$store.state.paginatedItems));
   // this.fetchContent();
   // },
};
</script>

<style lang="scss">
.category {
   padding-top: 20vh;
}
</style>