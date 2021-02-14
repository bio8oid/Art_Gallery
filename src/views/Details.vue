<template>
   <div class="home details">
      <div id="app">
         <div>
            <SingleItem />
            <h2 class="related-items-header">YOU MAY BE INTERESTED WITH</h2>
            <Records class="details-related-records" v-bind:recordsData="$store.state.relatedItems" />
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import SingleItem from '../components/SingleItem.vue';
import Records from '../components/Records.vue';
import { mapActions } from 'vuex';
import store from '../store/index';
import router from '../router/routes';

export default {
   name: 'Details',

   components: {
      SingleItem,
      Records,
   },

   watch: {
      $route: 'updated',
   },

   methods: {
      updated() {
         this.loadContent(router.app.$route.params.id);
      },
      ...mapActions(['loadContent']),
   },

   created() {
      store.dispatch.loadContent(router.app.$route.params.id);
   },
};
</script>

<style lang="scss">
.related-items-header {
   margin: 20vh 0;
}

.details-related-records {
   justify-content: space-around;
}
</style>
