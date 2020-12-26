<template>
<div class="footer">
  <h5>Hello me footer</h5>
  </div>   
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String
  }
};

</script>

<style lang="scss">
.footer {
  height: 20vh;
  background: #020202;
}
</style>