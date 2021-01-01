<template>
   <div class="record-container">
      <div class="record" v-for="item in recordsData" :key="item.id">
         <router-link
            class="details-link"
            :to="{ name: 'Details', params: { id: item.objectNumber } }"
         >
            <div class="record-wrapper">
               <div class="record-text">
                  <h2>{{ item.principalOrFirstMaker }}</h2>
                  <p>{{ item.title }}</p>
               </div>
               <img
                  class="record-image"
                  v-bind:src="item.webImage.url"
                  v-bind:alt="item.title"
               />
            </div>
         </router-link>
      </div>
   </div>
</template>

<script>
export default {
   name: 'records',
   props: ['recordsData'],
};
</script>

<style lang="scss">
.record-container {
   width: 100%;
   display: flex;
   flex-wrap: wrap;
}

.record {
   box-shadow: 5px 5px 10px #202327;
   border-radius: 10px;
   width: 45%;
   max-height: 100%;
   margin: 2.5%;
   background: #fff;
   text-decoration: none;

   .record-wrapper {
      padding: 50px;
      display: flex;
      justify-content: space-between;
      height: 50vh;

      .record-text {
         padding-right: 50px;
         text-align: left;
         color: #2c3e50;

         h2 {
            margin: 0;
         }
         p {
            font-size: 16px;
         }
      }

      .record-image {
         height: 100%;
         max-width: 50%;
         border-radius: 10px;
         border: 6px solid#2c3e50;
         box-shadow: 0 0 5px #2c3e50;
      }
   }

   @media not all and (hover: none) {
      &:hover {
         transform: scale(1.01);
      }
   }

   .details-link {
      text-decoration: none;
   }
}

@media (max-width: 1099px) {
   .record {
      width: 95%;
   }
}

@media (max-width: 579px) {
   .record {
      .record-wrapper {
         height: 100%;
         flex-direction: column;
         align-items: center;

         .record-image {
            max-height: 200px;
            width: 100%;
         }

         .record-text {
            padding: 0;
            text-align: center;
         }
      }
   }
}
</style>
