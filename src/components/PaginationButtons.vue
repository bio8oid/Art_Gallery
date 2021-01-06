<template>
   <div>
      <button
         v-for="number in this.$store.state.paginationNumbers"
         :key="number"
         @click="$emit(`paginationButtonAction`, number)"
         class="pagination-buttons"
      >
         {{ number }}
      </button>
   </div>
</template>

<script>
export default {
   name: 'PaginationButtons',
};
</script>

<style lang="scss">
.pagination-buttons {
   position: static;
   padding: 5px 10px;
   margin: 2.5% 10px 5% 10px;
   box-shadow: 5px 5px 10px #202327;
}
</style>
