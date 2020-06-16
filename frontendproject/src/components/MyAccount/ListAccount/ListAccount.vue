<template>
    <div>
        <b-container>
            <p class="txtTitle">DANH SÁCH KHÁCH HÀNG</p>    
            <Account />
            <Account />
            <Account />
            <div class="directionButton">
                <span>Quay lại</span>
                <span>Tạo tài khoản</span>
            </div>
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
.txtTitle{
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 10px;
}
.directionButton{
    display: flex;
    justify-content: space-between;
}
.directionButton span{
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    color: #3535fb;
    font-size: 12px;
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
}
</style>