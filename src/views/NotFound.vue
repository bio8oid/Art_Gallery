<template>
   <div class="not-found"></div>
</template>

<script>
export default {
   name: 'NotFound',
};
</script>

<style lang="scss">
.not-found {
   height: 100%;
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   top: 12%;
   background-image: url('../assets/404.webp');
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
}
</style>
