<template>
   <div class="footer">
      <p>Hello me footer</p>
   </div>
</template>

<script>
export default {
   name: 'Footer',
   props: {
      msg: String,
   },
};
</script>

<style lang="scss">
.footer {
   height: 20vh;
   background: #020202;

   p {
      padding: 0;
      margin: 0;
   }
}
</style>
