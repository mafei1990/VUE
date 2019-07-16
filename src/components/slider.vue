<template>
  <!-- <div class="slider">
    <a
      class="img"
      v-for="img in imgLst"
      :key="img.id"
      :href="img.link"
      :style="{backgroundImage: 'url('+ img.url+')'} "></a>
  </div> -->
  <div class="swiper-container">
        <div class="swiper-wrapper">
            <a class="swiper-slide" v-for="img in imgLst" :key="img.id" :href="img.link" :style="{ backgroundImage: 'url(' + img.url + ')' }"></a>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  name: "slider",
  props: ["setting"],
  data() {
    return {
      msg: "loaded",
      imgLst: []
    };
  },
  created: function() {
    this.imgLst = this.setting;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.swiper-container {
  width: 100vw;
  height: 29.6vw;
  .swiper-wrapper {
      width: 100%;
      height: 100%;
  }
  .swiper-slide {
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      img {
          width: 100%;
          height: 100%;
      }
  }
  .swiper-pagination-bullet {
      width:0.833rem;
      height: 0.833rem;
      display: inline-block;
      background: #7c5e53;
  }
}
</style>
