<template>
    <b-col class="rowRight shadow-sm">
        <p class="txtTitleSmall">Nạp tiền</p>
        <b-form @submit.prevent="onSubmit(data)">
            <b-form-group id="txtInputMoney" label="Nhập số tiền cần nạp:" label-for="inputMoney" >
                <b-form-input id="inputMoney" v-model="form.money" type="text"></b-form-input>
                <span class="txtInputInvalid">Lưu ý: số tiền nạp phải lớn hơn 50,000 VNĐ</span>
            </b-form-group>
            <div class="divButtonSubmit">
                <b-button type="submit" variant="primary">Nạp tiền</b-button>
            </div>
        </b-form>
    </b-col>
</template>

<script>
import mixin from '../../../Mixin';
import Swal from 'sweetalert2';
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
        onSubmit(dataId) {
            this.handleBeforeCallServer();
            const money = this.form.money;
            const id = dataId[0].id;
            const dataSend = {money, id};
            if (money > 50000){
                Swal.fire({
                title: 'Xác nhận',
                text: "Bạn có muốn nạp tiền cho tài khoản?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Không'
                }).then(async (result) => {
                    if (result.value) {
                        const url = "http://localhost:3000/customer/recharge_coin";
                        const data = JSON.stringify({dataSend});
                        //console.log(data);
                        await fetch(url, {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": localStorage.internetbanking_accesstoken
                            },
                            body: data
                        }).then(response => response.json()).then(data => {
                            if (data.success) {
                                //console.log(data);
                                //alert('Nạp tiền thành công');
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Thông Báo',
                                    text: 'Nạp tiền thành công',
                                    showConfirmButton: false,
                                    timer: 1500,
                                })
                                return this.$router.push("/dashboard");
                            } else {
                                Swal.fire({
                                    title: 'Warning',
                                    text: "Lỗi không thể nạp tiền",
                                    icon: 'error',
                                });
                            }
                        });
                    }
                })
            }else{
                Swal.fire({
                    title: 'Warning',
                    text: "Số tiền nạp không hợp lệ",
                    icon: 'warning',
                })
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
    font-size: 13px;
    font-weight: 500;
}
#txtInputMoney{
    font-weight: bold;
    font-size: 14px;
}
.divButtonSubmit{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>