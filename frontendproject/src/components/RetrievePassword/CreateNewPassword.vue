<template>
  <div class="formContainer">
    <h2 class="title">Tạo mật khẩu mới</h2>
    <form>
      <div v-if="step === 3">
        <input
          @keyup.enter="handleNextStep"
          v-model="password"
          @focus="resetErrorValue"
          type="password"
          placeholder="Nhập mật khẩu mới."
          class="input-password fix"
        />
        <input
          @keyup.enter="handleNextStep"
          v-model="confirm_password"
          @focus="resetErrorValue"
          type="password"
          placeholder="Xác nhận mật khẩu."
          class="fix confirm_pw"
        />
      </div>
      <div v-else class="done">
        <i class="fa fa-check-circle fa-3x mr-3"></i>
        <label for>Mật khẩu đã được thay đổi.</label>
      </div>
    </form>

    <div v-if="err != ''" class="my-err-message">{{err}}</div>

    <div class="d-flex justify-content-end mt-4 groupBtn">
      <div v-if="step === 3">
        <b-button variant="primary" @click="handleNextStep" class="mr-2 myBtn">
          <i class="fa fa-arrow-circle-right fa-lg mr-2"></i>&nbsp;Tiếp tục
        </b-button>
        <b-button variant="danger" @click="back" class="myBtn">
          <i class="fa fa-times mr-2 fa-lg"></i>&nbsp;Bỏ qua
        </b-button>
      </div>
      <div v-else>
        <b-button variant="success" @click="back" class="mr-2 myBtn_1">
          <i class="fa fa-thumbs-up fa-lg mr-2"></i>&nbsp;Hoàn tất
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import myMixin from "../../Mixin";
import { mapGetters } from "vuex";
export default {
  mixins: [myMixin],
  data() {
    return {
      err: "",
      password: "",
      confirm_password: "",
      step: 3,
    };
  },
  computed: {
    ...mapGetters(["getEmailRetrievePassword"]),
  },
  methods: {
    resetErrorValue(event) {
      console.log("event:", event.target.value);
      this.err = "";
    },
    back() {
      return this.$router.push("/");
    },
    handleNextStep() {
      if (this.step === 3) {
        if (this.password === "" || this.confirm_password === "") {
          this.err = "Nội dung nhập không hợp lệ, vui lòng kiểm tra lại.";
          return;
        } else if (this.password !== this.confirm_password) {
          this.err = "Xác nhận mật khẩu không trùng khớp.";
          return;
        }

        // Tạo mật khẩu mới.
        console.log(`getEmailRetrievePassword`, this.getEmailRetrievePassword);
        const url = "http://localhost:3000/account/create_new_password";
        const formdata = {
          password: this.password,
          email: this.getEmailRetrievePassword,
        };
        fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.success) {
              this.err = json.error;
              //alert(json.error);
              return;
            }
            // Mật khẩu đã được tạo thành công
            this.step = 4;
          });
      } else {
        return this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
h2.title {
  margin-top: 14px;
  margin-bottom: 7px;
  padding: 5px;
}
.formContainer {
  position: absolute;
  top: 20%;
  left: 20%;
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  min-width: 400px;
  max-width: 450px;
  min-height: 300px;
  /* position: relative; */
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
  border: #005030 8px inset;
  font-family: Arial, Helvetica, sans-serif;
}

.groupBtn {
  position: absolute;
  bottom: 10%;
  right: 8%;
}

.myBtn {
  width: 140px;
  height: 40px;
  padding: 4px 8px;
  font-size: 16px;
}

.myBtn_1{
  margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
  margin: 20px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  background-color: #ccc;
}

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
}

.my-err-message {
  position: absolute;
  left: 15%;
  bottom: 26%;
  color: red;
  font-size: 14px;
  font-family: "Signika", sans-serif;
}

.input-password {
  margin: 0 !important;
}

.fix {
  padding: 12px 32px !important;
}

.confirm_pw {
  margin: 15px 20px !important;
}

.done {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 80px;
  background-color: rgba(204, 204, 204, 0.7);
  margin: 20px auto;
  border: 2px solid rgba(13, 197, 6, 0.795);
  color: rgba(13, 197, 6, 0.795);
  font-family: "Signika", sans-serif;
  margin-top: 30px;
}
</style>