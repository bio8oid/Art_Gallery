<template>
   <p class="language-button" @click="$emit('changeLanguage')">
      {{ this.$store.state.language === 'nl' ? 'EN' : 'NL' }}
   </p>
</template>

<script>
export default {
   name: 'LanguageButton',
};
</script>

<style lang="scss">
.language-button, .pagination-buttons {
   position: fixed;
   top: 30px;
   right: 25px;
   z-index: 3;
   background: #2c3e50;
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
</style>