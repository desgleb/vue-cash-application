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
import { getDatabase } from "firebase/database";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCg7OyDQ10YsjTsrQB7y75QEsRgj6Lbv30",
  authDomain: "vue-cash.firebaseapp.com",
  projectId: "vue-cash",
  storageBucket: "vue-cash.appspot.com",
  messagingSenderId: "753835405866",
  appId: "1:753835405866:web:f4bd0b218bd6e890adc953",
  measurementId: "G-WTBVVJ2V93",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getDatabase(firebaseApp);

let APP;
firebaseAuth.onAuthStateChanged(() => {
  if (!APP) {
    APP = createApp(App);
    APP.config.globalProperties.$filters = { dateFilter };
    APP.use(messagePlugin);
    APP.use(store).use(router).mount("#app");
  }
});
