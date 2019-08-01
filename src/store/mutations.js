export default {
  setOrderDetail(state, data) {
    state.orderDetail = data;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setUserPromotionInfo(state, promotion) {
    state.promotion = promotion;
  },
  setWebSocket(state,webSocket){
    state.webSocket = webSocket;
  },
  setWebSocketData(state,webSocketData){
    state.webSocketData = webSocketData;
  }
};