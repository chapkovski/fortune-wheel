<template>
  <v-app app>
    <v-main app>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-sheet>
              <v-alert
                width="100%"
                border="bottom"
                colored-border
                color="red accent-4"
                elevation="2"
              >
                One of the wheels below will be chosen to generate the outcome
                of the lottery that will partly define your payoff.
                <div>
                  FOR NO AMBIGUITY (RISK/CONTROL) TREATMENTS: we highligh the
                  wheel that is chosen to define the lottery outcome
                </div>
              </v-alert>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row class="d-flex flex-row">
          <v-col class="d-flex flex-row flex-wrap">
            <fortune-wheel
              :share="w"
              v-for="(w, i) in wheels"
              :key="i"
            ></fortune-wheel>
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
