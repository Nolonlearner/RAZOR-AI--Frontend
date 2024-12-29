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
    </el-form-item>
    <el-form-item>
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
/* 页面容器样式 */
.el-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(45deg, #6a11cb, #2575fc); /* 科幻渐变背景 */
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  font-family: 'Roboto', sans-serif;
}

/* 输入框样式 */
.el-form-item {
  margin-bottom: 25px;
}

.el-input {
  width: 100%;
  border-radius: 25px;
  padding: 10px 15px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.el-input:hover,
.el-input:focus {
  border-color: #00d1b2; /* 动态效果 */
  background: rgba(255, 255, 255, 0.2);
}

/* 按钮样式 */
.el-button {
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  font-size: 18px;
  border-radius: 50px;
  background: linear-gradient(45deg, #00d1b2, #00bcd4);
  color: white;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.el-button:hover {
  background: linear-gradient(45deg, #00bcd4, #00d1b2);
  transform: translateY(-3px); /* 鼠标悬浮时抬升效果 */
}

.el-button:active {
  transform: translateY(2px); /* 点击时下压效果 */
}

.el-button + .el-button {
  margin-left: 10px;
}

/* 注册表单标签 */
.el-form-item label {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
}

.el-button.is-primary {
  background-color: #00bcd4;
  border: none;
}

.el-button.is-default {
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

/* 页面整体背景 */
body {
  background: url('https://cdn.pixabay.com/photo/2018/11/08/05/57/sky-3807359_960_720.jpg')
    no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

/* 美化弹窗 */
.el-msgbox__header {
  background-color: #00d1b2;
  color: #fff;
  border-radius: 10px 10px 0 0;
}

.el-msgbox__btns {
  display: flex;
  justify-content: center;
}

.el-msgbox__btns .el-button {
  background: #00d1b2;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
}

.el-msgbox__btns .el-button:hover {
  background: #00bcd4;
}

.el-msgbox__btns .el-button:active {
  transform: translateY(2px); /* 点击时下压效果 */
}
</style>
