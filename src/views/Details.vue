<template>
   <div class="details">
      <div id="app">
         <p v-if="this.$store.state.loading" class="loading">Loading...</p>

         <div v-else>
            <SingleItem />
            <h2 class="related-items">YOU MAY BE INTERESTED WITH</h2>
            <Records
               class="details-related-records"
               v-bind:recordsData="this.$store.state.relatedItems"
            />
         </div>

         <p v-if="this.$store.state.error">{{ error }}</p>
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
      changeComponentLanguage() {
         console.log('working');
         this.fetchContent(this.value);
      },

      updated() {
         this.getRelatedItems();
         this.fetchContent(this.$route.params.id);
         window.scrollTo(0, 0);
      },

      ...mapActions(['fetchContent', 'getRelatedItems']),
   },

   created() {
      this.getRelatedItems();
      this.fetchContent(this.$route.params.id);
      window.scrollTo(0, 0);
   },
};
</script>

<style lang="scss">
.related-items,
.loading,
.category-header {
   color: rgb(199, 199, 199);
   text-shadow: 3px 3px 10px #000;
}

.details-related-records {
   justify-content: space-around;
}
/* https://www.rijksmuseum.nl/api/en/collection/SK-A-2860?key=iOQQBTgH */
</style>
