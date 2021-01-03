<template>
   <div class="home category">

            <LanguageButton v-on:changeLanguage="changeLanguage()" />

      <h1 class="category-header">Select Category</h1>

      <label for="categories"></label>
      <select class="select-element" name="categories" id="categories" v-model="value" @change="selectItemsHandle(value)">
            <option value="" disabled>SELECT</option>
            <option value="painting">painting</option>
            <option value="drawing">drawing</option>
            <option value="print">print</option>
            <option value="photomechanical+print">photomechanical print</option>
            <option value="photograph">photograph</option>
      </select>

      <p v-if="this.$store.state.loading" class="loading" >Loading...</p>

         <div v-else class="records-container">
            <Records v-bind:recordsData="this.$store.state.paginatedItems" />
                  <PaginationButtons v-on:paginationButtonAction="changeLanguage()" />

            <!-- <button
               v-for="number in this.$store.state.paginationNumbers"
               :key="number"
               @click="pageHandler(number)"
               class="pagination-buttons"
            >
               {{ number }}
            </button> -->
         </div>

         <p v-if="this.$store.state.error">{{ error }}</p>
   </div>
</template>

<script>
import LanguageButton from '@/components/LanguageButton.vue';
import PaginationButtons from '@/components/PaginationButtons.vue';
import Records from '@/components/Records.vue';
import { mapActions } from 'vuex';

export default {
   data() {
      return {
         value: '',
      };
   },

   components: {
      PaginationButtons,
      LanguageButton,
      Records,
   },

   methods: {
      changeLanguage() {
         this.changeStoreLanguage();
         this.fetchContent(this.value);
      },

      selectItemsHandle(value) {
         this.fetchContent(value);
         // this.sortItems(value);
      },

      pageHandler(number) {
         this.handlePage(number);
      },

      ...mapActions([
         'fetchContent',
         'changeStoreLanguage',
         // 'sortItems',
         'handlePage',
      ]),
   },

   // updated() {
   //    this.fetchContent(this.value);
   // },

   // created() {
   //    this.fetchContent();
   // },
};
</script>

<style lang="scss">

.category {
   padding-top: 20vh;

   /* h1 {
      margin: 0;
   } */
}
/* https://www.rijksmuseum.nl/en/collection?&involvedMaker=Johannes%20Vermeer&type=painting&st=Objects&ii=0 */
/* https://www.rijksmuseum.nl/en/search?p=1&ps=12&involvedMaker=Johannes%20Vermeer&type=painting&st=Objects&ii=0 */
/* https://www.rijksmuseum.nl/en/search?f=1&p=1&ps=12&involvedMaker=Johannes+Vermeer&type=photomechanical+print&imgonly=True&st=Objects */
</style>