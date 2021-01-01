<template>
   <div class="details">
      <LanguageButton v-on:changeLanguage="changeLanguage()" />

      <div id="app">
         <p v-if="this.$store.state.loading">Loading...</p>

         <div v-else>
            <SingleItem />
            <div class="random-button" @click="getgetRandom()">RANDOM</div>
         </div>

         <p v-if="this.$store.state.error">{{ error }}</p>
      </div>
   </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue';
import LanguageButton from '@/components/LanguageButton.vue';
import { mapActions } from 'vuex';

export default {
   // data() {
   //    return {
   //       random: JSON.parse(localStorage.getItem('random')) || 0,
   //    };
   // },

   components: {
      SingleItem,
      LanguageButton,
   },

   methods: {
      changeLanguage() {
         this.changeStoreLanguage();
         // this.setUrl(this.$store.state.itemsId[this.$store.state.random]);
         this.fetchContent(this.$store.state.itemsId[this.$store.state.random]);
      },

      getgetRandom() {
         this.getRandom();
         // this.setUrl(this.$store.state.itemsId[this.$store.state.random]);
         this.fetchContent(this.$store.state.itemsId[this.$store.state.random]);
      },

      ...mapActions([
         'fetchContent',
         'changeStoreLanguage',
         'getRandom',
         // 'setUrl',
      ]),
   },

   created() {
      this.getRandom();
      // this.setUrl(this.$store.state.itemsId[this.$store.state.random]);
      this.fetchContent(this.$store.state.itemsId[this.$store.state.random]);
   },
};
</script>

<style lang="scss">
.randomizer {
   .record-randomizer {
      width: 95%;
      height: 100%;
      padding: 50px;
   }
}

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
