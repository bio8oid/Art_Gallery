<template>
   <div v-if="this.$store.state.singleItem !== null">
      <img
         width="1349"
         height="665"
         v-if="this.$store.state.singleItem.webImage !== null"
         style="width: 100%"
         v-bind:src="this.$store.state.singleItem.webImage.url"
         v-bind:alt="this.$store.state.singleItem.title"
      />

      <div class="record record-details">
         <h3>{{ this.$store.state.singleItem.longTitle }}</h3>
         <h4 v-if="this.$store.state.singleItem.label.makerLine === null">
            {{ this.$store.state.singleItem.principalOrFirstMaker }}
         </h4>
         <p>{{ this.$store.state.singleItem.label.makerLine }}</p>
         <p>{{ this.$store.state.singleItem.subTitle }}</p>
         <p>Category: {{ this.$store.state.singleItem.objectTypes[0] }}</p>
         <p class="record-description">
            {{ this.$store.state.singleItem.label.description }}
         </p>
      </div>
   </div>
</template>

<script>
export default {
   name: 'singleItem',
};
</script>

<style lang="scss">
.record-details {
   width: 95%;
   height: 100%;
   padding: 50px;

   h3 {
      padding-bottom: 50px;
   }

   .record-description {
      padding-top: 50px;
      font-size: 18px;
   }

   @media not all and (hover: none) {
      &:hover {
         transform: scale(1);
      }
   }
}

@media (max-width: 458px) {
   .record h3 {
      font-size: 28px;
   }
}
</style>
