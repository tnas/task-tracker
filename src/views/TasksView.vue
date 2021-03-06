<template>
  <TaskForm @onSaveTask="saveTask" />
  <div class="list">

    <TaskBox v-if="isEmptyTaskList"> There is no tasks! </TaskBox>

    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Type to filter" v-model="taskFilter">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <TrackedTask v-for="(task, index) in tasks" :key="index" :task="task" @onClickedTask="selectTask"/>

    <div class="modal" :class="{'is-active': selectedTask}" v-if="selectedTask">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Task Editing</p>
          <button @click="closeModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="taskDecription" class="label">
              Description
            </label>
            <input type="text" class="input" v-model="selectedTask.description" id="taskDesc" />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="updateTask" class="button is-success">Save changes</button>
          <button @click="closeModal" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TrackedTask from "../components/TrackedTask.vue";
import TaskBox from "../components/TaskBox.vue";
import ITaskForm from "../interfaces/ITaskForm";
import { useStore } from "@/store";
import { GET_PROJECTS, GET_TASKS, NEW_TASK, UPDATE_TASK } from "@/store/action-types";

export default defineComponent({
  name: "App",

  components: {
    TaskForm,
    TrackedTask,
    TaskBox,
  },

  data() {
    return {
      selectedTask: null as ITaskForm | null,
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
      this.store.dispatch(NEW_TASK, task);
    },

    closeModal() {
      this.selectedTask = null
    },

    selectTask(task: ITaskForm) {
      this.selectedTask = task
    },

    updateTask() {
      this.store.dispatch(UPDATE_TASK, this.selectedTask)
        .then(() => this.closeModal());
    }
  },

  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);
    const taskFilter = ref("");

    watchEffect(() => {
      store.dispatch(GET_TASKS, taskFilter.value)
    })

    return {
      tasks : computed(() => store.state.tasks.filter(
        t => !taskFilter.value || (t.description && t.description.includes(taskFilter.value)))),
      store,
      taskFilter
    };
  },
});
</script>



<style>
.list {
  padding: 1.25rem;
}
</style>
