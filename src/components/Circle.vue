<template>
  <v-card class="mx-1 px-3 my-1 py-3" outlined rounded :elevation="10">
    <div>
      <font-awesome-icon icon="fa-solid fa-circle-arrow-down" />
    </div>
    <div
      style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <transition enter-active-class="animate__animated animate__jello">
        <v-card
          v-if="result"
          :color="winningColor"
          outlined
          rounded
          style="position: absolute; z-index: 10"
          :elevation="10"
          class="px-3 m-3 white--text font-weight-bold"
        >
          {{ weWin }}
        </v-card>
      </transition>
      <div
        ref="circle1"
        style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div class="seventyfive" :style="{ background: get_share }"></div>
        <div class="backgroundfif" style="position: absolute"></div>
      </div>
      <transition leave-active-class="animate__animated animate__flipOutY">
        <div
          v-if="cover"
          class="fif"
          ref="cover"
          @click="hideCover"
          style="position: absolute; z-index: 10"
        >
          <div>Click me!</div>
        </div>
      </transition>
    </div>
  </v-card>
</template>

<script>
import _ from "lodash";
import "animate.css";

function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}
export default {
  name: "App",
  props: ["share"],
  components: {},
  data() {
    return {
      result: false,
      cover: true,
      animation: null,
      isPlaying: false,
      val: "ssss",
    };
  },
  mounted() {
    const targets = this.$refs.circle1;
    const that = this;
    const r = _.random(0, 359);
    const final = 720 + r;
    this.animation = this.$anime({
      targets: targets,

      rotate: final,
      duration: 3600,
      loop: false,
      delay: 500,
      // translateX: 250,
      easing: "easeOutSine",
      update: function (anim) {
        const rad = anim.animations[0].currentValue;
        const regex = /(.*?)deg/;
        const found = rad.match(regex);
        console.debug(found);
        that.val = found[1] % 360;

        // console.debug(radians_to_degrees(radVal))
      },
      complete: function (anim) {
        that.result = true;
      },
    });
    this.animation.pause();
    this.isPlaying = false;
  },
  watch: {
    val(v) {},
  },
  computed: {
    winningColor() {
      const cutVal = this.val % 360;
      return cutVal >= this.losingangle ? "green" : "red";
    },
    weWin() {
      const cutVal = this.val % 360;
      return cutVal >= this.losingangle ? "win!" : "lose!";
    },
    losingangle() {
      return 360 - this.winningangle;
    },
    winningangle() {
      return (this.share * 360) / 100;
    },
    get_share() {
      return `conic-gradient(green 0% ${this.share}%, red ${this.share}% 100%)`;
    },
  },
  methods: {
    hideCover() {
      this.cover = false;
      this.startSpin();
    },

    startSpin() {
      if (this.isPlaying === false) {
        this.isPlaying = true;
        this.animation.play();
      } else {
        this.isPlaying = false;
        this.animation.pause();
      }
    },
  },
};
</script>

<style>
.seventyfive {
  z-index: 1;
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.backgroundfif {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  background-image: repeating-conic-gradient(
    from 0deg,
    gray 0deg 20deg,
    white 20deg 40deg
  );
  border-radius: 50%;
  width: 160px;
  height: 160px;

  border: black 1px solid;
}
.fif {
  display: flex;
  align-items: center;
  justify-content: center;
  background: gray;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border-width: 10px;
  border: black 1px solid;
}
</style>
