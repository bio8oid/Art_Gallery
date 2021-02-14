<template>
   <div class="details random">
      <SingleItem v-if="$store.state.loading === false" />
      <div class="random-button" @click="getRandomHandle()">RANDOM</div>
   </div>
</template>

<script lang="ts">
import SingleItem from '../components/SingleItem.vue';
import store from '../store/index';
import { mapActions } from 'vuex';

export default {
   components: {
      SingleItem,
   },

   methods: {
      getRandomHandle() {
         this.getRandom();
      },
      ...mapActions(['getRandom']),
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
