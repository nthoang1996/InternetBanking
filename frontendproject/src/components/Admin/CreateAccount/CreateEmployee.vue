<template>
    <b-container>
        <b-row>
            <b-col></b-col>
            <b-col cols="6">
                <p class="txtTitle">TẠO TÀI KHOẢN NHÂN VIÊN</p>
                <b-form @submit.prevent="onSubmit">
                    <b-form-group class="title" label="Họ tên nhân viên:" label-for="txtname" >
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

                    <b-form-group class="title" label="Tên tài khoản:" label-for="txtusername" >
                        <b-form-input id="txtusername" v-model="form.username" type="text" required></b-form-input>
                    </b-form-group>

                    <b-form-group class="title" label="Mật khẩu:" label-for="txtpassword" >
                        <b-form-input id="txtpassword" v-model="form.password" type="password" required></b-form-input>
                    </b-form-group>

                    <b-form-group class="title" label="Nhập lại mật khẩu:" label-for="txtrepeatpassword" >
                        <b-form-input id="txtrepeatpassword" v-model="form.repeatpassword" type="password" required></b-form-input>
                    </b-form-group>

                    <div class="divButton">
                        <b-button pill class="text-center mt-2 mb-4" type="submit" variant="primary">Tạo tài khoản</b-button>
                    </div>
                </b-form>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
import mixin from '../../../Mixin';
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
                username: '',
                password: '',
                repeatpassword: ''
            }
        }
    },
    methods:{
        async onSubmit(){
            if (this.form.password !== this.form.repeatpassword){
                Swal.fire({
                    title: 'Lỗi!',
                    text: "Mật khẩu không trùng khớp",
                    icon: 'error',
                })
            }else if (this.form.password.length < 6){
                Swal.fire({
                    title: 'Lỗi!',
                    text: "Mật khẩu phải nhiều hơn 6 kí tự",
                    icon: 'error',
                })
            }else{
                Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có muốn tạo tài khoản nhân viên?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có',
                }).then( async (result) => {
                    if (result.value) {
                        this.handleBeforeCallServer();
                        const url = "http://localhost:3000/admin/create_employee_account";
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
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Thông báo',
                                    text: 'Đã tạo tài khoản nhân viên thành công',
                                    timer: 1500
                                })
                                return this.$router.push("/dashboard");
                            } else {
                                Swal.fire({
                                    title: 'Lỗi!',
                                    text: "Tên tài khoản đã bị trùng",
                                    icon: 'error',
                                });
                            }
                        });
                    }   
                })    
            }
        }
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
    margin-top: 20px;
    margin-bottom: 20px;
}
.divButton{
    display: flex;
    justify-content: center;
}
</style>