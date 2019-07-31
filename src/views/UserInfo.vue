<template>
  <div slot="footer">
    <van-cell-group>
      <van-cell title="我的账号" v-model="username" />
      <van-cell title="我的积分" v-model="integral" label="积分满20，购物享8.8折" />
      <van-collapse v-model="activeNames">
        <van-collapse-item title="修改密码">
          <van-cell-group>
            <van-field
              label="旧密码"
              @blur="check('oldPassword')"
              :error-message="oldPassword.err"
              v-model="form.oldPassword"
              placeholder="请输入旧密码"
              type="password"
            />
            <van-field
              label="新密码"
              @blur="check('password')"
              :error-message="password.err"
              v-model="form.password"
              placeholder="请输入新密码"
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

        <van-collapse-item title="设置支付密码">
          <van-cell-group>
            <van-field
              label="支付密码"
              @blur="check('payPassword')"
              :error-message="payPassword.err"
              v-model="form.payPassword"
              placeholder="请输入6位数支付密码"
              type="payPassword"
            />
            <van-field
              label="确认密码"
              @blur="check('comfirmPayPwd')"
              :error-message="comfirmPayPwd.err"
              v-model="form.comfirmPayPwd"
              placeholder="请确认密码"
              type="comfirmPayPwd"
            />
            <div class="save">
              <van-button class="passwd" @click="addPayPassword">保存</van-button>
            </div>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </div>
</template>

<script>
import UserApi from "../apis/user";
import RequestHandler from "../utils/requestHandler";
export default {
  data() {
    return {
      activeNames: ["1"],
      form: {
        password: "",
        comfirmPwd: "",
        oldPassword: "",
        payPassword: "",
        comfirmPayPwd: ""
      },
      oldPassword: {
        err: "",
        text: "请输入旧密码"
      },
      password: {
        err: "",
        text: "请输入新密码"
      },
      comfirmPwd: {
        err: "",
        text: "请再次确认密码"
      },
      payPassword: {
        err: "",
        text: "请输入6位数密码"
      },
      comfirmPayPwd: {
        err: "",
        text: "请再次确认密码"
      }
    };
  },
  computed: {
    username() {
      return this.$store.state.userInfo === null
        ? "Welcome"
        : this.$store.state.userInfo.phone;
    },
    integral() {
      return this.$store.state.userInfo === null
        ? "Welcome"
        : this.$store.state.userInfo.integral;
    }
  },
  methods: {
    check(item) {
      if (typeof this[item].valid === "function") {
        this[item].err = this[item].valid(this.form[item]);
      } else {
        this[item].err = this.form[item].trim() === "" ? this[item].text : "";
      }
    },
    async addPayPassword() {
      await UserApi.addPayPassword(this.$store.getters.id, {
        payPassword: this.form.payPassword
      });
    },

    async updatePassword() {
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
        const res = await RequestHandler.invoke(
          UserApi.updatePassword(this.$store.getters.id, {
            oldPassword: this.form.oldPassword,
            password: this.form.password
          })
        )
          .msg("修改成功")
          .exec();
        this.$store.commit("setUserInfo", res);
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
.save {
  display: flex;
  justify-content: center;
}
</style>