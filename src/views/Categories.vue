<template>
   <div class="category">
      <h1 class="category-header">Select Category</h1>
      <select
         class="select-element"
         name="categories"
         id="categories"
         aria-label="categories"
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
         <Records v-bind:recordsData="$store.state.paginatedItems" />
         <PaginationButtons v-on:paginationButtonAction="pageHandler($event)" />
      </div>
   </div>
</template>

<script lang="ts">
import PaginationButtons from '../components/PaginationButtons.vue';
import Records from '../components/Records.vue';
import { mapActions } from 'vuex';
import store from '../store/index';

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
      filterItemsHandle(value: string) {
         this.fetchContent(value);
      },

      pageHandler(number: number) {
         this.handlePage(number);
      },

      ...mapActions(['fetchContent', 'handlePage', 'reset']),
   },

   created() {
      store.dispatch.reset();
   },
};
</script>

<style lang="scss">
.category {
   padding-top: 11vh;

   .category-header {
      margin-top: 0;
   }

   .select-element {
      margin-top: 10vh;
   }
}
</style>
