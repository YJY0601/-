<template>
  <div class="container">
    <el-row
      type="flex"
      justify="space-between"
      class="main"
    >

      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img
            src="http://157.122.54.189:9093/images/logo.jpg"
            alt=""
          >
        </nuxt-link>
      </div>

      <!-- 菜单 -->
      <!-- 当前的路径如果匹配上链接的to属性的值，会默认加上这个class：nuxt-link-exact-active -->
      <el-row
        type="flex"
        class="navs"
      >
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 右侧的登录注册 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-bell el-icon--left"></i>
          消息
          <i class="
el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            消息
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>
        <div
          class="login"
          v-if="!$store.state.user.userInfo.token"
        >
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img
                :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar"
                alt=""
              >
              {{$store.state.user.userInfo.user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click.native="handeLogout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handeLogout() {
      this.$store.commit("user/clearUserInfo");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  box-shadow: 0 2px 2px #ddd;
}
.main {
  width: 1000px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
}

.logo {
  margin-right: 20px;
  img {
    width: 156px;
    height: 42px;
    margin-top: 9px;
  }
}

.navs {
  flex: 1;

  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;

    &:hover {
      color: #409eff;
      border-bottom: 5px #409eff solid;
    }
  }

  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.el-dropdown-link {
  img {
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
}

.login {
  margin-left: 10px;
  color: #666;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
    color: #409eff;
  }
}
</style>
