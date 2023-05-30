<template>
   <div class="single-item-container" v-if="$store.state.singleItem !== null">
      <img
         v-if="$store.state.singleItem.webImage !== null"
         style="width: 100%"
         v-bind:src="$store.state.singleItem.webImage.url"
         v-bind:alt="$store.state.singleItem.title"
      />

      <div class="record record-details">
         <h2>{{ $store.state.singleItem.longTitle }}</h2>
         <h3 v-if="$store.state.singleItem.label.makerLine === null">
            {{ $store.state.singleItem.principalOrFirstMaker }}
         </h3>
         <p>{{ $store.state.singleItem.label.makerLine }}</p>
         <p>{{ $store.state.singleItem.subTitle }}</p>
         <p>Category: {{ $store.state.singleItem.objectTypes[0] }}</p>
         <p class="record-description">
            {{ $store.state.singleItem.label.description }}
         </p>
      </div>
   </div>
</template>

<script lang="ts">
export default {
   name: 'singleItem',
};
</script>

<style lang="scss">
.single-item-container img {
   box-shadow: 5px 5px 10px #202327;
}

.record-details {
   width: 95%;
   height: 100%;
   padding: 50px;

   h2 {
      padding-bottom: 50px;
   }

   .record-description {
      padding-top: 50px;
      font-size: 17px;
   }

   @media not all and (hover: none) {
      &:hover {
         transform: scale(1);
      }
   }
}

@media (max-width: 458px) {
   .record h2 {
      font-size: 28px;
   }
}
</style>
