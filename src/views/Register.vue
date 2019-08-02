<template>
  <div class="container">
    <IconBox class="icon-box" />
    <div class="main-pane">
      <van-field
        @blur="check('phone')"
        :error-message="phone.err"
        v-model="form.phone"
        placeholder="手机号"
        error-message-align="left"
      />
      <van-field
        @blur="check('password')"
        :error-message="password.err"
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
      <van-field
        @blur="check('comfirmPwd')"
        :error-message="comfirmPwd.err"
        v-model="form.comfirmPwd"
        placeholder="再次确认密码"
        type="password"
      />
      <van-button class="register" @click="register">注册</van-button>
      <p class="tips">
        已有帐号?
        <a @click="$router.push({name: 'Login'})">点此登录</a>
      </p>
    </div>
  </div>
</template>

<script>
import UserApi from "../apis/user";
import IconBox from "../components/IconBox";
import RequestHandler from "../utils/requestHandler";

export default {
  components: {
    IconBox
  },
  data() {
    return {
      form: {
        phone: "",
        password: "",
        comfirmPwd: ""
      },
      phone: {
        err: "",
        text: "请输入手机号",
        valid: value => {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          return value.trim() === ""
            ? "请输入手机号"
            : !reg.test(value)
              ? "请输入正确的手机号"
              : "";
        }
      },
      password: {
        err: "",
        text: "请输入密码"
      },
      comfirmPwd: {
        err: "",
        text: "请再次确认密码"
      }
    };
  },
  methods: {
    check(item) {
      if (typeof this[item].valid === "function") {
        this[item].err = this[item].valid(this.form[item]);
      } else {
        this[item].err = this.form[item].trim() === "" ? this[item].text : "";
      }
    },
    async register() {
      let vaild = true;
      for (const key in this.form) {
        this.check(key);
        if (this[key].err !== "") {
          vaild = false;
        }
      }
      if (vaild) {
        if (this.form.password !== this.form.comfirmPwd) {
          this.$toast("密码确认失败，请重新输入");
          this.form.comfirmPwd = "";
          return;
        }
        const res = await RequestHandler.invoke(UserApi.register(this.form))
          .exec();
        this.$store.commit("setUserInfo", res);
        this.$router.push({ name: "Order" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-box {
  height: 45vh;
}

.main-pane {
  height: 55vh;
  text-align: center;

  /deep/ .van-cell {
    width: 80%;
    margin: 0 auto;
    padding-right: 0;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(18, 150, 219);
  }

  /deep/ .van-button {
    color: white;
    border-radius: 10vw;
    border-color: rgb(18, 150, 219);
    background-color: rgb(18, 150, 219);
  }
}

.register {
  width: 60vw;
  color: white;
  margin-top: 10vh;
  border-radius: 10vw;
  background: linear-gradient(to right, #0079c1, rgb(18, 150, 219));
}

.tips {
  font-size: 15px;
  color: #828282;
}
</style>
