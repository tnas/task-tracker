<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopWatch :timeInSeconds="currentTime" />
    <button class="button" @click="start" :disabled="stopwatchRunning">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="stop" :disabled="!stopwatchRunning">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StopWatch from './StopWatch.vue'

export default defineComponent({

    name: 'TaskTimer',

    components: {
        StopWatch
    },

    data() {
        return {
            currentTime: 0,
            stopwatch: 0,
            stopwatchRunning: false
        }
    },

    methods: {

        start() {
            this.stopwatchRunning = true;
            this.stopwatch = setInterval(() => {
                this.currentTime += 1;
            }, 1000)
        },

        stop() {
            this.stopwatchRunning = false;
            clearInterval(this.stopwatch);
        }
    }
});
</script>