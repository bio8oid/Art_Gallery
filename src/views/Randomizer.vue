<template>
   <div class="details random">
      <p v-if="this.$store.state.loading" class="loading">Loading...</p>
      <p v-else-if="this.$store.state.error" class="loading">{{ this.$store.state.error }}</p>

      <div v-else>
         <SingleItem />
         <div class="random-button" @click="getRandomHandle()">RANDOM</div>
      </div>
   </div>
</template>

<script lang="ts">
import SingleItem from '../components/SingleItem.vue';
import store from '../store/indexTs';

export default {
   components: {
      SingleItem,
   },

   methods: {
      getRandomHandle() {
         store.dispatch.getRandom();
      },
   },

   created() {
      store.dispatch.getRandom();
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
</style>
