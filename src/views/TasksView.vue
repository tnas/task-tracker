<template>
  <TaskForm @onSaveTask="saveTask" />
  <div class="list">
    <TrackedTask v-for="(task, index) in tasks" :key="index" :task="task" />
    <TaskBox v-if="isEmptyTaskList"> There is no tasks! </TaskBox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TrackedTask from "../components/TrackedTask.vue";
import TaskBox from "../components/TaskBox.vue";
import ITaskForm from "../interfaces/ITaskForm";
import { useStore } from "@/store";
import { GET_PROJECTS, GET_TASKS, NEW_TASK } from "@/store/action-types";

export default defineComponent({
  name: "App",

  components: {
    TaskForm,
    TrackedTask,
    TaskBox,
  },

  // data() {
  //   return {
  //     tasks: [] as ITaskForm[],
  //     enabledDarkMode: false,
  //   };
  // },

  computed: {
    isEmptyTaskList(): boolean {
      return this.tasks.length === 0;
    },
  },

  methods: {
    saveTask(task: ITaskForm) {
      this.store.dispatch(NEW_TASK, task)
    },
  },

  setup() {
    const store = useStore()
    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)

    return {
      tasks: computed(() => store.state.tasks),
      store
    }
  }
});
</script>



<style>
  .list {
    padding: 1.25rem;
  }
</style>
