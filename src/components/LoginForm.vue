<!-- src/components/LoginForm.vue -->
<template>
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
      <el-button @click="closeDialog">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginForm',
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
    ...mapGetters(['error', 'isLoggedIn', 'user_id']),
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            await this.login({
              username: this.loginForm.username,
              password: this.loginForm.password,
            });

            if (this.isLoggedIn) {
              this.$message.success('登录成功！');
              this.closeDialog();
            } else {
              this.$message.error(this.error);
            }
          } catch (error) {
            this.$message.error('网络错误');
          } finally {
            this.isLoading = false;
          }
        } else {
          this.$message.error('请正确填写表单');
        }
      });
    },
    closeDialog() {
      this.$emit('close'); // 触发关闭事件
      this.resetForm(); // 重置表单
    },
    resetForm() {
      this.loginForm.username = '';
      this.loginForm.password = '';
      this.loginForm.rememberMe = false;
    },
  },
};
</script>

<style scoped>
.login-button {
  margin-right: 10px;
}
</style>
