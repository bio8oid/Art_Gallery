<template>
   <button class="language-button" @click="changeLanguage()">
      {{ this.$store.state.language === 'nl' ? 'EN' : 'NL' }}
   </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'LanguageButton',

   methods: {
      changeLanguage() {
         this.changeStoreLanguage();
         this.fetchContent(this.$store.state.route);
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
   padding: 8px;
   margin: 0;
   color: #ffdc96;
   font-size: 16px;
   cursor: pointer;
}

@media (max-width: 458px) {
   .language-button {
      top: 110px;
   }
}
</style>
