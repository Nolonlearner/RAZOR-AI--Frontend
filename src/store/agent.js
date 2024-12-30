/*
AI 机器人管理 (store/agent.js)
    功能: 管理 AI 机器人的信息。
    接口:
        获取所有 AI 机器人信息 (/market)
        获取某个机器人的详细信息 (/market/agentdetail/<int:agent_id>)
        创建 AI 机器人 (/agent/user/creation)
*/
import { fetchAllAgentsData as apifetchAllAgentsData } from '../utils/api'; // 引入 API 请求
const state = {
  textAgents: [],
  imageAgents: [],
  videoAgents: [],
};

const getters = {
  allAgents: (state) => {
    return state.textAgents.concat(state.imageAgents, state.videoAgents);
  },
  textAgents: (state) => {
    return state.textAgents;
  },
  imageAgents: (state) => {
    return state.imageAgents;
  },
  videoAgents: (state) => {
    return state.videoAgents;
  },
};

const mutations = {
  SET_TEXT_AGENTS(state, agents) {
    state.textAgents = agents;
  },
  SET_IMAGE_AGENTS(state, agents) {
    state.imageAgents = agents;
  },
  SET_VIDEO_AGENTS(state, agents) {
    state.videoAgents = agents;
  },
};

const actions = {
  // 获取所有 AI 机器人信息
  async fetchAllAgentsData({ commit }) {
    try {
      const response = await apifetchAllAgentsData(); // 调用 API 请求
      if (response.status === 200) {
        const agents = response.data;
        console.log('agents:', agents);
        // 根据类型分类
        const textAgents = agents.filter((agent) => agent.type === 1);
        const imageAgents = agents.filter((agent) => agent.type === 2);
        const videoAgents = agents.filter((agent) => agent.type === 3);

        // 更新状态
        commit('SET_TEXT_AGENTS', textAgents);
        commit('SET_IMAGE_AGENTS', imageAgents);
        commit('SET_VIDEO_AGENTS', videoAgents);
        console.log('textAgents:', textAgents);
        console.log('imageAgents:', imageAgents);
        console.log('videoAgents:', videoAgents);

        return { success: true, message: '获取 AI 机器人信息成功' };
      } else {
        throw new Error(`API 响应异常，状态码: ${response.status}`);
      }
    } catch (error) {
      console.error('Error occurred in fetchAllAgentsData:', error);
      return { success: false, message: error.message };
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
