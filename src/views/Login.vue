<template>
  <div class="container">
    <IconBox class="icon-box" />
    <div class="main-pane">
      <van-field @blur="check('phone')" :error-message="phone.err" v-model="form.phone" placeholder="手机号" />
      <van-field @blur="check('password')" :error-message="password.err" v-model="form.password" placeholder="密码" type="password"/>

      <van-button class="login" @click="login">登录</van-button>
      <p class="tips">没有帐号? <a @click="$router.push({name: 'Register'})">点此注册</a></p>
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
        password: ""
      },
      phone: {
        err: "",
        text: "请输入手机号",
        valid: (value) => {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          return value.trim() === "" ? "请输入手机号" : !reg.test(value) ? "请输入正确的手机号" : "";
        }
      },
      password: {
        err: "",
        text: "请输入密码"
      }
    };
  },
  methods: {
    check(item) {
      if (typeof(this[item].valid) === 'function') {
        this[item].err = this[item].valid(this.form[item]);
      } else {
        this[item].err = this.form[item].trim() === "" ? this[item].text : "";
      }
    },
    async login() {
      let vaild = true;
      for(const key in this.form) {
        this.check(key);
        if (this[key].err !== "") {
          vaild = false;
        }
      }
      if (vaild) {
        await this.$store.dispatch("login", {
          username: this.form.phone,
          password: this.form.password
        });
        this.$router.push({name: "Order"});
        const promotion = await RequestHandler.invoke(UserApi.getUserPromotion(this.$store.state.userInfo.id)).exec();
        this.$store.commit("setUserPromotionInfo", promotion);
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

.login {
  width: 60vw;
  color: white;
  margin-top: 10vh;
  border-radius: 10vw;
  background: linear-gradient(to right, #0079c1, rgb(18, 150, 219));
}

.tips {
  font-size: 0.5rem;
  color: rgb(194, 194, 194);
}
</style>
