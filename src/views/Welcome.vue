<template>
  <div class="container">
    <div class="icon-box">
      <div>
        <img class="icon" src="../assets/icon.png" />
        <p class="title">Parking Smart</p>
        <p class="desc">轻松停车每一天</p>
      </div>
    </div>
    <div class="footer-box">
      <van-button class="btn login" type="default">登录</van-button>
      <p class="tips">还没有帐号?</p>
      <van-button class="btn resign">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  .icon-box {
    height: 70vh;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 22vw;
    }

    .title {
      font-size: 1rem;
      color: #6d6e70;
      margin-bottom: 0.4rem;
    }

    .desc {
      margin: 0;
      color: #9f9fa3;
      font-size: 0.4rem;
    }
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

    .resign {
      background: linear-gradient(to right, rgb(194, 194, 194), rgb(166, 166, 166));
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
