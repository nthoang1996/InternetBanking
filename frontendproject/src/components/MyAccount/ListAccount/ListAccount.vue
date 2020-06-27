<template>
    <div class="cont">
        <b-container>
            <p class="txtTitle">DANH SÁCH KHÁCH HÀNG</p>    
            <Account />
            <Account />
            <Account />
        </b-container>

    </div>
</template>


<script>
import Account from './Account'
export default {
    name: 'ListAccount',
    components:{
        Account
    }
}
</script>

<style scoped>
.cont{
    margin-left: 20px;
    margin-right: 20px;
}
.txtTitle{
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 10px;
}

</style>