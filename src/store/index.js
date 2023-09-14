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
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );

      return await res.json();
    },
  },
  modules: {
    auth: auth,
    info: info,
  },
});
