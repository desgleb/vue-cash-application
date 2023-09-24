import { initializeApp } from "firebase/app";
import { child, getDatabase, push, ref, set } from "firebase/database";
import firebaseConfig from "@/utils/firebase.config";

const db = getDatabase(initializeApp(firebaseConfig));

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        const recordKey = push(child(ref(db), `/users/${uid}/records/`)).key;
        await set(ref(db, `/users/${uid}/records/${recordKey}/`), record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
