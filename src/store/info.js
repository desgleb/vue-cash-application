import { getDatabase, ref, onValue } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const userInfoRef = ref(db, `/users/${uid}/info`);
        onValue(userInfoRef, (snapshot) => {
          const info = snapshot.val();
          commit("setInfo", info);
        });
      } catch (e) {}
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
