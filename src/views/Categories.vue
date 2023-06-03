<template>
   <div class="category">
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
      <div class="records-container">
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

      ...mapActions(['fetchContent', 'handlePage', 'reset']),
   },

   created() {
      this.reset();
   },
};
</script>

<style lang="scss">
.category {
   padding-top: 15vh;

   .select-element {
      margin: 10vh 0;
   }
}
</style>
