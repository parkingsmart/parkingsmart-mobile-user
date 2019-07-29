<template>
  <div class="container">
    <IconBox class="icon-box"/>
    <div class="footer-box">
      <van-button class="btn login" type="default">登录</van-button>
      <p class="tips">还没有帐号?</p>
      <van-button class="btn register">注册</van-button>
    </div>
  </div>
</template>

<script>
import IconBox from '../components/IconBox';

export default {
  components: {
    IconBox
  }
};
</script>

<style lang="scss" scoped>
.container {
  .icon-box {
    height: 70vh;
  }

  .footer-box {
    height: 30vh;
    text-align: center;

    .btn {
      width: 60vw;
      color: white;
      border-radius: 10vw;
    }

    .login {
      background: linear-gradient(to right, #0079c1, rgb(18, 150, 219));
    }

    .register {
      background: linear-gradient(
        to right,
        rgb(194, 194, 194),
        rgb(166, 166, 166)
      );
    }

    .tips {
      font-size: 0.5rem;
      margin-top: 0.7rem;
      margin-bottom: 0.3rem;
      color: rgb(194, 194, 194);
    }
  }
}
</style>
