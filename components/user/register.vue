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
        placeholder="用户名手机"
      ></el-input>
    </el-form-item>
    <el-form-item
      class="form-item"
      prop="captcha"
    >
      <el-input
        v-model="form.captcha"
        placeholder="验证码"
      >
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      class="form-item"
      prop="nickname"
    >
      <el-input
        v-model="form.nickname"
        placeholder="昵　称"
      ></el-input>

    </el-form-item>
    <el-form-item
      class="form-item"
      prop="password"
    >
      <el-input
        v-model="form.password"
        placeholder="密　码"
        type="password"
      ></el-input>

    </el-form-item>
    <el-form-item
      class="form-item"
      prop="checkPassword"
    >
      <el-input
        v-model="form.checkPassword"
        placeholder="确认密码"
        type="password"
      ></el-input>

    </el-form-item>
    <el-button
      type="primary"
      class="submit"
      @click="handleRegSubmit"
    >注 册</el-button>

  </el-form>
</template>
<script>
export default {
  data() {
    // 确认密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };

    return {
      form: {
        // 用户名
        username: "",
        // 验证码
        captcha: "",
        // 昵称
        nickname: "",
        // 密码
        password: "",
        // 确认密码
        checkPassword: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [
          {
            // required: true,
            validator: validatePass,
            // message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSendCaptcha() {
      if (!this.form.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误,请重新输入!", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;
          this.$store.dispatch("user/register", props).then(res => {
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
  padding: 25px;
  .submit {
    width: 100%;
  }
}
</style>
