import firebaseConfig from "@/utils/firebase.config";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
// const firebaseDB = getDatabase(firebaseApp);

let APP;
firebaseAuth.onAuthStateChanged(() => {
  if (!APP) {
    APP = createApp(App);
    APP.config.globalProperties.$filters = { dateFilter };
    APP.use(messagePlugin);
    APP.use(store).use(router).mount("#app");
  }
});
