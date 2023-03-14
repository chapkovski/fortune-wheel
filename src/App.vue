<template>
  <v-app app>
    <v-main app>
      <v-container fluid>

        <v-row class="d-flex flex-row">
          <v-col class="d-flex flex-row flex-wrap">
            <fortune-wheel :color="showColor && w === selectedRisk ? 'yellow' : ''" :share="w" :single="false"
            :label="true"
              :startingCover="true" v-for="(w, i) in wheels" :key="i"></fortune-wheel>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import _ from "lodash";

import FortuneWheel from "./components/Circle";

export default {
  name: "App",
  components: { FortuneWheel },
  data() {
    const wheels = _.range(0, 101, 10);
    return {
      wheels: _.shuffle(wheels),
      showColor: window.showColor,
      selectedRisk: window.selectedRisk,
    };
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
