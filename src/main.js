import Vue from "vue";
import App from "./App.vue";
import VueAnime from "vue-animejs";
import { library } from "@fortawesome/fontawesome-svg-core";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {};
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
/* import specific icons */
import {
  faUserSecret,
  faCircleArrowDown
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faCircleArrowDown);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueAnime);
Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(opts),
  render: (h) => h(App)
}).$mount("#app");
