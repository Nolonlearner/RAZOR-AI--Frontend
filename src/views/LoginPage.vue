<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <div slot="header" class="login-header">
        <span>登录</span>
      </div>
      <el-form
        :model="loginForm"
        ref="loginForm"
        @submit.native.prevent="onSubmit"
      >
        <el-form-item
          prop="username"
          :rules="[
            {
              required: true,
              message: 'Please input your username',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="loginForm.username"
            placeholder="Username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[
            {
              required: true,
              message: 'Please input your password',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">Remember me</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="loading"
            class="login-button"
            >Login</el-button
          >
          <button class="btn">test</button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
      },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // Simulate a login process
          setTimeout(() => {
            this.loading = false;
            this.$message.success('Login successful');
            // Redirect or perform further actions here
          }, 1500);
        } else {
          this.$message.error('Please complete the form correctly');
          return false;
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
