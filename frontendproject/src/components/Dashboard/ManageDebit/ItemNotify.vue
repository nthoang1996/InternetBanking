<template>
  <div v-bind:class="{myNotify: this.data.status}" class="row custom-font-size">
    <div v-if="this.data.type == 1" class="col-sm-2">
      <i class="fa fa-trash fa-3x bg1" ></i>
     
    </div>
    <div v-else class="col-sm-2">
       <i class="fa fa-paper-plane fa-3x bg2"></i>
    </div>
    <div class="col-sm-10">
      <label>
        <b>{{this.data.source_name}}</b>
        đã {{this.type}}
      </label>
      <i>Tin nhắn: {{this.data.message}}</i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    this.setType(this.data);
  },
  data() {
    return {
      type: "xóa nhắc nợ của bạn.",
    }
  },
  methods: {
    setType(data) {
      if(data.type === 0){
        this.type = "thanh toán nhắc nợ cho bạn."
      }
    }
  },
};
</script>

<style scoped>
.custom-font-size {
  font-size: 14px;
  border: 1px solid black;
  width: 100%;
  padding: 0;
  margin: 0;
}

.bg{
  font-size: 16px;
  padding: 0;
}

.bg2 {
  color: rgb(15, 189, 233);
}

.bg1{
  color:rgba(214, 28, 28, 0.774)
}
img {
  background-position: center;
  background-size: 100%;
}

.myNotify{
  background-color: rgba(46, 206, 206, 0.637);
}
</style>