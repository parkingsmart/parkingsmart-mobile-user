
export default {
  id: (state) => {
    return state.userInfo ? state.userInfo.id : "";
  },
  coupons: (state) => {
    let coupones = [];
    let disableTime = new Date().getTime() / 1000 + 60 * 60 * 24 * 14;
    if (state.promotion !== null) {
      state.promotion.forEach(element => {
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
        if (element.endTime < disableTime) {
          coupones.push(coupon);
        }
      });
      return coupones;
    }
  },
  disabledCoupons: (state) => {

    let coupones = [];
    let disableTime = new Date().getTime() / 1000 + 60 * 60 * 24 * 14;
    if (state.promotion !== null) {
      state.promotion.forEach(element => {
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
        if (element.endTime >= disableTime) {
          coupones.push(coupon);
        }
      });
      return coupones;
    }
  }
};