<template>
    <b-container class="mb-2">
        <b-form @submit.prevent="onSubmit(getAccountEmployeeActive)">

        <div v-for="item in getAccountEmployeeActive" :key="item.id">
        <p class="txtTitle">CHỈNH SỬA TÀI KHOẢN NHÂN VIÊN</p>
            <b-row class="cardBlock">
                <b-col>
                    <b-row>
                        <b-col cols="7"></b-col>
                        <b-col><p class="titleName">Tên tài khoản:</p></b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-form-input 
                        id="txtusername" 
                        v-model="form.username" 
                        type="text" 
                        :placeholder="item.username"
                        disabled    
                    >
                    </b-form-input>
                </b-col>
                <b-col>
                    
                </b-col>
            </b-row>
            <b-row class="cardBlock">
                <b-col>
                    <b-row>
                        <b-col cols="7"></b-col>
                        <b-col><p class="titleName">Họ và tên:</p></b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-form-input 
                        id="txtname" 
                        v-model="form.name" 
                        type="text"
                        :readonly="checkName === false"
                        :required="checkName === true"
                        :placeholder="item.name"  
                    >
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-button class="text-center" @click="handleClickName(item.name)" variant="success">
                        <i class="fa fa-edit"></i>
                    </b-button>
                </b-col>
            </b-row>
            <b-row class="cardBlock">
                <b-col>
                    <b-row>
                        <b-col cols="7"></b-col>
                        <b-col><p class="titleName">Số điện thoại:</p></b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-form-input 
                        id="txtphone" 
                        v-model="form.phone" 
                        type="text" 
                        :placeholder="item.phone"
                        :readonly="checkPhone === false"
                        :required="checkPhone === true"
                    >
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-button class="text-center" @click="handleClickPhone(item.phone)" variant="success">
                        <i class="fa fa-edit"></i>
                    </b-button>
                </b-col>
            </b-row>
            <b-row class="cardBlock">
                <b-col>
                    <b-row>
                        <b-col cols="7"></b-col>
                        <b-col><p class="titleName">Địa chỉ:</p></b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-form-input 
                        id="txtaddress" 
                        v-model="form.address" 
                        type="text"
                        :placeholder="item.address"
                        :readonly="checkAddress === false"
                        :required="checkAddress === true"
                    ></b-form-input>
                </b-col>
                <b-col>
                    <b-button class="text-center" @click="handleClickAddress(item.address)" variant="success">
                        <i class="fa fa-edit"></i>
                    </b-button>
                </b-col>
            </b-row>
            <b-row class="cardBlock">
                <b-col>
                    <b-row>
                        <b-col cols="7"></b-col>
                        <b-col><p class="titleName">Email:</p></b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-form-input 
                        id="txtemail" 
                        v-model="form.email" 
                        type="email" 
                        :placeholder="item.email"
                        :readonly="checkEmail === false"
                        :required="checkEmail === true"
                    ></b-form-input>
                </b-col>
                <b-col>
                    <b-button class="text-center" @click="handleClickEmail(item.email)" variant="success">
                        <i class="fa fa-edit"></i>
                    </b-button>
                </b-col>
            </b-row>
            <div class="divButton">
                <b-button class="text-center mt-2 mb-4 mr-2" @click="handleCancel" variant="danger">
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
            },
            checkName: false,
            checkPhone: false,
            checkEmail: false,
            checkAddress: false
        }
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
        },
        handleClickName(name){
            //console.log("Name", name);
            this.checkName = true;
            this.form.name = name;
        },
        handleClickPhone(phone){
            console.log("Phone", phone);
            this.checkPhone = true;
            this.form.phone = phone;
        },
        handleClickAddress(address){
            this.checkAddress = true;
            this.form.address = address;
        },
        handleClickEmail(email){
            this.checkEmail = true;
            this.form.email = email;
        },
        handleCancel(){
            return this.$router.push("/dashboard");
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
.titleName{
    font-weight: bold;
    font-size: 17px;
    line-height: 40px;
    margin: 0 !important;
    padding: 0 !important;
}
.divButton{
    display: flex;
    justify-content: center;
}

.cardBlock{
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>