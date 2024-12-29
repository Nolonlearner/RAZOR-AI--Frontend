/*
 *store/chat.js:会话管理
 *功能: 管理用户创建的会话、历史会话记录和消息。
 *接口:
 *创建会话 (/agent/user/chat/creation)
 *发送消息 (/agent/user/chat/<int:chat_id>)
 *获取所有会话 (/agent/user/chat/all)
 *获取某个会话的历史消息 (/agent/user/chat/<int:chat_id>)
 */

import axios from 'axios';

const state = {
  chats: [],
  currentChat: null,
};

const mutations = {
  SET_CHATS(state, chats) {
    state.chats = chats;
  },
  SET_CURRENT_CHAT(state, chat) {
    state.currentChat = chat;
  },
};

const actions = {
  async fetchChats({ commit }, userId) {
    const response = await axios.post('/agent/user/chat/all', {
      user_id: userId,
    });
    commit('SET_CHATS', response.data);
  },
  async createChat({ commit }, chatData) {
    const response = await axios.post('/agent/user/chat/creation', chatData);
    commit('SET_CURRENT_CHAT', response.data);
  },
  //   async sendMessage({ commit }, { chatId, message }) {
  //     await axios.post(`/agent/user/chat/${chatId}`, { question: message });
  //   },
  async fetchChatHistory({ commit }, chatId) {
    const response = await axios.get(`/agent/user/chat/${chatId}`);
    commit('SET_CURRENT_CHAT', response.data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
