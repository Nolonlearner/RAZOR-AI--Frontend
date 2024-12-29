<template>
  <el-form
    :model="registerForm"
    :rules="registerRules"
    ref="registerForm"
    @keyup.enter.native="onSubmit"
    v-loading="isLoading"
  >
    <el-form-item label="用户名" prop="user_name">
      <el-input
        v-model="registerForm.user_name"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="user_password">
      <el-input
        v-model="registerForm.user_password"
        type="password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="isLoading"
        >注册</el-button
      >
      <el-button @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        user_name: '',
        user_password: '',
      },
      registerRules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        user_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      isLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true; // 开始加载状态
          try {
            // 调用Vuex中user模块的register方法
            const result = await this.register({
              user_name: this.registerForm.user_name,
              user_password: this.registerForm.user_password,
            });
            if (result.success) {
              this.$message.success(result.message); // 提示注册成功
              console.log('register result:', result);
              this.resetForm(); // 重置表单
              // 自动登陆，并且跳转到首页

              this.$router.push({ path: '/' });
            } else {
              this.$message.error(
                result.message || '登录注册，请检查用户名和密码格式'
              ); // 提示登录失败
            }
          } catch (error) {
            console.error(error); // 打印错误信息
            this.$message.error(error.message || '注册失败，请重试');
          } finally {
            this.isLoading = false; // 结束加载状态
          }
        } else {
          this.$message.error('请正确填写表单');
        }
      });
    },
    resetForm() {
      this.registerForm.user_name = '';
      this.registerForm.user_password = '';
    },
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
  },
};
</script>

<style scoped>
/* 添加一些样式 (可选) */
</style>
