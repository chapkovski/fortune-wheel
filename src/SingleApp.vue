<template>
  <div style="position:fixed!important; bottom:50px;left:50px;z-index: 10000;">
  <fortune-wheel :share="50" :single="true"  ></fortune-wheel>
</div>
</template>

<script>
import _ from "lodash";

import FortuneWheel from "./components/Circle";

export default {
  name: "App",
  components: { FortuneWheel },
  data() {
    const wheels = _.range(0, 101, 10);
    return { wheels: _.shuffle(wheels) };
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
