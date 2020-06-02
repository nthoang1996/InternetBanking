<template>
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        <div v-for="(image, index) in srcImage" :key="index" :class="[{active:index==0}, 'carousel-item']">
            <img :src="image" class="d-block w-100" :alt="src" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["srcImage"],
};
</script>

<style scoped>
</style>