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
         <option value="&type=photomechanical+print">photomechanical print</option>
         <option value="&type=photograph">photograph</option>
      </select>

      <p v-if="this.$store.state.loading" class="loading">Loading...</p>
      <p v-else-if="this.$store.state.error" class="loading">{{ this.$store.state.error }}</p>

      <div v-else class="records-container">
         <Records v-bind:recordsData="this.$store.state.paginatedItems" />
         <PaginationButtons v-on:paginationButtonAction="pageHandler($event)" />
      </div>
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
      };
   },

   components: {
      PaginationButtons,
      Records,
   },

   methods: {
      filterItemsHandle(value) {
         this.fetchContent(value);
      },

      pageHandler(number) {
         this.handlePage(number);
      },

      ...mapActions(['filteredByCategory', 'fetchContent', 'handlePage', 'reset']),
   },

   created() {
      this.reset();
      this.fetchContent(value);
   },
};
</script>

<style lang="scss">
.category {
   padding-top: 15vh;

   .category-header {
      color: rgb(199, 199, 199);
      text-shadow: 3px 3px 10px #000;
   }

   .select-element {
      margin: 10vh 0;
   }
}
</style>
