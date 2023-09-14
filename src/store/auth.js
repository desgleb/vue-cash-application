import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import firebaseConfig from "@/utils/firebase.config";

const auth = getAuth(initializeApp(firebaseConfig));
const db = getDatabase(initializeApp(firebaseConfig));

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("getUid");
        await set(ref(db, `/users/${uid}/info`), {
          bill: 100000,
          name,
        });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("clearInfo");
    },
  },
};
