<template>
  <div class="container">
    <IconBox class="icon-box" />
    <div class="main-pane">
      <p class="title">创建帐号</p>
      <van-field v-model="form.phone" placeholder="手机号" />
      <van-field v-model="form.code" placeholder="验证码">
        <CodeBtn slot="button" />
      </van-field>
      <van-field v-model="form.password" placeholder="密码" />

      <van-button class="register">注册</van-button>
      <p class="tips">已有帐号? <a @click="$router.push({name: 'Login'})">点此登录</a></p>
    </div>
  </div>
</template>

<script>
import IconBox from "../components/IconBox";
import CodeBtn from "../components/CodeBtn";

export default {
  components: {
    IconBox,
    CodeBtn
  },
  data() {
    return {
      form: {
        phone: "",
        code: "",
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

.title {
  color: rgb(17, 148, 217);
}

.register {
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
