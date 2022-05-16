<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': enabledDarkMode }"> 

    <div class="column is-one-quarter">
      <SideBar @onChangeMode="changeTheme" />>
    </div>

    <div class="column is-three-quarter content">
      <ProjectNotification />
      <router-view></router-view>
    </div>

  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import ProjectNotification from './components/ProjectNotification.vue';

export default defineComponent({

  name: 'App',

  components: {
    SideBar,
    ProjectNotification
},

  data() {
    return {
      enabledDarkMode: false
    }
  },

  methods: {

    changeTheme(enabledDarkMode: boolean) {
      this.enabledDarkMode = enabledDarkMode;
    }
  }
});
</script>

<style>
  main {
    --primary-bg: #fff;
    --primary-text: #000;
  }

  main.dark-mode {
    --primary-bg: #2b2d42;
    --primary-text: #ddd;
  }

  .content {
    color: var(--primary-text);
    background-color: var(--primary-bg);

  }
</style>
