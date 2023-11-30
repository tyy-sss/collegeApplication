import { addMenu } from "@/assets/js/utils/add-menu";

export default {
  state: {
    // 动态菜单
    menuData: [],
  },
  getters: {},
  //修改字段
  mutations: {
    //设置菜单的数据
    setMenu(state, val) {
      state.menuData = val;
    },
    addMenu(state){
      addMenu(state.menuData);
    }
  },
  actions: {},
  modules: {},
};
