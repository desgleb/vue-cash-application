import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import "materialize-css/dist/js/materialize.min";

const APP = createApp(App);

APP.config.globalProperties.$filters = { dateFilter };

APP.use(store).use(router).mount("#app");
