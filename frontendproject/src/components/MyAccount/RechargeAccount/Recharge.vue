<template>
    <b-col class="rowRight shadow-sm">
        <p class="txtTitleSmall">Nạp tiền</p>
        <b-form @submit.prevent="onSubmit(data)">
            <b-form-group id="txtInputMoney" label="Nhập số tiền cần nạp:" label-for="inputMoney" >
                <b-form-input id="inputMoney" v-model="form.money" type="text"></b-form-input>
                <span class="txtInputInvalid">Input Invalid</span>
            </b-form-group>
            <div class="divButtonSubmit">
                <b-button type="submit" variant="primary">Nạp tiền</b-button>
            </div>
        </b-form>
    </b-col>
</template>

<script>
import mixin from '../../../Mixin';
export default {
    mixins: [mixin],
    props:["data"],
    data() {
        return {
            form: {
                money: '',    
            }
        }
    },
    methods: {
        async onSubmit(dataId) {
            this.handleBeforeCallServer();
            const money = this.form.money;
            const id = dataId[0].id;
            const dataSend = {money, id};
            if (money > 50000){
                const url = "http://localhost:3000/customer/recharge_coin";
                const data = JSON.stringify({dataSend});
                console.log(data);
                await fetch(url, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.internetbanking_accesstoken
                    },
                    body: data
                }).then(response => response.json()).then(data => {
                    if (data.success) {
                        console.log(data);
                        alert('Nạp tiền thành công');
                        return this.$router.push("/employee/list_customer_account");

                    } else {
                        alert('Không thể nạp tiền');
                    }
                    });
                
            }else{
                alert("Input money invalid");
            }
        },
    },
}
</script>

<style scoped>
.txtTitle{
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 20px;
}
.rowLeft{
    margin-right: 20px;
    border-radius: 7px;
    padding: 40px;
    background-color: #fff;
}
.rowRight{
    padding: 40px;
    margin-left: 20px;
    border-radius: 7px; 
    background-color: #fff;   
}
.txtTitleSmall{
    font-weight: bold;
    font-size: 22px;
    text-align: center;
}
.divInfor{
    margin-top: 10px;
    font-size: 14px;
}
.divInforTitle{
    font-weight: bold;
}
.txtmoney{
    font-weight: bold;
    color:blue;
}
.txtChangeAccount{
    margin-top: 8px;
    margin-right: 5px;
    float: right;
    font-size: 14px;
    font-style: italic;
    color: dodgerblue;
    cursor: pointer;
    text-decoration: underline;
}
.divChangAccount{
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
}
.txtInputInvalid{
    font-style: italic;
    color: red;
    font-size: 13px;
    visibility: hidden;
}
#txtInputMoney{
    font-weight: bold;
    font-size: 14px;
}
.divButtonSubmit{
    display: flex;
    justify-content: center;
}
</style>