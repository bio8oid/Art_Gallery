<template>
   <div class="details random">
      <p v-if="this.$store.state.loading" class="loading">Loading...</p>

      <div v-else>
         <SingleItem />
         <div class="random-button" @click="getRandomHandle()">RANDOM</div>
      </div>

      <p v-if="this.$store.state.error">{{ error }}</p>
   </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue';
import { mapActions } from 'vuex';

export default {
   components: {
      SingleItem,
   },

   methods: {
      getRandomHandle() {
         this.getRandom();
         this.fetchContent(this.$store.state.itemsId[this.$store.state.random]);
         window.scrollTo(0, 0);
      },

      ...mapActions(['fetchContent', 'getRandom']),
   },

   created() {
      this.getRandomHandle();
   },
};
</script>

<style lang="scss">
.random-button {
   display: block;
   margin: 100px auto;
   width: 230px;
   font-size: 16px;
   padding: 15px;
   background: #202327;
   border: 3px solid #000;
   color: #ffdc96;
   border-radius: 10px;
   cursor: pointer;

   &:hover {
      box-shadow: 0 0 5px 1px #ffdc96;
   }
}
/* https://www.rijksmuseum.nl/api/en/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer */
</style>
