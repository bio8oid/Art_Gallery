<template>
   <div class="home">
      <img class="background" alt="Vue logo" src="../assets/background.webp" />
      <select
         class="select-element"
         name="sort-by"
         id="sort-by"
         aria-label="sort-by"
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
      <div>
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
      sortItemsHandle(value: string) {
         this.sortItems(value);
      },

      pageHandler(number: number) {
         this.handlePage(number);
      },

      ...mapActions(['fetchContent', 'sortItems', 'handlePage']),
   },

   created() {
      store.dispatch.fetchContent('');
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

.loading {
   margin-top: 50vh;
}

.loading,
.category-header,
.related-items-header {
   font-size: 28px;
   color: rgb(199, 199, 199);
   text-shadow: 3px 3px 10px #000;
}

.select-element {
   padding: 5px 15px;
   margin: 4% 0 2.5% 0;
   border-radius: 5px;
   border: 5px solid #2c3e50;
   box-shadow: 5px 5px 10px #202327;
   text-transform: uppercase;
}
</style>
