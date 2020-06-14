<template>
    <div>
        <b-container>
            <b-row>
                <b-col></b-col>
                <b-col cols="6">
                    <p class="txtTitle mt-3 mb-3">TẠO TÀI KHOẢN</p>
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group class="title" label="Họ tên khách hàng:" label-for="txtname" >
                            <b-form-input id="txtname" v-model="form.name" type="text" required></b-form-input>
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

                        <b-form-group class="title" id="input-group-1" label="Email address:" label-for="input-1" >
                            <b-form-input id="input-1" v-model="form.email" type="email" required></b-form-input>
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
            email: ''
        },
        show: true
      }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
  }
</script>


<style scoped>
.txtTitle{
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
.title{
    font-weight:600;
}
.divButton{
    display: flex;
    justify-content: center;
}
</style>