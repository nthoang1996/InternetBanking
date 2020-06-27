<template>
    <div>
        <b-container>
            <b-row>
                <b-col></b-col>
                <b-col cols="6">
                    <p class="txtTitle">TẠO TÀI KHOẢN KHÁCH HÀNG</p>
                    <b-form @submit="onSubmit" v-if="show">
                        <b-form-group class="title" label="Họ tên khách hàng:" label-for="txtname" >
                            <b-form-input id="txtname" v-model="form.name" type="text" required></b-form-input>
                        </b-form-group>

                         <b-form-group class="title" label="Số điện thoại:" label-for="txtphone" >
                            <b-form-input id="txtphone" v-model="form.phone" type="text" required></b-form-input>
                        </b-form-group>

                         <b-form-group class="title" label="Địa chỉ:" label-for="txtaddress" >
                            <b-form-input id="txtaddress" v-model="form.address" type="text" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="title" label="Tên tài khoản:" label-for="txtaccount" >
                            <b-form-input id="txtaccount" v-model="form.account" type="text" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="title" label="Mật khẩu:" label-for="txtpassword" >
                            <b-form-input id="txtpassword" v-model="form.password" type="password" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="title" label="Nhập lại mật khẩu:" label-for="txtrepeatpassword" >
                            <b-form-input id="txtrepeatpassword" v-model="form.repeatpassword" type="password" required></b-form-input>
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
  export default {
    data() {
      return {
        form: {
            name: '',
            account: '',
            password: '',
            repeatpassword: '',
            email: '',
            address: '',
            phone: '',
        },
        show: true
      }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
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