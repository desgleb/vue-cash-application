import firebaseConfig from "@/utils/firebase.config";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/app/Loader.vue";
import Paginate from "vuejs-paginate-next";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

let APP;
firebaseAuth.onAuthStateChanged(() => {
  if (!APP) {
    APP = createApp(App);
    // noinspection JSCheckFunctionSignatures
    APP.directive("tooltip", tooltipDirective);
    APP.config.globalProperties.$filters = {
      dateFilter,
      currencyFilter,
      localizeFilter,
    };
    APP.component("Loader", Loader);
    APP.component("Paginate", Paginate);
    APP.use(messagePlugin).use(store).use(router).mount("#app");
  }
});
