<template>
  <div class="container">
    <IconBox class="icon-box" />
    <div class="main-pane">
      <van-field v-model="form.phone" placeholder="手机号" />
      <van-field v-model="form.password" placeholder="密码" />

      <van-button class="login">登录</van-button>
      <p class="tips">没有帐号? <a @click="$router.push({name: 'Register'})">点此注册</a></p>
    </div>
  </div>
</template>

<script>
import IconBox from "../components/IconBox";

export default {
  components: {
    IconBox
  },
  data() {
    return {
      form: {
        phone: "",
        password: ""
      }
    };
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
