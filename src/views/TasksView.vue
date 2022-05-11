<template>
  <TaskForm @onSaveTask="saveTask" />
  <div class="list">
    <TrackedTask v-for="(task, index) in tasks" :key="index" :task="task" />
    <TaskBox v-if="isEmptyTaskList"> There is no tasks! </TaskBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TrackedTask from "../components/TrackedTask.vue";
import TaskBox from "../components/TaskBox.vue";
import ITaskForm from "../interfaces/ITaskForm";

export default defineComponent({
  name: "App",

  components: {
    TaskForm,
    TrackedTask,
    TaskBox,
  },

  data() {
    return {
      tasks: [] as ITaskForm[],
      enabledDarkMode: false,
    };
  },

  computed: {
    isEmptyTaskList(): boolean {
      return this.tasks.length === 0;
    },
  },

  methods: {
    saveTask(task: ITaskForm) {
      this.tasks.push(task);
    },
  },
});
</script>



<style>
  .list {
    padding: 1.25rem;
  }
</style>
