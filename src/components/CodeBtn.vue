<template>
  <van-button size="small" :disabled="!codeBtnShow" @click="getPhoneCode">{{codeBtnText}}</van-button>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      codeBtnShow: true,
      codeBtnText: "获取验证码",
      timeCount: 60
    };
  },
  methods: {
    getPhoneCode() {
      const TIME_COUNT = this.timeCount;
      if (!this.timer) {
        this.codeBtnShow = false;
        this.codeBtnText = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.codeBtnText > 0 && this.codeBtnText <= TIME_COUNT) {
            this.codeBtnText--;
          } else {
            this.codeBtnShow = true;
            this.codeBtnText = "获取验证码";
            this.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style>
</style>
