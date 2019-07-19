
// 保存本地信息
export const state = () => {
  return {
    userInfo: {
      token: "",
      user: {}
    },
    // registerInfo: {
    //   token: "",
    //   user: {}
    // }
  }
}

// 设置用户信息

export const mutations = {

  //  设置用户信息  
  setUserInfo(state, data) {
    state.userInfo = data;
  },

  // 设置用户数据为空，退出功能
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    }
  },

  // setRegisterInfo(state, data) {
  //   console.log(data);
  //   state.registerInfo = data
  // }
}

//  异步修改仓库
export const actions = {

  // 处理登录的方法, actions的第一个参数store对象， 第二个参数是传入的参数
  login(store, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      console.log(res);
      store.commit("setUserInfo", res.data);
    });
  },
  register(store, props) {
    return this.$axios({
      url: "/accounts/register",
      method: "POST",
      data: props
    }).then(res => {
      console.log(res);
      store.commit("setUserInfo", res.data);
    });
  }
}

