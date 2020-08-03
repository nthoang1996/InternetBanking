<template>
  <div class="formContainer">
    <h2 class="title">Quên Mật Khẩu?</h2>
    <label for="input_data">{{labelContent}}</label>
    <form>
      <div v-if="step === 1">
        <input
          @keyup.enter="handleNextStep"
          v-model="email"
          id="input_data"
          @focus="resetErrorValue"
          type="text"
          placeholder="email"
        />
      </div>
      <div v-else>
        <input
          @keyup.enter="handleNextStep"
          v-model="otp"
          id="input_data"
          type="text"
          placeholder="OTP"
        />
      </div>

      <div v-if="err != ''" class="my-err-message">{{err}}</div>

      <div class="d-flex justify-content-end mt-4 groupBtn">
        <b-button variant="primary" @click="handleNextStep" class="mr-2 myBtn">
          <i class="fa fa-arrow-circle-right fa-lg mr-2"></i>&nbsp;Tiếp tục
        </b-button>
        <b-button variant="danger" @click="back" class="myBtn">
          <i class="fa fa-times mr-2 fa-lg"></i>&nbsp;Bỏ qua
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import myMixin from "../../Mixin";
export default {
  mixins: [myMixin],
  data() {
    return {
      err: "",
      labelContent: "Vui lòng cung cấp email để lấy lại mật khẩu.",
      otp: "",
      email: "",
      step: 1,
    };
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
      if (this.step === 1) {
        if (this.email === "") {
          this.err = "Vui lòng nhập địa chỉ email.";
          return;
        }

        // Kiểm tra xem email có tồn tại trong database không?
        const url1 = "http://localhost:3000/account/check_email";
        const formdata = {
          email: this.email,
        };
        fetch(url1, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.success) {
              console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
              alert(json.error);
              return;
            }
          });

        // Gửi mã OTP
        const url = "http://localhost:3000/account/send_otp";
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
              alert("Đã có lỗi xảy ra, vui lòng thử lại sau ít phút!");
              return;
            }
          });

        this.step = 2;
        this.labelContent = "Vui lòng kiểm tra mã trong email của bạn.";
        return;
      } else {
        // So khớp OTP
        const url = "http://localhost:3000/account/confirm_otp";
        const inputData = {
          otp: this.otp,
          email: this.email,
        };
        console.log(inputData);
        fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.success) {
              alert(json.error);
            } else {
              this.$store.dispatch("updateEmailRetrievePassword", this.email);
              this.$emit('verified');
              return this.$router.push("/retrieve_password/create_newPassword")
            }
          });
        // this.step = 1;
        // this.labelContent = "Vui lòng cung cấp email để lấy lại mật khẩu.";
      }
    },
  },
};
</script>

<style scoped>
h2.title {
  margin-top: 1rem;
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

.my-label {
  color: #3aace7;
  font-size: 20px;
  font-family: "Signika", sans-serif;
  padding-top: 10px;
  max-width: 60%;
}

.my-err-message {
  position: absolute;
  left: 25%;
  bottom: 28%;
  color: red;
  font-size: 14px;
  font-family: "Signika", sans-serif;
}
</style>