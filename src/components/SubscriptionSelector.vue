<template>
  <div class="subscription-selector">
    <!-- 选择订阅时长 -->
    <div class="duration-selection">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <!-- 选择订阅时长 -->
        <el-form-item label="订阅时长" prop="duration">
          <el-radio-group v-model="form.duration" @change="updatePoints">
            <el-radio :label="7">1 个周</el-radio>
            <el-radio :label="30">1 个月</el-radio>
            <el-radio :label="180">6 个月</el-radio>
            <el-radio :label="365">12 个月</el-radio>
            <el-radio :label="0">自定义</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 自定义输入天数 -->
        <el-form-item
          v-if="form.duration === 0"
          label="自定义"
          prop="customDays"
        >
          <el-input
            v-model="form.customDays"
            placeholder="请输入天数"
            type="number"
            @input="updatePoints"
          />
        </el-form-item>

        <!-- 计算积分 -->
        <el-form-item label="积分消耗" prop="points">
          <el-input :value="form.points" placeholder="自动计算积分" disabled />
        </el-form-item>
      </el-form>
    </div>

    <!-- 按钮区域 -->
    <div class="action-buttons">
      <el-button type="primary" @click="handleConfirm">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionSelector',
  props: {
    robotId: {
      type: Number,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      form: {
        duration: null, // 订阅时长
        points: null, // 所需积分
        customDays: null, // 自定义天数
      },
      rules: {
        duration: [
          { required: true, message: '请选择订阅时长', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    // 更新积分
    updatePoints() {
      // 如果是自定义天数
      if (this.form.duration === 0 && this.form.customDays) {
        this.form.points = this.form.customDays * 1.5; // 每天1.5积分
      } else if (this.form.duration) {
        // 默认选择的时长，自动计算积分
        this.form.points = this.form.duration * 1.5; // 每天1.5积分
      }
    },

    // 确认订阅操作
    async handleConfirm() {
      // 表单验证
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          try {
            // 调用父组件的确认方法
            await this.onConfirm(this.form.duration, this.form.points);
            this.handleClose();
          } catch (error) {
            console.error('订阅失败：', error);
            this.$message.error('订阅失败，请稍后重试！');
          }
        }
      });
    },

    // 关闭弹窗
    handleClose() {
      this.onClose();
    },
  },
};
</script>

<style scoped>
.form-footer {
  display: flex;
  justify-content: space-between; /* 在左右两边对齐 */
  align-items: center; /* 垂直居中对齐 */
}
.duration-selection {
  margin-bottom: 20px;
}
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
