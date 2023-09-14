import { createStore } from "vuex";
import auth from "@/store/auth";
import info from "@/store/info";

export default createStore({
  state: {
    error: null,
  },
  getters: {
    getError: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {},
  modules: {
    auth: auth,
    info: info,
  },
});
