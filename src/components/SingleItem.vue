<template>
   <div v-if="this.$store.state.singleItem !== null">
      <img
         v-if="this.$store.state.singleItem.webImage !== null"
         style="width: 100%"
         v-bind:src="this.$store.state.singleItem.webImage.url"
         v-bind:alt="this.$store.state.singleItem.title"
      />

      <div class="record record-details">
         <h2>{{ this.$store.state.singleItem.longTitle }}</h2>
         <h3 v-if="this.$store.state.singleItem.label.makerLine === null">
            {{ this.$store.state.singleItem.principalOrFirstMaker }}
         </h3>
         <p>{{ this.$store.state.singleItem.label.makerLine }}</p>
         <p>{{ this.$store.state.singleItem.subTitle }}</p>
         <p>Category: {{ this.$store.state.singleItem.objectTypes[0] }}</p>
         <p class="record-description">
            {{ this.$store.state.singleItem.label.description }}
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
