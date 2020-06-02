<template>
  <div>
    <span v-for="(item, index) in data" :key="index" class="my-footer-text pl-3 mt-1">
        <i :class="[item.icon_class, 'my-icon']"></i>&nbsp;
        <a class="my-link">{{item.title}}</a>
    </span>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods:{
  }
};
</script>

<style scoped>
.my-footer-text {
    color: #ffffff;
    font-family: 'Bitter', serif;
    font-size: 12px;
    display: block;
}

.my-icon {
    color: #A7A9AC !important;
    min-width: 15px;
}

.my-link:hover {
    text-decoration: none;
    color: #1ee86f !important;
    cursor: pointer;
}
</style>