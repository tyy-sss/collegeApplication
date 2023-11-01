import { createStore } from "vuex";
// 数据持久化
import VuexPersist from 'vuex-persist'
import menu from "./modules/menu";

const vuexLocal = new VuexPersist({
  storage: window.sessionStorage  // 可选存储方式
})

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
  },
  // 数据持久化配置
  plugins: [vuexLocal.plugin]
});
