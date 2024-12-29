/*
AI 机器人管理 (store/agent.js)
    功能: 管理 AI 机器人的信息。
    接口:
        获取所有 AI 机器人信息 (/market)
        获取某个机器人的详细信息 (/market/agentdetail/<int:agent_id>)
        创建 AI 机器人 (/agent/user/creation)
*/
import axios from 'axios';

const state = {
  agents: [],
};

const mutations = {
  SET_AGENTS(state, agents) {
    state.agents = agents;
  },
};

const actions = {
  async fetchAgents({ commit }) {
    const response = await axios.get('/market');
    commit('SET_AGENTS', response.data);
  },
  //   async fetchAgentDetail({ commit }, agentId) {
  //     return await axios.get(`/market/agentdetail/${agentId}`);
  //   },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
