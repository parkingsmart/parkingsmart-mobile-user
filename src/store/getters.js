
export default {
  id: (state) => {
    return state.userInfo ? state.userInfo.id : "";
  }
};