<template>
  <div slot="footer">
    <van-cell-group>
      <van-cell title="我的账号" v-model="username" />
      <van-cell title="我的积分" v-model="integral" label="积分满20，购物享8.8折" />
      <van-coupon-cell title="优惠活动" @click="showList = true" />
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :enabled-title="promotionTitle"
          :disabled-title="disableTitle"
          :close-button-text="bottomTitle"
          :show-exchange-bar="false"
          :coupons="promotion"
          :chosen-coupon="chosenCoupon"
          :show-close-button="false"
          @change="onChange"
        />
      </van-popup>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="设置">
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
      </van-collapse>
    </van-cell-group>
  </div>
</template>

<script>
import UserApi from "../apis/user";
import RequestHandler from "../utils/requestHandler";
// const coupon1 = {
//   condition: "无使用门槛",
//   name: "华发商都",
//   value: 150,
//   startAt: 1489104000,
//   endAt: 1514592000,
//   valueDesc: "1.5",
//   unitDesc: "元",
//   description: "温馨提示:请在有效期内尽快使用哦"
// };
export default {
  data() {
    return {
      promotionTitle: "可兑换优惠",
      bottomTitle: "不兑换优惠",
      disableTitle: "不可兑换优惠",
      chosenCoupon: -1,
      showList: false,
      activeNames: ["1"],
      form: {
        password: "",
        comfirmPwd: "",
        oldPassword: ""
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
    },
    promotion() {
      if (this.$store.state.promotion === null) {
        return [];
      } else {
        let coupons = [];
        console.log(this.$store.state.promotion);
        this.$store.state.promotion.forEach(element => {
          let coupon = {
            condition: "",
            name: "",
            startAt: 0,
            endAt: 0,
            valueDesc: "",
            unitDesc: "",
            description: "温馨提示:请在有效期内尽快使用哦"
          };
          coupon.condition = element.title;
          coupon.name = element.shop_mall_name;
          coupon.startAt = element.startTime;
          coupon.endAt = element.endTime;
          coupon.valueDesc = element.amount;
          element.type === 0
            ? (coupon.unitDesc = "元")
            : (coupon.unitDesc = "折");
          coupons.push(coupon);
        });
        return coupons;
      }
    }
  },

  methods: {
    onChange(index) {
      this.$dialog
        .confirm({ title: "您好", message: "确认要兑换此优惠吗?" })
        .then(() => {
          this.showList = false;
          this.chosenCoupon = index;
        })
        .catch(() => {});
    },
    check(item) {
      if (typeof this[item].valid === "function") {
        this[item].err = this[item].valid(this.form[item]);
      } else {
        this[item].err = this.form[item].trim() === "" ? this[item].text : "";
      }
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