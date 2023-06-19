<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <div class="aler alert-danger" v-if="showTimer">
            <countdown :time="15 * 1000" @end="endCountDown">
              <template slot-scope="props">You will be able to proceed further in {{ props.seconds }} seconds.</template>
            </countdown>
          </div>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-row">

        <v-col class="d-flex flex-row flex-wrap">
          <fortune-wheel :color="showColor && w === selectedRisk ? 'yellow' : ''" :share="w" :single="false" :label="true"
            :startingCover="true" v-for="(w, i) in wheels" :key="i" @animationOver="increaseDone"></fortune-wheel>
        </v-col>
      </v-row>
    </v-container>
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
      showTimer:true,
      timerDown:false,
      allCountersDone:false,
      counterDone: 0,
      wheels: _.shuffle(wheels),
      showColor: window.showColor,
      selectedRisk: window.selectedRisk,
    };
  },
  watch: {
    counterDone(v) {
      if (v === this.wheels.length )  {
        
        this.allCountersDone=true;
        if (this.timerDown){document.getElementById('next').classList.remove('d-none');}
      }
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  },
  methods: {
    endCountDown(){
      this.showTimer=false;
      this.timerDown=true
       if (this.allCountersDone)  document.getElementById('next').classList.remove('d-none');


    },
    increaseDone() {
      this.counterDone++;
      console.debug('ONE MORE DONE!', this.counterDone)
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
.v-application--wrap{
  min-height: fit-content!important;
}
</style>
