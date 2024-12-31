<template>
  <el-dialog :visible.sync="dialogVisible" title="选择订阅时间">
    <div>
      <el-select v-model="selectedDuration" placeholder="选择订阅天数">
        <el-option
          v-for="option in durationOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <p>所需积分: {{ calculatedPoints }}</p>
    </div>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirmSubscription">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: false,
      default: false,
    },
    robotId: {
      type: Number,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      selectedDuration: null,
      dialogVisible: this.modelValue, // 使用本地变量
      durationOptions: [
        { label: '30天', value: 30 },
        { label: '90天', value: 90 },
        { label: '180天', value: 180 },
      ],
    };
  },
  watch: {
    modelValue(newValue) {
      this.dialogVisible = newValue; // 监听父组件传来的 visible 变化
    },
  },
  computed: {
    calculatedPoints() {
      return this.selectedDuration ? (this.selectedDuration / 30) * 10 : 0; // 假设每30天10积分
    },
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false); // 通知父组件关闭弹窗
    },
    confirmSubscription() {
      if (this.selectedDuration) {
        this.onConfirm(this.selectedDuration, this.calculatedPoints);
        this.close();
      } else {
        this.$message.warning('请选择订阅天数');
      }
    },
  },
  created() {
    console.log('props.modelValue:', this.modelValue);
  },
};
</script>
