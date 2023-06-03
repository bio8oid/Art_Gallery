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
   padding: 10px 15px;
   margin: 2.5% 10px 5% 10px;
   background: #2c3e50;
   border: none;
   border-radius: 5px;
   color: #ffdc96;
   font-size: 16px;
   cursor: pointer;
}
</style>
