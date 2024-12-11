<!--UserRobots.vue 这个页面展示用户拥有的机器人的信息-->
<template>
  <div class="user-robots">
    <h1 class="title">我的机器人</h1>
    <div class="robot-list">
      <div class="robot-card" v-for="robot in robots" :key="robot.id">
        <img :src="robot.avatar" alt="robot-avatar" class="robot-avatar" />
        <div class="robot-info">
          <h2 class="robot-name">{{ robot.name }}</h2>
          <p class="robot-description">{{ robot.description }}</p>
          <button class="secondary-button" @click="viewDetails(robot.id)">
            查看详情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'UserRobots',
  computed: {
    ...mapGetters(['robots']),
  },
  methods: {
    viewDetails(id) {
      this.$router.push({ name: 'RobotDetails', params: { id } });
    },
  },
};
</script>
