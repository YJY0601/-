<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    class="form"
  >
    <el-form-item
      class="form-item"
      prop="username"
    >
      <el-input
        v-model="form.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item
      class="form-item"
      prop="password"
    >
      <el-input
        v-model="form.password"
        placeholder="请输入密码"
        type="password"
      ></el-input>

    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button
      type="primary"
      class="submit"
      @click="handleLoginSubmit"
    >登 录</el-button>

  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login", this.form).then(res => {
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 0 30px;

  .form-item {
    margin-top: 20px;
  }
  .form-text {
    font-size: 12px;
    color: #409eff;
    text-align: right;
    line-height: 1;
    &:hover {
      text-decoration: underline;
    }
  }
  .submit {
    width: 100%;
    margin: 20px 0;
  }
}
</style>
