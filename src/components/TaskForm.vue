<template>

    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Task creation form">
                <input type="text" class="input" placeholder="Task to Start" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="projectId">
                        <option value="">Select the project</option>
                        <option :value="proj.id" v-for="proj in projects" :key="proj.id">
                            {{ proj.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TaskTimer @onFinishTimer="finishTask" />
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { appKey } from '@/store';
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex';
import TaskTimer from './TaskTimer.vue'

export default defineComponent({

    name: 'TaskForm',

    emits: ['onSaveTask'],

    components: {
        TaskTimer
    },

    setup (props, { emit }) {

        const store = useStore(appKey)
        const description = ref("")
        const projectId = ref("")
        const projects = computed(() => store.state.project.projects)

        const finishTask = (elapsedTime: number) : void => {
            emit('onSaveTask', {
                timeInSeconds: elapsedTime,
                description: description.value,
                project: projects.value.find(proj => proj.id == projectId.value)
            });
            description.value = '';
        }

        return {
            projects,
            description,
            projectId,
            finishTask
        }
    }
})
</script>

<style>
    .form {
        color: var(--primary-text);
    }
</style>

