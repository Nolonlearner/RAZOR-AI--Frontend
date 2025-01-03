<template>
  <div class="create-robot">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="120px"
      class="creat-robot-form"
    >
      <el-form-item label="机器人名字" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入机器人名字"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item label="机器人类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择机器人类型"
          class="custom-select"
        >
          <el-option
            v-for="option in robotTypes"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="LLM ID" prop="LLM_id">
        <el-select
          v-model="form.LLM_id"
          placeholder="请选择 LLM"
          class="custom-select"
        >
          <el-option
            v-for="option in llmOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="提示词" prop="chatprompt">
        <el-input
          v-model="form.chatprompt"
          placeholder="请输入提示词"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          v-model="form.description"
          placeholder="请输入机器人的描述（可无）"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="custom-button" @click="onSubmit">
          创建机器人
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createAI as apicreateAI } from '../utils/api';
export default {
  data() {
    return {
      form: {
        name: '',
        type: null,
        LLM_id: null,
        chatprompt: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入机器人名字', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择机器人类型', trigger: 'change' },
        ],
        LLM_id: [
          { required: true, message: '请选择 LLM ID', trigger: 'change' },
        ],
        chatprompt: [
          { required: true, message: '请输入提示词', trigger: 'blur' },
        ],
      },
      robotTypes: [
        { label: '文本机器人', value: 1 },
        { label: '图像机器人', value: 2 },
        { label: '音视频机器人', value: 3 },
      ],
      llmOptions: [
        { label: 'Kimi', value: 1 },
        { label: 'GPT-3', value: 2 },
        { label: 'BERT', value: 3 },
        { label: 'T5', value: 4 },
        { label: 'GPT-4', value: 5 },
        { label: 'RoBERTa', value: 6 },
        { label: 'XLNet', value: 7 },
        { label: 'ALBERT', value: 8 },
        { label: 'DistilBERT', value: 9 },
        { label: 'ELECTRA', value: 10 },
        { label: 'ERNIE', value: 11 },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const payload = {
            name: this.form.name,
            type: this.form.type,
            LLM_id: this.form.LLM_id,
            chatprompt: this.form.chatprompt,
            description: this.form.description,
            creator_id: this.$store.state.user.userId,
          };
          console.log('准备发送请求', payload);
          this.apicreateRobot(payload); // 调用创建机器人的 API
        } else {
          console.log('表单验证失败');
        }
      });
    },
    async apicreateRobot(payload) {
      try {
        const response = await apicreateAI(payload);
        console.log('创建机器人成功', response);
        if (response.status === 200) {
          this.$message.success('创建机器人成功');
          const robotId = response.data.agent_id;
          this.$router.push({ name: 'RobotDetail', params: { id: robotId } }); // 跳转到机器人详情页
          // this.$nextTick(() => {
          //   // 在页面跳转后再执行刷新
          //   location.reload();
          // });
        } else {
          this.$message.error('创建机器人失败');
        }
      } catch (error) {
        console.error('创建机器人失败', error);
        throw error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins.scss' as *;
@use '@/assets/styles/variables.scss' as *;
/* 背景设置 */
.create-robot {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/Background/AI-2.png') no-repeat center center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.create-robot::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-color;
  z-index: -1;
}

/* 表单样式 */
.creat-robot-form {
  max-width: 500px;
  width: 100%;
  padding: 30px;
  background: rgba(25, 25, 25, 0.662);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7); /* 更深的阴影 */
}

// v-deep 用于穿透组件样式
::v-deep .el-form-item__label {
  color: $background-color; /* 确保表单标题为白色 */
  font-weight: bold;
  font-size: 16px;
}

/* 下拉选择框样式 */
.custom-select .el-input__inner {
  background: rgba(40, 40, 40, 1); /* 深灰色背景 */
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 10px;
  font-size: 14px;
  padding: 10px;
  transition: border-color 0.3s;
}
</style>
