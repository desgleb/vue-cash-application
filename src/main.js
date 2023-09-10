import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

const APP = createApp(App);

APP.config.globalProperties.$filters = { dateFilter };

APP.use(messagePlugin);

APP.use(store).use(router).mount("#app");
