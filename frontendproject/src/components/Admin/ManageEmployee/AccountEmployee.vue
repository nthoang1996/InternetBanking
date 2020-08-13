<template>
    <b-card no-body class="mb-3">
        <b-row no-gutters>
            <b-col>
                <div class="content">
                    <span class="txtName">Họ tên nhân viên: </span>
                    <span class="name">{{data.name}}</span>
                    <br>
                    <span class="txtName">Email: </span>
                    <span class="txtInfor">{{data.email}}</span>
                    <br>
                    <span class="txtName">Địa chỉ: </span>
                    <span class="txtInfor">{{data.address}}</span>
                    <br>
                    <span class="btnTransfer" @click="EditAccount(data.id)">Chỉnh sửa tài khoản <i class="fa fa-edit"></i> </span>
                </div>
            </b-col>
            <b-col>
                <div class="content">
                    <span class="txtAndi">Số dư khả dụng: </span>
                    <span class="txtAndi">{{data.bank_balance}}</span>
                    <br>
                    <span class="txtName">Tên tài khoản: </span>
                    <span class="txtCoin">{{data.username}}</span>
                    <br>
                    <span class="txtName">Số điện thoại: </span>
                    <span class="txtInfor">{{data.phone}}</span>
                    <br>
                    <span class="btnViewHistory" @click="deleteAccount(data.id)">Xóa tài khoản <i class="fa fa-trash"></i></span>                    
                </div>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import mixin from "../../../Mixin";
import Swal from 'sweetalert2';
export default {
    props:["data"],
    mixins: [mixin],
    methods:{
        async deleteAccount(id){
            Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có muốn xóa tài khoản nhân viên?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có',
            }).then( async (result) => {
                if (result.value) {
                    this.handleBeforeCallServer();
                    const idAccount = { id }
                    const url = "http://localhost:3000/admin/delete_employee_account";
                    const data = JSON.stringify(idAccount);
                    //console.log(data);
                    await fetch(url, {
                        method: "delete",
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
                                text: 'Đã xóa tài khoản nhân viên thành công',
                                timer: 1500
                            })
                            return this.$router.push("/dashboard");
                        } else {
                            Swal.fire({
                                title: 'Lỗi!',
                                text: "Không thể xóa tài khoản",
                                icon: 'error',
                            });
                        }
                    });
                }
            })
        },
        EditAccount(id){
            this.$store.dispatch("setAccountEmployeeActive", id);
            return this.$router.push("/admin/edit_account_employee");
        }
    }
}
</script>

<style scoped>
.content{
    padding: 13px;
}

.txtName{
    font-size: 13px;
    color: #000;
    font-weight: 600;
}
.name{
    font-size: 17px;
    font-weight: bold;
    color: #000;
}
.txtInfor{
    font-size: 14px;
}
.txtCoin{
    font-size: 17px;
    padding: 3px 6px;
    color: #000;
    font-weight: bold;
    border-radius: 8px;
}
.col-button{
    display: flex;
    justify-content: center;
    align-items: center;
}

.btnTransfer{
    margin: 0px;
    font-size: 14px;
    font-weight: 600;
    background-color: #0da145;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.btnViewHistory{
    margin: 0px;
    font-size: 14px;
    font-weight: 600;
    background-color: #e23f3f;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.txtAndi{
    opacity: 0;
    visibility: hidden;
}
</style>