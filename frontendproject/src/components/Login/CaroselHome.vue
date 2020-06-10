<template>
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        <div v-for="(image, index) in srcImage" :key="index" :class="[{active:index==0}, 'carousel-item']">
            <CaroselItem :srcImage="image"/>
        </div>
    </div>
  </div>
</template>

<script>
import CaroselItem from './CaroselItem'

export default {
    props: ["srcImage"],
    components: {
    CaroselItem,
  }
};
</script>

<style scoped>

</style>