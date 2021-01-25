<template>
   <p class="language-button" @click="changeLanguage()">
      {{ this.$store.state.language === 'nl' ? 'EN' : 'NL' }}
   </p>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import store from '../store/index';

export default {
   name: 'LanguageButton',

   methods: {
      changeLanguage() {
         this.changeStoreLanguage();
         this.fetchContent(store.state.route);
      },

      ...mapActions(['fetchContent', 'changeStoreLanguage']),
   },
};
</script>

<style lang="scss">
.language-button {
   position: fixed;
   top: 30px;
   right: 25px;
   z-index: 3;
   background: #2c3e50;
   border: none;
   border-radius: 5px;
   padding: 3px 5px;
   margin: 0;
   color: #ffdc96;
   font-size: 16px;
   cursor: pointer;

   &:hover {
      box-shadow: 0 0 5px 1px #ffdc96;
   }
}

@media (max-width: 458px) {
   .language-button {
      top: 110px;
   }
}
</style>
