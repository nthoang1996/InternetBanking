<template>
  <div>
    <span v-for="(item, index) in data" :key="index" class="my-footer-text pl-3 mt-1">
       <vue-fontawesome :icon="[item.icon_class]" class="my-icon" size="2" color="lightgray"></vue-fontawesome>&nbsp;
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
    min-width: 20px;
    font-size: 15px !important;
}

.my-link:hover {
    text-decoration: none;
    color: #1ee86f !important;
    cursor: pointer;
}
</style>