<template>
    <div>
        <b-container>
            <b-row>
                <b-col></b-col>
                <b-col cols="6">
                    <p class="txtTitle">TẠO TÀI KHOẢN KHÁCH HÀNG</p>
                    <b-form @submit="onSubmit">
                        <b-form-group class="title" label="Họ tên khách hàng:" label-for="txtname" >
                            <b-form-input id="txtname" v-model="form.name" type="text" required></b-form-input>
                        </b-form-group>

                         <b-form-group class="title" label="Số điện thoại:" label-for="txtphone" >
                            <b-form-input id="txtphone" v-model="form.phone" type="text" required></b-form-input>
                        </b-form-group>

                         <b-form-group class="title" label="Địa chỉ:" label-for="txtaddress" >
                            <b-form-input id="txtaddress" v-model="form.address" type="text" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="title" label="Email:" label-for="txtemail" >
                            <b-form-input id="txtemail" v-model="form.email" type="email" required></b-form-input>
                        </b-form-group>
                        <div class="divButton mb-3">
                            <b-button class="text-center" type="submit" variant="primary">Tạo tài khoản</b-button>
                        </div>
                    </b-form>
                </b-col>
                <b-col></b-col>
            </b-row>
        </b-container>
    </div>
</template>


<script>
import mixin from '../../Mixin';
export default {
    mixins: [mixin],
    data() {
        return {
        form: {
            name: '',
            email: '',
            address: '',
            phone: '',
        }
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault()
            this.handleBeforeCallServer();
            const url = "http://localhost:3000/customer/create_customer_account";

            const data = JSON.stringify(this.form);
            console.log(data);
            await fetch(url, {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.internetbanking_accesstoken
                },
                body: data
            }).then(res => res.json()) .then(data => {
                if (data.success) {
                    console.log("success");
                    alert('Tạo tài khoản khách hàng thành công. Thông tin tài khoản đã được gởi đến email của bạn.');
                    return this.$router.push("/employee/list_customer_account");
                } else {
                    return;
                }
            });
        },
    }
}
</script>


<style scoped>
.txtTitle{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 25px;
}
.title{
    font-weight:600;
}
.divButton{
    display: flex;
    justify-content: center;
}
</style>