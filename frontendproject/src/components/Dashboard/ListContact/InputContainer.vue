<template>
    <div>
        <label :for="data.key">{{data.name}}</label>
        <input :id="data.key" type="text" :name="data.key" autocomplete="off" :disabled="data.is_disabled" @keyup="handleChange" v-model="value"/>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        data(){
          return{
            value: '',
          }
        },
        methods:{
          handleChange(){
            this.$emit('dataChange', this.data.key, this.value);
          }
        }
    }
</script>

<style scoped>
.my-margin {
  margin-left: 0;
  margin-bottom: 20px;
}
</style>
<style scoped src="@/assets/css/send_money_page.css"></style>