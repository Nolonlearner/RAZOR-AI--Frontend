<template>
  <el-form
    :model="registerForm"
    :rules="registerRules"
    :label-position="labelPosition"
    ref="registerForm"
    @keyup.enter.native="onSubmit"
    class="register-form"
  >
    <el-form-item label="用户名" prop="user_name">
      <el-input
        v-model="registerForm.user_name"
        placeholder="请输入用户名"
        class="register-input"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="user_password">
      <el-input
        v-model="registerForm.user_password"
        type="password"
        placeholder="请输入密码"
        class="register-input"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="register-btn" @click="onSubmit">
        注册
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="register-btn-secondary" @click="goBack">
        返回
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'Register',
  data() {
    return {
      labelPosition: 'top',
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

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
.register-form {
  width: 100%;
  max-width: 500px;
  margin: 100px auto;
  padding: 30px;
  background: $card-background-color;
  border-radius: 10px;
  box-shadow: $box-shadow-medium;
  font-family: 'Roboto', sans-serif;
}

/* 输入框样式 */
.register-input {
  width: 95%;
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: $text-color;
  border: 1px solid $border-color;
  transition: all 0.3s ease;
}

.register-input:hover,
.register-input:focus {
  border-color: $accent-color;
  background: rgba(255, 255, 255, 0.2);
}

/* 按钮样式 */
.register-btn {
  width: 100%;
  margin-top: 20px;
  padding: 15px;
  font-size: 18px;
  border-radius: 50px;
  background: $accent-color;
  color: white;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
  box-shadow: $box-shadow-light;
}

.register-btn:hover {
  background: $accent-hover-color;
  transform: translateY(-3px); /* 鼠标悬浮时抬升效果 */
}

.register-btn:active {
  transform: translateY(2px); /* 点击时下压效果 */
}

.register-btn-secondary {
  width: 100%;
  margin-top: 10px;
  padding: 15px;
  font-size: 18px;
  border-radius: 50px;
  background: $secondary-color;
  color: $text-color;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
  box-shadow: $box-shadow-light;
}

.register-btn-secondary:hover {
  background: $hover-background-color;
  transform: translateY(-3px); /* 鼠标悬浮时抬升效果 */
}

.register-btn-secondary:active {
  transform: translateY(2px); /* 点击时下压效果 */
}

/* 表单标签 */
.el-form-item label {
  font-size: 16px;
  font-weight: bold;
  color: $text-color;
  margin-bottom: 10px;
}
</style>
