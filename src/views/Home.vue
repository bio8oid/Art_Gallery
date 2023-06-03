<template>
   <div class="home">
      <img class="background" alt="Vue logo" src="../assets/background.jpg" />
      <label for="sort-by"></label>
      <select class="select-element" name="sort-by" id="sort-by" v-model="value" @change="sortItemsHandle(value)">
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
      sortItemsHandle(value) {
         this.sortItems(value);
      },

      pageHandler(number) {
         this.handlePage(number);
      },

      ...mapActions(['fetchContent', 'sortItems', 'handlePage']),
   },

   created() {
      this.fetchContent('');
   },
};
</script>

<style lang="scss">
.background {
   width: 100%;
}

.home,
.details {
   min-height: 68vh;
}
.select-element {
   padding: 5px 15px;
   margin: 4% 0 2.5% 0;
   border-radius: 5px;
   border: 5px solid #2c3e50;
   text-transform: uppercase;
}
</style>
