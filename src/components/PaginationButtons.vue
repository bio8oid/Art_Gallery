<template>
   <div>
      <button
         v-for="number in $store.state.paginationNumbers"
         :key="number"
         @click="$emit(`paginationButtonAction`, number)"
         class="pagination-buttons"
      >
         {{ number }}
      </button>
   </div>
</template>

<script lang="ts">
export default {
   name: 'PaginationButtons',
};
</script>

<style lang="scss">
.pagination-buttons {
   position: static;
   padding: 10px 15px;
   margin: 5% 10px;
   box-shadow: 5px 5px 10px #202327;
   background: #2c3e50;
   border: none;
   border-radius: 5px;
   color: #ffdc96;
   font-size: 16px;
   cursor: pointer;
}
</style>
