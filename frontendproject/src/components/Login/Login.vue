<template>
  <div class="fadeInDown my-login">
    <div id="formContent" method="post" novalidate name="formContent" @submit="recaptcha($event)">
      <div class="fadeIn first">
        <label class="my-label">Chào mừng quý khách đến với iUSTechbank</label>
      </div>
      <form>
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="Tài khoản"
          v-model="userName"
        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="password"
          placeholder="Mật khẩu"
          v-model="passWord"
        />
        <div v-if="err != ''" class="my-err-message">{{err}}</div>
        <input type="submit" class="fadeIn fourth" defaultValue="Log In" value="Đăng nhập" />
      </form>
      <div id="formFooter">
        <a class="underlineHover my-login-lin" href="#/retrieve_password">Quên mật khẩu</a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { VueReCaptcha } from "vue-recaptcha-v3";
Vue.use(VueReCaptcha, { siteKey: "6LeQAMwUAAAAALi0MsAeaNput8Yosk2oVNJ1Idd-" });
import myMixin from '../../Mixin'
export default {
  mixins: [myMixin],
  name: "Login",
  data() {
    return {
      userName: "",
      passWord: "",
      err: ""
    };
  },
  methods: {
    async sendData(captcha) {
      console.log("Enter here")
      const info = JSON.stringify({ captcha: captcha });
      await fetch("http://localhost:3000/account/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: info
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log("success");
          } else {
            this.err = data.msg;
            return;
          }
        });

      const body = JSON.stringify({
        username: this.userName,
        password: this.passWord
      });
      await fetch("http://localhost:3000/account/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: body
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === "Success") {
            this.setAuth(data);
             localStorage.internetbanking_refreshtoken = data.refresh_token;
            const retUrl = this.$route.query.retUrl || '/dashboard';
            return this.$router.push(retUrl);
          } else {
            this.err = data.error;
            return;
          }
        });
    },

    async recaptcha(event) {
      const self = this;
      // (optional) Wait until recaptcha has been loaded.
      event.preventDefault();
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha("login");
      self.sendData(token);

      // Do stuff with the received token.
    },
  }
};
</script>

<style scoped>
.my-login {
  position: absolute;
  top: 30%;
  left: 15%;
}

.my-login-link {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
  border: #005030 8px inset;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"],
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover{
  text-decoration: none;
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

.my-err-message{
  color: red;
  font-size: 10px;
  font-family: "Signika", sans-serif;
}
</style>