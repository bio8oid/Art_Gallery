<template>
   <div class="details random">
      <div>
         <SingleItem />
         <button class="random-button" @click="getRandomHandle()">RANDOM</button>
      </div>
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
      },
      ...mapActions(['getRandom']),
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
   font-size: 18px;
   padding: 18px;
   background: #202327;
   border: 3px solid #000;
   color: #ffdc96;
   border-radius: 10px;
   cursor: pointer;
}
</style>
