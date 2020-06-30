<template>
    <div class="cont">
        <b-container>
            <p class="txtTitle">DANH SÁCH KHÁCH HÀNG</p>
            <div class="divfilter">
                <FilterAccount />
            </div>    
            <div class="listAccount" id="thanhcuon">
                <Account />
                <Account />
                <Account />
                <Account />
                <Account />
                <Account />
            </div>
        </b-container>

    </div>
</template>


<script>
import Account from './Account'
import FilterAccount from './FilterAccount'
export default {
    name: 'ListAccount',
    components:{
        Account,
        FilterAccount
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
    margin-top: 25px;
    margin-bottom: 10px;
}

.divfilter{
    width: 100%;
    display: flex;    
    justify-content: flex-end;
    margin-bottom: 0px;
}

.listAccount{
    overflow: auto;
    margin-top: 25px;
    margin-bottom: 20px;
    height: 470px;
}

::-webkit-scrollbar {
    width: 9px;
}

::-webkit-scrollbar-thumb{
    background: #888;
    border-radius: 6px;
    padding-left: 10px;
}


</style>