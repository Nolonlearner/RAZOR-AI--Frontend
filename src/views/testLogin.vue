<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <div slot="header" class="login-header">
        <span>登录</span>
      </div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        @keyup.enter.native="onSubmit"
        v-loading="isLoading"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            class="login-button"
            :loading="isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
      },

      loginRules: {
        username: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
        ],
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(['error', 'isLoggedIn']), // 获取Vuex中的error和isLoggedIn
  },
  methods: {
    ...mapActions(['login']), // 映射Vuex的login action

    async onSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            // 调用Vuex的login action
            await this.login({
              username: this.loginForm.username,
              password: this.loginForm.password,
            });

            // 判断登录是否成功
            if (this.isLoggedIn) {
              this.$message.success('登录成功！');
              this.$router.replace({ name: 'Home' }); // 跳转到首页
            }
          } catch (errors) {
            console.error('登录错误：', errors);
            this.$message.error('网络错误或登录失败');
          } finally {
            this.isLoading = false;
          }
        } else {
          this.$message.error('请正确填写表单');
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}

.login-card {
  width: 400px;
  padding: 20px;
}

.login-header {
  font-size: 24px;
  text-align: center;
  color: #409eff;
}

.login-button {
  width: 100%;
}
</style>
