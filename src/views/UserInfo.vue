<template>
  <div slot="footer">
    <van-cell-group>
      <van-cell title="我的账号" v-model="username" />
      <van-collapse v-model="promotionAcNames"></van-collapse>
      <van-coupon-cell value="可用优惠" title="我的优惠" @click="showList = true" arrow-direction="down" />
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :enabled-title="promotionTitle"
          :disabled-title="disableTitle"
          :show-exchange-bar="false"
          :coupons="promotion"
          :chosen-coupon="chosenCoupon"
          :show-close-button="false"
          @change="onChange"
        />
      </van-popup>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="我的积分" :label="integral" value="兑换优惠" clickable>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-dropdown-menu>
                <van-dropdown-item v-model="value" :options="shopNameOption" />
              </van-dropdown-menu>
              <van-cell title="10元抵扣卷无门槛使用" clickable @click="radio = '1'">
                <van-radio slot="right-icon" name="1" />
              </van-cell>
              <van-cell title="8.8折扣卷无门槛使用" clickable @click="radio = '2'">
                <van-radio slot="right-icon" name="2" />
              </van-cell>
              <div class="save">
                <van-button class="passwd" @click="addPromotion()">兑换</van-button>
              </div>
            </van-cell-group>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse>
      <van-coupon-cell value="可用优惠" title="我的优惠" @click="showPromotion()" arrow-direction="down" />
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :enabled-title="promotionTitle"
          :disabled-title="disableTitle"
          :show-exchange-bar="false"
          :coupons="promotion"
          :chosen-coupon="chosenCoupon"
          :show-close-button="true"
          @change="onChange"
        />
      </van-popup>
      <van-collapse v-model="passActiveNames">
        <van-collapse-item title="修改密码" name="changePwd">
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

        <van-collapse-item title="设置支付密码" name="setPayPwd">
          <van-cell-group>
            <van-field
              label="支付密码"
              @blur="check('payPassword')"
              :error-message="payPassword.err"
              v-model="form1.payPassword"
              placeholder="请输入6位数支付密码"
              type="password"
            />
            <van-field
              label="确认密码"
              @blur="check('comfirmPayPwd')"
              :error-message="comfirmPayPwd.err"
              v-model="form1.comfirmPayPwd"
              placeholder="请确认密码"
              type="password"
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
      promotionTitle: "可使用优惠卷",
      disableTitle: "不可使用优惠卷",
      chosenCoupon: -1,
      showList: false,
      radio: "1",
      value: 0,
      shopNameOption: [
        { text: "华发商都", value: 0 },
        { text: "扬明广场", value: 1 }
      ],
      activeNames: this.$route.params.setPayPwd,
      promotionAcNames: ["1"],
      form: {
        password: "",
        comfirmPwd: "",
        oldPassword: ""
      },
      form1: {
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
    },
    promotion() {
      if (this.$store.state.promotion === null) {
        return [];
      } else {
        let coupons = [];
        this.$store.state.promotion.forEach(element => {
          let coupon = {
            condition: "",
            name: "",
            startAt: 0,
            endAt: 0,
            valueDesc: "",
            unitDesc: "",
            description: ""
          };
          coupon.condition = element.title;
          coupon.name = element.shopMallName;
          coupon.startAt = element.startTime;
          coupon.endAt = element.endTime;
          coupon.valueDesc = element.amount;
          element.type === 0
            ? (coupon.unitDesc = "元")
            : (coupon.unitDesc = "折");
          coupon.description = `兑换码:${element.redemptionCode}`;
          coupons.push(coupon);
        });
        return coupons;
      }
    }
  },
  async created() {
    const res = await RequestHandler.invoke(
      UserApi.getUserInfo(this.$store.getters.id)
    ).exec();
    this.$store.commit("setUserInfo", res);
    const promotion = await RequestHandler.invoke(
      UserApi.getUserPromotion(res.id)
    ).exec();
    this.$store.commit("setUserPromotionInfo", promotion);
  },
  methods: {
    async onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    async showPromotion() {
      this.showList = true;
      const promotion = await RequestHandler.invoke(
        UserApi.getUserPromotion(this.$store.getters.id)
      ).exec();
      this.$store.commit("setUserPromotionInfo", promotion);
    },
    addPromotion() {
      this.$dialog
        .confirm({
          title: "您好",
          message: "确认兑换该优惠吗?"
        })
        .then(async () => {
          await RequestHandler.invoke(
            UserApi.addPromotion(
              this.$store.getters.id,
              this.radio - 1,
              this.shopNameOption[this.radio - 1].text,
              this.radio - 1 === 0 ? 10 : 8.8
            )
          ).exec();
          await RequestHandler.invoke(
            UserApi.getUserPromotion(this.$store.getters.id)
          ).exec();
        })
        .catch(() => {
          this.$toast("添加失败");
        });
    },
    check(item) {
      if (typeof this[item].valid === "function") {
        this[item].err = this[item].valid(this.form[item]);
      } else {
        this[item].err = this.form[item].trim() === "" ? this[item].text : "";
      }
    },

    async addPayPassword() {
      if (this.form1.payPassword !== this.form1.comfirmPayPwd) {
        this.$toast("密码确认失败，请重新输入");
        this.form1.comfirmPayPwd = "";
        return;
      }
      await RequestHandler.invoke(
        UserApi.addPayPassword(this.$store.getters.id, this.form1.payPassword)
      )
        .msg("添加成功", "添加失败")
        .exec();
      this.form1.payPassword = "";
      this.form1.comfirmPayPwd = "";
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
          .msg("修改成功", "修改失败")
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

[class*="van-hairline"]::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: none;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
</style>