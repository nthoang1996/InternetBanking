<template>
    <div>
        <label :for="data.key">{{data.name}}</label>
        <textarea :id="data.key" :name="data.key" autocomplete="off" :disabled="data.is_disabled" class="my-custom my-text-area" @keyup="handleChange" v-model="value"/>
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

<style scoped src="@/assets/css/send_money_page.css"></style>