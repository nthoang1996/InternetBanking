<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100%">
    <b-form @submit.prevent="doChangePassword" @reset="onReset" v-if="show" class="changePassword_form">
      <h2>{{getCurrentPage}}</h2>

      <b-form-group id="password" label="Mật khẩu cũ:" label-for="input-1">
        <b-form-input
          type="password"
          id="input-1"
          v-model="form.password"
          required
          placeholder="Nhập mật khẩu cũ"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="new_password" label="Mật khẩu mới:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.new_password"
          required
          placeholder="Mật khẩu từ 6 đến 32 ký tự."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="confirm_password" label="Nhập lại:" label-for="input-3">
        <b-form-input
          type="password"
          id="input-3"
          v-model="form.confirm_password"
          required
          placeholder="Nhập lại mật khẩu mới."
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" align-self="end" class="btn-submit">Thay đổi</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "../../Mixin"
export default {
  mixins: [mixin],
  computed: {
    ...mapGetters([
      "getCurrentPage",
      "getUserVisible",
    ])
  },
  mounted() {
    this.$store.dispatch("setCurrentPage", this.$route.path);
  },
  data() {
    return {
      form: {
        password: "",
        new_password: "",
        confirm_password: ""
      },
      error:'',
      show: true
    };
  },
  methods: {
    async doChangePassword() {
      console.log("enter here");
      const self = this;
      this.handleBeforeCallServer();
      const url = 'http://localhost:3000/general/change_password'
      const info = JSON.stringify({
        new_password: self.form.new_password,
        old_password: self.form.password
      })
      console.log(info);
      if(self.form.new_password !== self.form.confirm_password){
        alert("Xac thuc ko khop.");
      }
      await fetch(url,{
        method: 'post',
        headers:{
          "Content-Type": "application/json",
          'x-access-token': localStorage.internetbanking_accesstoken
        },
        body: info
      }).then(res => res.json())
      .then(data =>{
         if (data.success) {
            console.log("success");
            alert('success');
          } else {
            self.error = data.error;
            alert(self.error);
            return;
          }
      });
    },

    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
.changePassword_form {
  width: 300px;
  height: 450px;
}

.changePassword_form > h2{
  text-align: center;
  margin-bottom: 1.5rem;
}

.btn-submit{
  padding-left: 20px;
  padding-right: 20px;
}
</style>