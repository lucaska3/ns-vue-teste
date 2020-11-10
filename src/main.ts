import Vue from "nativescript-vue";
import App from "./App.vue";
import VueDevtools from "nativescript-vue-devtools";
import Navigator from "nativescript-vue-navigator";
import { routes } from "./routes";
import Field from "@/components/inputs/Field.vue";
import Form from "@/components/inputs/Form.vue";
import Vuelidate from "vuelidate";
import store from "./store";

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === "production";
Vue.component("Form", Form);
Vue.component("Field", Field);

Vue.use(Vuelidate);
Vue.use(Navigator, { routes });
Vue.registerElement(
  "RadSideDrawer",
  () => require("nativescript-ui-sidedrawer").RadSideDrawer
);

new Vue({
  store,
  // render: (h) => h("frame", [h(App)]),
  render: (h) => h(App),
}).$start();
