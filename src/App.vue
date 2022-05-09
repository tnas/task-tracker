<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': enabledDarkMode }"> 

    <div class="column is-one-quarter">
      <SideBar @onChangeMode="changeTheme" />>
    </div>

    <div class="column is-three-quarter content">
      <TaskForm @onSaveTask="saveTask" />
      <div class="lista">
        <TrackedTask v-for="(task, index) in tasks" :key="index" :task="task" />
        <TaskBox v-if="isEmptyTaskList">
          There is no tasks!
        </TaskBox>
      </div>
    </div>

  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import TaskForm from './components/TaskForm.vue'
import TrackedTask from './components/TrackedTask.vue'
import ITaskForm from './interfaces/ITaskForm'
import TaskBox from './components/TaskBox.vue'

export default defineComponent({

  name: 'App',

  components: {
    SideBar,
    TaskForm,
    TrackedTask,
    TaskBox
  },

  data() {
    return {
      tasks: [] as ITaskForm[],
      enabledDarkMode: false
    }
  },

  computed: {
    isEmptyTaskList() : boolean {
      return this.tasks.length === 0;
    }
  },

  methods: {
    saveTask(task: ITaskForm) {
      this.tasks.push(task);
    },

    changeTheme(enabledDarkMode: boolean) {
      this.enabledDarkMode = enabledDarkMode;
    }
  }
});
</script>

<style>
  .lista {
    padding: 1.25rem;
  }

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
