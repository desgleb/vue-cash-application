import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, push, onValue } from "firebase/database";
import firebaseConfig from "@/utils/firebase.config";

const db = getDatabase(initializeApp(firebaseConfig));

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categoriesInfoRef = ref(db, `/users/${uid}/categories`);
        onValue(categoriesInfoRef, (snapshot) => {
          const info = snapshot.val();
          console.log(info);
          // commit("setInfo", info);
        });
      } catch (e) {
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
    async addCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        await set(ref(db, `/users/${uid}/categories/${title}/`), {
          title,
          limit,
        });
        const categoryKey = push(
          child(ref(db), `/users/${uid}/categories/${title}/`)
        ).key;
        // noinspection JSUnresolvedReference
        return {
          title,
          limit,
          id: categoryKey,
        };
      } catch (e) {
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
  },
};
