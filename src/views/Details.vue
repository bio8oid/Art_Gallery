<template>
   <div class="home details">
      <div id="app">
         <div>
            <SingleItem />
            <h2 class="related-items-header">YOU MAY BE INTERESTED WITH</h2>
            <Records class="details-related-records" v-bind:recordsData="this.$store.state.relatedItems" />
         </div>
      </div>
   </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue';
import Records from '@/components/Records.vue';
import { mapActions } from 'vuex';

export default {
   components: {
      SingleItem,
      Records,
   },

   watch: {
      $route: 'updated',
   },

   methods: {
      updated() {
         this.getRelatedItems();
         this.fetchContent(this.$route.params.id);
         window.scrollTo(0, 0);
      },

      ...mapActions(['fetchContent', 'getRelatedItems']),
   },

   created() {
      this.updated();
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
