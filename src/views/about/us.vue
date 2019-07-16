<template>
  <div class="us">this page is "{{msg}}"</div>
</template>

<script>
export default {
  name: "aboutUs",
  data() {
    return {
      msg: "about us"
    };
  },
  mounted: function() {
    console.log(process.env.NODE_ENV);
  }
};
</script>
