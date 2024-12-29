<template>
  <el-form
    :model="registerForm"
    :rules="registerRules"
    ref="registerForm"
    @keyup.enter.native="onSubmit"
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
      <el-button type="primary" @click="onSubmit">注册</el-button>
      <el-button @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';
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
    };
  },
  methods: {
    ...mapActions('user', ['register']), // 映射 user 模块中的 register 方法
    async onSubmit() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          try {
            // 调用Vuex中user模块的register方法
            const result = await this.register({
              user_name: this.registerForm.user_name,
              user_password: this.registerForm.user_password,
            });
            console.log('register result:', result);
            if (result.success) {
              this.$message.success(result.message); // 提示注册成功
              await this.showInfoformRegister(result);
              this.$router.push({ name: 'Home' });
            } else {
              this.$message.error(
                result.message || '登录注册，请检查用户名和密码格式'
              ); // 提示登录失败
            }
          } catch (error) {
            console.error(error); // 打印错误信息
            this.$message.error(error.message || '注册失败，请重试');
          }
        } else {
          this.$message.error('请正确填写表单');
        }
      });
    },
    showInfoformRegister(result) {
      const h = this.$createElement;

      // 返回一个Promise
      return new Promise((resolve) => {
        this.$msgbox({
          title: '注册结果',
          message: h('p', null, [
            h('span', null, `注册信息：`),
            h('p', null, [
              h(
                'span',
                { style: 'font-weight: bold;' },
                `用户名: ${this.registerForm.user_name}`
              ),
            ]),
            h('p', null, [
              h(
                'span',
                { style: 'font-weight: bold;' },
                `用户ID: ${result.user_id}`
              ),
            ]),
            h('p', null, [
              h(
                'span',
                { style: 'font-weight: bold;' },
                `成功状态: ${result.success ? '成功' : '失败'}`
              ),
            ]),
          ]),
          confirmButtonText: '确定',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true; // 开启确定按钮的加载状态
              instance.confirmButtonText = '注册成功，正在跳转主页'; // 修改确定按钮的文字
              setTimeout(() => {
                done(); // 关闭弹窗
                resolve(); // 执行resolve，标记Promise完成
                instance.confirmButtonLoading = false; // 恢复按钮状态
              }, 500); // 延迟0.5秒，等待弹窗的用户交互
            } else {
              done();
            }
          },
        });
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
/* 页面容器样式 */
.el-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 输入框样式 */
.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}

/* 按钮样式 */
.el-button {
  width: 100%;
  margin-top: 10px;
}

/* 让返回按钮有点间距 */
.el-button + .el-button {
  margin-left: 10px;
}

/* 注册表单标签 */
.el-form-item label {
  font-size: 14px;
  font-weight: bold;
}
</style>
