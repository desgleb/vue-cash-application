import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
} from "firebase/database";
import firebaseConfig from "@/utils/firebase.config";

const db = getDatabase(initializeApp(firebaseConfig));

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories =
          (await (await get(ref(db, `/users/${uid}/categories`))).val()) || {};

        return Object.keys(categories)
          .map((key) => ({
            ...categories[key],
            id: key,
          }))
          .sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          });
      } catch (e) {
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const dbRef = ref(db);
        // noinspection JSUnresolvedReference
        const category =
          (await (
            await get(child(dbRef, `/users/${uid}/categories/${id}`))
          ).val()) || {};

        return { ...category, id };
      } catch (e) {
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        return update(ref(db, `/users/${uid}/categories/${id}`), {
          title,
          limit,
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
        const categoryKey = push(
          child(ref(db), `/users/${uid}/categories/`)
        ).key;
        await set(ref(db, `/users/${uid}/categories/${categoryKey}/`), {
          title,
          limit,
        });
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
