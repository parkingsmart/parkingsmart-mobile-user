<template>
  <div slot="footer">
    <van-cell-group>
      <van-cell title="我的账号" value="18274870869"/>
      <van-cell title="我的积分" value="20" label="积分满20，购物享8.8折" />
      <van-collapse v-model="activeNames">
        <van-collapse-item title="设置">
          <van-cell-group>
            <van-field
              label="密码"
              @blur="check('password')"
              :error-message="password.err"
              v-model="form.password"
              placeholder="请输入密码"
              type="password"
            />
            <van-field
              label="确认密码"
              @blur="check('comfirmPwd')"
              :error-message="comfirmPwd.err"
              v-model="form.comfirmPwd"
              placeholder="再次确认密码"
              type="password"
            />
            <div class="save">
            <van-button class="passwd" @click="updatePassword">保存</van-button>
            </div>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      username:this.$store.state.userInfo.username,
      integral:this.$store.state.userInfo.integral,
      form: {
        password: "",
        comfirmPwd: ""
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
    }
  }
};
</script>
<style lang='scss' scoped>
.van-panel {
  margin-bottom: 20px;
}
.passwd {
  width: 60vw;
  color: white;
  margin-top: 3vh;
  border-radius: 10vw;
  background: linear-gradient(to right, #0079c1, rgb(18, 150, 219));
}
.save{
  display: flex;
  justify-content: center;
}
</style>