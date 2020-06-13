<template>
    <div class="row">
        <div class="col-sm-3 text-right"><h5 class="my-label">{{myLabel}}:</h5></div>
        <div class="col-sm-9 text-left"><h5>{{value}}</h5></div>
    </div>
</template>

<script>
    import data from '../../../assets/info.json';
    export default {
        props: ['mykey', 'value'],
        data(){
            return {
                myLabel : ''
            }
        },
        mounted(){
            this.myLabel = data.constant[this.mykey];
        }
    }
</script>

<style scoped>
.my-label{
    font-weight: bold;
}
</style>