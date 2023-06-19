<template>
  <draggable>
  <div
    :style="noAnim?``:`position:fixed!important; bottom:50px;left:50px;z-index: 10000; `"
    style="align-items: center!important; justify-content: center;"
    class="d-flex flex-column align-items-center justify-center">
    <fortune-wheel :share="selectedRisk" :single="true" 
    :noAnim="noAnim"
    :startingCover="startingCover" :label="false"></fortune-wheel>
  </div>
</draggable>
</template>

<script>
import _ from "lodash";
import draggable from 'vuedraggable'
import FortuneWheel from "./components/Circle";

export default {
  name: "App",
  components: { FortuneWheel, draggable },
  data() {
    const wheels = _.range(0, 101, 10);
    return {
      noAnim:window.noAnim,
      wheels: _.shuffle(wheels),
      startingCover:!window.showColor,
      
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
}</style>
