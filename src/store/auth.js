import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseConfig from "@/utils/firebase.config";

const auth = getAuth(initializeApp(firebaseConfig));

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // .then((userCredential) => {
        //   // Signed in
        //   const user = userCredential.user;
        //   // ...
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        // });
      } catch (e) {
        throw e;
      }
    },
    async logout() {
      await signOut(auth);
    },
  },
};
