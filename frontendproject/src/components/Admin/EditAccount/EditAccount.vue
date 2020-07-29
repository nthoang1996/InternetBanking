<template>
    <b-container class="mb-2">
        <b-row>
            <b-col></b-col>
            <b-col cols="6">
                <p class="txtTitle">CHỈNH SỬA TÀI KHOẢN NHÂN VIÊN</p>
                <b-form @submit.prevent="onSubmit(getAccountEmployeeActive)">
                    <div v-for="item in getAccountEmployeeActive" :key="item.id">
                        <b-form-group class="title" label="Tên tài khoản:" label-for="txtusername" >
                            <b-form-input 
                                id="txtusername" 
                                v-model="form.username" 
                                type="text" 
                                readonly
                                :placeholder="item.username"    
                            >
                            </b-form-input>
                        </b-form-group>


                        <b-form-group class="title" label="Họ tên nhân viên:" label-for="txtname" >
                            <b-form-input 
                                id="txtname" 
                                v-model="form.name" 
                                type="text" 
                                :placeholder="item.name"  
                            >
                            </b-form-input>
                        </b-form-group>
                    
                        <b-form-group class="title" label="Số điện thoại:" label-for="txtphone" >
                            <b-form-input 
                                id="txtphone" 
                                v-model="form.phone" 
                                type="text" 
                                :placeholder="item.phone"
                            >
                            </b-form-input>
                        </b-form-group>

                        <b-form-group class="title" label="Địa chỉ:" label-for="txtaddress" >
                            <b-form-input 
                                id="txtaddress" 
                                v-model="form.address" 
                                type="text"
                                :placeholder="item.address"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group class="title" label="Email:" label-for="txtemail" >
                            <b-form-input 
                                id="txtemail" 
                                v-model="form.email" 
                                type="email" 
                                :placeholder="item.email"
                            ></b-form-input>
                        </b-form-group>

                        
                        <div class="divButton">
                            <b-button class="text-center mt-2 mb-4 mr-2" type="submit" variant="danger">
                                <i class="fa fa-arrow-left"></i>
                                Quay lại
                            </b-button>
                            <b-button class="text-center mt-2 mb-4" type="submit" variant="primary">
                                <i class="fa fa-edit"></i>
                                Chỉnh sửa tài khoản
                            </b-button>
                            
                        </div>
                    </div>
                </b-form>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
import mixin from '../../../Mixin';
import Swal from 'sweetalert2'
import { mapGetters } from "vuex";
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
            }
        }
    },
    mounted(){

    },
    methods:{
        async onSubmit(account){
            //console.log(account);
            Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có muốn chỉnh sửa tài khoản nhân viên?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có',
            }).then(async (result) => {
                if (result.value){
                    this.form.username = account[0].username;
                    if(this.form.name === ""){
                        this.form.name = account[0].name;
                    }
                    if(this.form.phone === ""){
                        this.form.phone = account[0].phone;
                    }
                    if(this.form.address === ""){
                        this.form.address = account[0].address;
                    }
                    if(this.form.email === ""){
                        this.form.email = account[0].email;
                    }
                    const accountUpdate = {
                        form: this.form,
                        id: account[0].id
                    }
                    this.handleBeforeCallServer();
                    const url = "http://localhost:3000/admin/edit_employee_account";
                    const data = JSON.stringify(accountUpdate);
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
                                text: 'Đã chỉnh sửa tài khoản nhân viên thành công',
                                timer: 1500
                            })
                            return this.$router.push("/dashboard");
                        } else {
                            Swal.fire({
                                title:'Lỗi!',
                                text: "Tên tài khoản đã bị trùng",
                                icon: 'error',
                            });
                        }
                    });
                }
            })
            
            //alert(JSON.stringify(this.form));
        }
    },
    computed:{
        ...mapGetters(["getAccountEmployeeActive"])
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