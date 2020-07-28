<template>
    <div>
        <b-container>
            <b-row>
                <b-col></b-col>
                <b-col cols="6">
                    <p class="txtTitle">TẠO TÀI KHOẢN KHÁCH HÀNG</p>
                    <b-form @submit.prevent="onSubmit">
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
                        <div class="divButton">
                            <b-button class="text-center mt-3" type="submit" variant="primary">Tạo tài khoản</b-button>
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
import Swal from 'sweetalert2';
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
        async onSubmit() {
            Swal.fire({
                title: 'Xác nhận',
                text: "Bạn có muốn tạo tài khoản",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
            }).then( async (result) => {
                if (result.value) {
                    this.handleBeforeCallServer();
                    const url = "http://localhost:3000/employee/create_customer_account";
                    const data = JSON.stringify(this.form);
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
                            //console.log("success");
                            Swal.fire({
                                icon: 'success',
                                title: 'Tạo tài khoản thành công',
                                text: 'Thông tin tài khoản đã được gởi về địa chỉ email đã đăng ký',
                            })
                            return this.$router.push("/employee/list_customer_account");
                        } else {
                            Swal.fire({
                                title: 'Warning',
                                text: "Lỗi không thể tạo tài khoản",
                                icon: 'error',
                            });
                        }
                    });
                }   
            })    
        },
    }
}
</script>


<style scoped>
.txtTitle{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-top: 35px;
    margin-bottom: 35px;
}
.title{
    font-weight:600;
    margin-top: 30px;
    margin-bottom: 30px;
}
.divButton{
    display: flex;
    justify-content: center;
}
</style>