import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const auth = getAuth();
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
      } catch (e) {}
    },
  },
};
