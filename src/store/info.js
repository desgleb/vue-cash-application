import { getDatabase, ref, onValue, update } from "firebase/database";

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
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateInfo({ commit, dispatch, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const updateData = { ...getters.info, ...toUpdate };
        const updates = {};
        updates[`/users/${uid}/info`] = updateData;
        commit("setInfo", updateData);
        return update(ref(db), updates);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
