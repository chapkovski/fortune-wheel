 /* eslint-disable */
<template>
  <v-card style=" align-items: center!important; justify-content: center;" :style="{'background':my_color}"
    class="mx-1 px-3 my-1 py-3 d-flex flex-column justify-center align-center" :color="my_color" outlined rounded
    :elevation="10">
    <div class="mb-1">
      <font-awesome-icon icon="fa-solid fa-circle-arrow-down" />
    </div>
    <div style="
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">
      <transition enter-active-class="animate__animated animate__jello">
      </transition>
      <div ref="circle1" style="
                      position: relative;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    ">
        <div class="seventyfive" :style="{ background: get_share }"></div>
        <div class="backgroundfif" style="position: absolute"></div>
      </div>
      <transition leave-active-class="animate__animated animate__flipOutY">
        <div v-if="cover" class="fif" ref="cover" @click="hideCover" style="position: absolute; z-index: 10">
          <div v-if="label">Click me!</div>
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
  props: ["share", 'single', 'color', 'startingCover', 'label'],
  components: {},
  data() {
    return {
      cover: this.startingCover,
      result: false,
      animation: null,
      isPlaying: false,
      my_color: '',
      val: "ssss"
    };
  },
  mounted() {
    const targets = this.$refs.circle1;
    const that = this;
    const r = _.random(0, 359);
    const final = 720 + r;
    const singleInjection = {
      rotate: 360,
      duration: 3600,
      loop: true,
      easing: "linear",
      delay: 0,
    }
    let configs = {
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

        that.val = found[1] % 360;

        // console.debug(radians_to_degrees(radVal))
      },
      complete: function (anim) {
        that.$emit('animationOver')
        that.result = true;
        that.my_color = that.color
      },
    }
    if (this.single) {
      configs = { ...configs, ...singleInjection }
    }
    
    this.animation = this.$anime(configs);
    if (!this.single) {
      this.animation.pause();
      this.isPlaying = false;
    }

  },
  watch: {
    val(v) { },
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
       if (!this.single) {
      this.cover = false;
      this.startSpin();
       }
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
  background-image: repeating-conic-gradient(from 0deg,
      gray 0deg 20deg,
      white 20deg 40deg);
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
