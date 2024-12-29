<!-- src/components/LoginForm.vue -->
<template>
  <el-form
    :model="loginForm"
    :rules="loginRules"
    ref="loginForm"
    @keyup.enter.native="onSubmit"
    v-loading="isLoading"
  >
    <el-form-item label="用户ID" prop="userid">
      <el-input
        v-model="loginForm.userid"
        placeholder="用户ID"
        prefix-icon="el-icon-user"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
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
        userid: '',
        password: '',
        rememberMe: false,
      },
      loginRules: {
        userid: [
          { required: true, message: '请输入您的用户ID', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
        ],
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'user_id']), // 指定 user 命名空间
  },
  methods: {
    ...mapActions('user', ['login']), // 映射 user 模块中的 login 方法
    async onSubmit() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true; // 开始加载状态
          try {
            // 调用Vuex中user模块的login方法
            const result = await this.login({
              user_id: this.loginForm.userid,
              user_password: this.loginForm.password,
            });
            console.log('isLoggedIn in LoginForm:', this.isLoggedIn);
            if (result.success) {
              this.$message.success(result.message || '登录成功！'); // 提示登录成功
              this.closeDialog(); // 关闭对话框
            } else {
              this.$message.error(
                result.message || '登录失败，请检查用户名和密码'
              ); // 提示登录失败
            }
          } catch (error) {
            console.error(error); // 打印错误信息
            this.$message.error(error.message || '登录失败，打开控制台检查');
          } finally {
            // 无论成功或失败都会执行
            this.isLoading = false; // 结束加载状态
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
      this.loginForm.userid = '';
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
