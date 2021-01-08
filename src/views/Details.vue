<template>
   <div class="home details">
      <div id="app">
         <p v-if="this.$store.state.loading" class="loading">Loading...</p>
         <p v-else-if="this.$store.state.error" class="loading">{{ this.$store.state.error }}</p>
         <div v-else>
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
   color: rgb(199, 199, 199);
   text-shadow: 3px 3px 10px #000;
   margin: 20vh 0;
}

.details-related-records {
   justify-content: space-around;
}
</style>
