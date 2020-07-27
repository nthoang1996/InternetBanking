<template>
    <div class="mb-3">
        <div class="card">
            <div class="card-header title">
                {{data.nameType}}
            </div>
            <div class="card-content">
                <p class="txtName" v-if="data.type === 1">
                    {{data.des_name}}
                </p>
                <p class="txtName" v-else>
                    {{data.source_name}}
                </p>
                <p class="txtAccount" v-if="data.type === 1">{{data.des_username}}</p>
                <p class="txtAccount" v-else>{{data.source_username}}</p>

                <p class="txtCoin">
                    <span>Số tiền: </span>
                    <span class="txtMoney">{{data.value}}</span>
                </p>
                <p class="txtDate">
                    <span>Ngân hàng: </span>
                    <span class="">{{data.bank_name}}</span>
                </p>
                <p class="txtDate">
                    <span>Thời gian: </span>
                    <span>{{data.date_display}}</span>
                </p>
                <p class="txtMessage">Tin nhắn: {{data.message}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from "../../../Mixin";

export default {
    mixins: [mixin],
    props: ["data"],      
}
</script>

<style scoped>
.title{
    font-size: 16px;
    font-weight: bold;
    background-color: #295490;
    color: white;
}
.card-content{
    padding: 0.75rem 1.25rem;
}

.card-content p{
    margin: 9px 0;
}

.txtName{
    font-size: 20px;
    font-weight: bold;
    color: dimgrey;
}
.txtAccount{
    font-size: 14px;
}
.txtCoin{
    font-size: 14px;
    font-weight: bold;
}
.txtDate{
    font-size: 15px;
    font-weight: bold;
}
.txtMessage{
    font-size: 15px;
    font-style: italic;
}
.txtMoney{
    padding: 2px 5px;
    border-radius: 5px;
    color: #fff;
    background-color: dodgerblue;
    font-size: 18px;
}
</style>